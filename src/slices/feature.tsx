import './slices.css';

const Feature = () => {
  return (
    <section className='section_layout83 section-ps-pink'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='w-layout-grid layout83_component'>
              <div className='layout83_content-left'>
                <div className='margin-bottom margin-xsmall'>
                  <div className='text-weight-semibold'>Tagline</div>
                </div>
                <h2>Medium length section heading goes here</h2>
              </div>
              <div className='layout83_content-right'>
                <div className='margin-bottom margin-medium'>
                  <p className='text-size-medium'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat.
                  </p>
                </div>
                <div className='w-layout-grid layout83_item-list'>
                  <div className='layout83_text-wrapper'>
                    <div className='margin-bottom margin-xxsmall'>
                      <div className='heading-style-h2'>50%</div>
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    </div>
                  </div>
                  <div className='layout83_text-wrapper'>
                    <div className='margin-bottom margin-xxsmall'>
                      <div className='heading-style-h2'>50%</div>
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    </div>
                  </div>
                </div>
                <div className='margin-top margin-medium'>
                  <div className='button-group'>
                    <a href='#' className='button is-secondary w-button'>
                      Button
                    </a>
                    <a
                      href='#'
                      className='button is-link is-icon w-inline-block'
                    >
                      <div>Button</div>
                      <div className='icon-embed-xxsmall w-embed'>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M6 3L11 8L6 13'
                            stroke='CurrentColor'
                            strokeWidth='1.5'
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
