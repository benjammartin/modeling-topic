import { useCurrentAppContext } from '@/contexts/app-provider';
import Frame from '../frame';
import Drag from '../icons/drag';
import More from '../icons/more';
import Box from '../primitives/box';
import styles from './styles.module.css';
import * as Card from '@/components/primitives/card';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import ButtonIcon from '../button-icon';
import PipIcon from '../icons/pipIcon';

const SliceCard: React.FC<{
  children: React.ReactNode;
  id: string;
  name: string;
}> = ({ children, id, name }) => {
  const { state, dispatch } = useCurrentAppContext();

  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    const element = ref.current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  const onSelect = () => {
    dispatch({ type: 'SELECT_SLICE', payload: id });
    handleScroll(state.anchors[id]);
  };

  const isSelected = state.selected === id;

  return (
    <Card.Root
      className={styles.root}
      onClick={onSelect}
      data-selected={isSelected}
    >
      <Card.Preview className={styles.preview}>
        <Box as='div' className={styles.display}>
          <Box as='div' className={styles.position}>
            1
          </Box>
          <Box as='div' className={styles.main}>
            <Frame>{children}</Frame>
          </Box>
          <Drag />
        </Box>
      </Card.Preview>
      <Card.Metas className={styles.metas}>
        <Box>
          <Box as='p' className={styles.title}>
            {name}
          </Box>
          <Box as='p' className={styles.variation}>
            Default
          </Box>
        </Box>
        <Box className={styles.actions}>
          <More /> <Pip>{children}</Pip>
        </Box>
      </Card.Metas>
    </Card.Root>
  );
};

export default SliceCard;

const Pip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Detect if the feature is available.
  const isSupported = 'documentPictureInPicture' in window;
  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const open = useCallback(
    async (width: number, height: number) => {
      // We don't want to allow multiple requests.
      if (pipWindow != null) {
        return;
      }

      //@ts-expect-error experimental

      const pip = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      });

      // Detect when window is closed by user
      pip.addEventListener('pagehide', () => {
        setPipWindow(null);
      });

      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join('');
          const style = document.createElement('style');

          style.textContent = cssRules;
          pip.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement('link');
          if (styleSheet.href == null) {
            return;
          }

          link.rel = 'stylesheet';
          link.type = styleSheet.type;
          link.media = styleSheet.media.toString();
          link.href = styleSheet.href;
          pip.document.head.appendChild(link);
        }
      });

      setPipWindow(pip);
    },
    [pipWindow],
  );

  const startPiP = useCallback(() => {
    open(500, 500);
  }, [open]);
  return (
    <>
      {isSupported && (
        <>
          <ButtonIcon onClick={startPiP}>
            <PipIcon />
          </ButtonIcon>
          {pipWindow && <PiPWindow pipWindow={pipWindow}>{children}</PiPWindow>}
        </>
      )}
    </>
  );
};

const PiPWindow: React.FC<{ pipWindow: Window; children: React.ReactNode }> = ({
  pipWindow,
  children,
}) => {
  return createPortal(children, pipWindow.document.body);
};
