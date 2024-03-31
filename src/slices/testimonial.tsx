import './slices.css';

export interface TestimonialProps {
  title: string;
  description: string;
  button: Array<{ label: string; kind: string }>;
  card: Array<{ title: string; description: string }>;
}

const Testimonial: React.FC<TestimonialProps> = ({ card, button }) => {
  return (
    <section className='section_testimonial17 SECTION_TO_KEEP section-ps'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='margin-bottom margin-small'>
              <div className='text-align-center'>
                <div className='max-width-large align-center'>
                  <div className='margin-bottom margin-small'>
                    <h2>Headline</h2>
                  </div>
                  <p className='text-size-medium'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
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

            <div className='testimonial17_component'>
              {card.map(({ title, description }) => {
                return (
                  <div className='testimonial17_content'>
                    <div className='margin-bottom margin-small'>
                      <h3 className='text-size-medium'>{title}</h3>
                      <div className='text-size-medium'>{description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
