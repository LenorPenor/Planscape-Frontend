import { ReactComponent as AboutImg } from '../../imgs/illustrations/about-img.svg'
import { useInView } from 'react-intersection-observer'

const About = () => {
    const {ref: aboutHeadingRef, inView: aboutHeadingVisible} = useInView()
    const {ref: aboutImgRef, inView: aboutImgVisible} = useInView()
    const {ref: aboutTextRef, inView: aboutTextVisible} = useInView()

    return(
        <div id="about" className="about homepage flex text-center">
            <div>
                <h2 ref={aboutHeadingRef} className={`${aboutHeadingVisible && 'animate-entrance'} hidden-entrance aboutHeading font-bold mb-28 mt-48`}>About <span className="text-purple">Planscape</span></h2>
                <div className="flex">
                    <div className="">
                        <div className="about-img flex">
                            <div ref={aboutImgRef} className={`${aboutImgVisible && 'animate-entrance'} hidden-entrance aboutImg`}>
                                <AboutImg />
                            </div>
                        </div>
                        <p ref={aboutTextRef} className={`${aboutTextVisible && 'animate-entrance'} hidden-entrance aboutText w-4/12 m-auto mb-48`}>At Planscape, we believe that every project deserves a streamlined and user-friendly management solution. That's why we've developed a tool that simplifies project management, so you can focus on what really matters - executing your ideas and delivering results.</p>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default About