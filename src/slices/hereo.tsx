import './slices.css';

interface HereoProps {
  title: string;
  description: string;
  button: string;
}

const Hereo: React.FC<HereoProps> = ({ title, description, button }) => {
  return (
    <header className='section_header1 SECTION_TO_KEEP section-ps-yellow'>
      <div className='padding-global'>
        <div className='container-large'>
          <div className='padding-section-large'>
            <div className='w-layout-grid header1_component'>
              <div className='header1_content'>
                <div className='margin-bottom margin-small'>
                  <h1>{title}</h1>
                </div>
                <p className='text-size-medium'>{description}</p>
                <div className='margin-top margin-medium'>
                  <div className='button-group'>
                    <a href='#' className='button w-button'>
                      {button}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hereo;
