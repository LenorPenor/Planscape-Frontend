import Hero from "../components/home/Hero"
import About from "../components/home/About"
import Features from "../components/home/Features"
import Contact from "../components/home/Contact"
import Footer from "../components/Footer"

const Home = () => {
    return(
        <div className="relative">
            <Hero />
            <About />
            <Features />
            <Contact />
		    <Footer />
        </div>

    )
}

export default Home