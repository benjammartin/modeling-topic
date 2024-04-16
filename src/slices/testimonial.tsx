import List from '@/components/primitives/list';
import './slices.css';
import * as Tabs from '@radix-ui/react-tabs';

export interface TestimonialProps {
  title: string;
  description: string;
  button: Array<{ label: string; kind: string }>;
  tab: Array<{
    title: string;
    description: string;
    card: Array<{ title: string; description: string }>;
  }>;
}

const Testimonial: React.FC<TestimonialProps> = ({
  title,
  description,
  tab,
  button,
}) => {
  return (
    <section className='section_testimonial17 SECTION_TO_KEEP section-ps'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='margin-bottom margin-small'>
              <div className='text-align-center'>
                <div className='max-width-large align-center'>
                  <div className='margin-bottom margin-small'>
                    <h2>{title}</h2>
                  </div>
                  <p className='text-size-medium'>{description}</p>
                </div>
                <div>
                  <div className='button-group justify-center margin-small'>
                    {button.map(({ label }, id) => {
                      return (
                        <a href='#' key={id} className='button w-button'>
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Tabs.Root defaultValue='0' orientation='vertical' className='tabs'>
              <Tabs.List aria-label='tabs example'>
                <List
                  items={tab}
                  className='tabs-list'
                  renderItem={(props, i) => (
                    <Tabs.Trigger className='trigger-tab' value={i.toString()}>
                      <h3 className='text-size-medium'>{props.title}</h3>
                    </Tabs.Trigger>
                  )}
                />
              </Tabs.List>
              <List
                items={tab}
                renderItem={(props, i) => (
                  <Tabs.Content value={i.toString()}>
                    <div className='testimonial17_component'>
                      {props.card.map(({ title, description }, id) => {
                        console.log(props);
                        return (
                          <div key={id} className='testimonial17_content'>
                            <div className='margin-bottom margin-small'>
                              <h3 className='text-size-medium'>{title}</h3>
                              <div className='text-size-medium'>
                                {description}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Tabs.Content>
                )}
              />
            </Tabs.Root>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
