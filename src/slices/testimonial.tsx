import List from '@/components/primitives/list';
import './slices.css';
import * as Tabs from '@radix-ui/react-tabs';

export interface TestimonialProps {
  title: string;
  description: string;
  label: string;
  place: Array<{
    name: string;
    description: string;
    restaurant: Array<{
      name: string;
      description: string;
      image: Array<{ src: string; alt: string }>;
    }>;
  }>;
}

const Testimonial: React.FC<TestimonialProps> = ({
  title,
  description,
  place,
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
              </div>
            </div>
            <Tabs.Root defaultValue='0' orientation='vertical' className='tabs'>
              <Tabs.List aria-label='tabs example'>
                <List
                  items={place}
                  className='tabs-list'
                  renderItem={(props, i) => (
                    <Tabs.Trigger
                      key={i}
                      className='trigger-tab'
                      value={i.toString()}
                    >
                      <h3 className='text-size-medium'>{props.name}</h3>
                    </Tabs.Trigger>
                  )}
                />
              </Tabs.List>
              <List
                items={place}
                renderItem={(props, i) => (
                  <Tabs.Content key={i} value={i.toString()}>
                    <div className='testimonial17_component'>
                      {props.restaurant.map(
                        ({ name, description, image }, id) => {
                          return (
                            <div key={id} className='testimonial17_content'>
                              <div className='margin-bottom margin-small'>
                                <h3 className='text-size-medium'>{name}</h3>
                                <div className='text-size-medium'>
                                  {description}
                                </div>
                                <div>
                                  <List
                                    className='testimonial17_image-list'
                                    items={image}
                                    renderItem={({ src }) => {
                                      return (
                                        <img
                                          key={src}
                                          src={src}
                                          className='testimonial17_image'
                                        />
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        },
                      )}
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
