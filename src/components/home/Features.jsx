import { ReactComponent as Organize } from '../../imgs/illustrations/organize.svg'
import { ReactComponent as KeepTrack } from '../../imgs/illustrations/keep-track.svg'
import { ReactComponent as Plan } from '../../imgs/illustrations/plan.svg'

import { useInView } from 'react-intersection-observer'

const Features = () => {
    const {ref: featuresHeadingRef, inView: featuresHeadingVisible} = useInView()
    const {ref: featuresRef, inView: featuresVisible} = useInView()

    return(
        <div id="features" className="wrapper features homepage flex text-center">
            <div className="w-full">
                <h2 ref={featuresHeadingRef} className={`${featuresHeadingVisible && 'animate-entrance'} hidden-entrance featuresHeading text-4xl font-bold mb-28 mt-64`}>Features</h2>
                <div ref={featuresRef} className={`${featuresVisible && 'animate-entrance'} hidden-entrance features flex`}>
                    <div className="features flex-align-start w-full flex gap-80">
                        <div className="feature flex mb-10">
                            <div className="flex mb-10 feature-illustration">
                                <Organize/>
                            </div>
                            <h3 className='my-4 font-bold text-xl text-purple'>Organize</h3>
                            <p className=''>Planscape makes it easy to keep your project tasks organized and under control. This way, you can stay on top of your to-do list and ensure that nothing falls through the cracks.</p>
                       </div>
                       <div className="feature flex mb-10">
                            <div className="flex mb-10 feature-illustration">
                                <Plan />
                            </div>
                            <h3 className='my-4 font-bold text-xl text-purple'>Schedule</h3>
                            <p className=''>Planscape takes the hassle out of scheduling by providing a flexible and intuitive platform for managing your project. You can set deadlines for each task and see how they fit into your timeline.</p>
                       </div>
                       <div className="feature flex mb-10">
                            <div className="flex mb-10 feature-illustration">
                                <KeepTrack />
                            </div>
                            <h3 className='my-4 font-bold text-xl text-purple'>Monitor</h3>
                            <p className=''>With Planscape, you can track the overall progress of your project from start to finish. Our platform lets you see the status of each task, the urgency of it and when it's due.</p>
                       </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Features