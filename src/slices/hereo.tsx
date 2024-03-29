import './slices.css';

const Hereo = () => {
  return (
    <header className='section_header1 SECTION_TO_KEEP section-ps'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='w-layout-grid header1_component'>
              <div className='header1_content'>
                <div className='margin-bottom margin-small'>
                  <h1>Medium length hero heading goes here</h1>
                </div>
                <p className='text-size-medium'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat.
                </p>
                <div className='margin-top margin-medium'>
                  <div className='button-group'>
                    <a href='#' className='button w-button'>
                      Button
                    </a>
                    <a href='#' className='button is-secondary w-button'>
                      Button
                    </a>
                  </div>
                </div>
              </div>
              <div className='header1_image-wrapper'>
                <img
                  src='https://assets.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg'
                  loading='eager'
                  alt=''
                  className='header1_image'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hereo;
