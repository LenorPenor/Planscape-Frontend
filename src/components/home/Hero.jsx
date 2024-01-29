import { Link } from 'react-router-dom'
import { ReactComponent as HeroImg } from '../../imgs/illustrations/hero-image.svg'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
    const {ref: heroTextRef, inView: heroTextVisible} = useInView()
    const {ref: heroImgRef, inView: heroImgVisible} = useInView()

    const handleClickScroll = () => {
        const element = document.getElementById('about')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }

    return(
        <div className="fullscreen-container hero-container">
            <div className='hero flex gap-x-8'>
            <img className="home-bg absolute" src={require("../../imgs/illustrations/home-bg.png")} alt="" />

                <div ref={heroTextRef} className={`${heroTextVisible ? 'animate-entrance' : ''} hidden-entrance hidden-heroText hero-text-container max-w-6xl`}>
                    <p className='eyebrow uppercase'>Planscape</p>
                    <h1 className='heading text-7xl font-bold leading-none mb-12 mt-2'>The best way to <span className='text-purple'>organize</span> your work.</h1>
                    <p className='text max-w-5xl mb-12'>Planscape empowers people to streamline workflows, prioritize tasks, and achieve project success faster and more efficiently than ever before!</p>
                    <div className='hero-btns flex flex-start gap-x-2'>
                        <Link to={`${localStorage.getItem('token') ? '/profile' : '/login'}`}className='bg-purple px-6 py-2 rounded-lg font-bold text-white transition-all hover:bg-black'>Get started</Link>
                        <button onClick={handleClickScroll} className='px-6 py-2 transition-all font-bold hover:text-purple '>Learn more &#8594;</button>
                    </div>
                </div>

                <div ref={heroImgRef} className={`${heroTextVisible ? 'animate-entrance' : ''} hidden-entrance hidden-heroImg hero-img flex`}>
                    <HeroImg />
                </div>

            </div>
            <section onClick={handleClickScroll} className="flex cursor-pointer">
                <span className="scroll-icon">
                    <span className="scroll-icon__dot"></span>
                </span>
            </section>
        </div>
        
    )
}

export default Hero