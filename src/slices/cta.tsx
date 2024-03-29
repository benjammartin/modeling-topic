import './slices.css';

const CallToAction = () => {
  return (
    <section className='section_cta7 SECTION_TO_KEEP section-ps'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='cta7_component'>
              <div className='cta7_content'>
                <div className='max-width-large'>
                  <div className='margin-bottom margin-xsmall'>
                    <h3>Medium length heading goes here</h3>
                  </div>
                  <p className='text-size-medium'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                  </p>
                </div>
              </div>
              <div className='cta7_button-row'>
                <a href='#' className='button w-button'>
                  Button
                </a>
                <a href='#' className='button is-secondary w-button'>
                  Button
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
