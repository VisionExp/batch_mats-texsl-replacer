import Stepper from 'awesome-react-stepper'
import { images } from './images'
import useAppStore from '../store/store'

function WelcomeWizard() {
  const { setIntroWatched } = useAppStore()
  return (
    <div className={'wizard-backdrop'}>
      <div className={'welcome-wizard'}>
        <div className="wizard-header">
          <h3>Welcome To Batch Materials Replacer</h3>
        </div>
        <Stepper
          strokeColor="#172539"
          fillStroke="#172539"
          activeColor="#172539"
          contentBoxClassName={'stepper-content'}
          activeProgressBorder="1px solid #172539"
          submitBtn={<button className="done-btn stepper-btn">Done</button>}
          continueBtn={<button className="next-btn stepper-btn">Next</button>}
          backBtn={<button className="prev-btn stepper-btn">Back</button>}
          onSubmit={() => setIntroWatched(true)}
        >
          <div className={'stepContent'}>
            <p>First of all you need to select input folder with your models</p>
            <img className={'stepImg'} src={images[0]} alt="step1" />
          </div>
          <div className={'stepContent'}>
            <p>Then select materials reference file or reload if path exists</p>
            <img className={'stepImg'} src={images[1]} alt="step2" />
          </div>
          <div className={'stepContent'}>
            <p>
              Select original 3d model then in 3d view select part of mesh it shows a material name
            </p>
            <img width={'70%'} src={images[2]} alt="step3" />
          </div>
          <div className="stepContent">
            <p>In tab Mat Info you can copy reference material name</p>
            <img className={'stepImg'} src={images[3]} alt="step4" />
          </div>
          <div className="stepContent">
            <p>Then create materials pairs</p>
            <img className={'stepImg'} src={images[4]} alt="step5" />
          </div>
          <div className="stepContent">
            <p>Finally select output path and if everything is OK click Export button</p>
            <img className={'stepImg'} src={images[5]} alt="step6" />
          </div>
        </Stepper>
      </div>
    </div>
  )
}

export default WelcomeWizard
