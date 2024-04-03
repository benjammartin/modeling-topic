import React from 'react';
import './slices.css';

interface CallToActionProps {
  title: string;
  description: string;
  button: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  button,
}) => {
  return (
    <section className='section_cta7 SECTION_TO_KEEP section-ps-cyan'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='cta7_component'>
              <div className='cta7_content'>
                <div className='max-width-large'>
                  <div className='margin-bottom margin-xsmall'>
                    <h3>{title}</h3>
                  </div>
                  <p className='text-size-medium'>{description}</p>
                </div>
              </div>
              <div className='cta7_button-row'>
                <a href='#' className='button w-button'>
                  {button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
