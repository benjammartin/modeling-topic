interface FAQProps {
  title: string;
  description: string;
  bottom_title: string;
  bottom_description: string;
  button: string;
}

const FAQ: React.FC<FAQProps> = ({
  title,
  description,
  bottom_description,
  bottom_title,
  button,
}) => {
  return (
    <div className='padding-global section-ps-orange'>
      <div className='container-small'>
        <div className='padding-section-large'>
          <div className='margin-bottom margin-xxlarge'>
            <div className='text-align-center'>
              <div className='max-width-large'>
                <div className='margin-bottom margin-small'>
                  <h2>{title}</h2>
                </div>
                <p className='text-size-medium'>{description}</p>
              </div>
            </div>
          </div>
          <div className='faq1_component'>
            <div className='faq1_accordion'>
              <div
                data-w-id='c9eba89a-1aac-2010-b8c8-4902c5f31834'
                className='faq1_question'
              >
                <div className='text-size-medium text-weight-bold'>
                  Question text goes here
                </div>
                <img
                  src='https://assets.website-files.com/624380709031623bfe4aee60/624380709031625d694aee83_icon_chevron.svg'
                  loading='lazy'
                  alt=''
                  className='faq1_icon'
                />
              </div>
              <div className='faq1_answer'>
                <div className='margin-bottom margin-small'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat. Aenean faucibus nibh et
                    justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
                    risus tristique posuere.
                  </p>
                </div>
              </div>
            </div>
            <div className='faq1_accordion'>
              <div
                data-w-id='0e474da4-423a-545f-6558-7966ba91d4bd'
                className='faq1_question'
              >
                <div className='text-size-medium text-weight-bold'>
                  Question text goes here
                </div>
                <img
                  src='https://assets.website-files.com/624380709031623bfe4aee60/624380709031625d694aee83_icon_chevron.svg'
                  loading='lazy'
                  alt=''
                  className='faq1_icon'
                />
              </div>
              <div className='faq1_answer'>
                <div className='margin-bottom margin-small'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat. Aenean faucibus nibh et
                    justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
                    risus tristique posuere.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='margin-top margin-xxlarge'>
            <div className='text-align-center'>
              <div className='max-width-medium align-center'>
                <div className='margin-bottom margin-xsmall'>
                  <h4>{bottom_title}</h4>
                </div>
                <p className='text-size-medium'>{bottom_description}</p>
                <div className='margin-top margin-medium'>
                  <a href='#' className='button is-secondary w-button'>
                    {button}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
