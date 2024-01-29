import { useEffect } from "react";
import { Link } from "react-router-dom";
const Footer = () => {

    useEffect(() => {

        //handle scroll behaviour based on clicked link
        const hash = window.location.hash;
        
        if (hash === '#about') {
          const el = document.getElementById('about');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        if (hash === '#features') {
            const el = document.getElementById('features');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }

          if (hash === '#contact') {
            const el = document.getElementById('contact');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
      }, []);

    return(
        <footer className="footer px-40 py-14 w-full abolute text-sm bg-black dark:bg-black text-grey">
            <nav className="footer-nav flex flex-between flex-align-start">
                <div className="footer-section1">
                    <h3 className="text-white font-bold mb-4 text-xl">Planscape</h3>
                    <p className="w-3/4 mb-4">Keep your projects on track and crush your goals with our super user-friendly project management tool!</p>
                    <a href={`${localStorage.getItem('token') ? '/profile' : '/login'}`}className='transition-all font-bold hover:text-purple text-purple'>Get started &#8594;</a>
                </div>
                <div className="footer-links flex flex-start">
                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <div>
                        <ul className="space-y-1">
                        <li><a href="/" className="hover:underline text-purple font-bold">Home</a></li>
                        <li><a href="/#about" className="hover:underline">About</a></li>
                        <li><a href="/#features" className="hover:underline">Features</a></li>
                        <li><a href="/#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Legal</h3>
                    <div>
                        <ul className="space-y-1">
                            <li><Link to="/" className="hover:underline">Imprint</Link></li>
                            <li><Link to="/" className="hover:underline">Terms & Conditions </Link></li>
                            <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/" className="hover:underline">&copy; Planscape 2023</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div>
                        <ul className="social space-y-4">
                            <li className=""><Link to="https://www.instagram.com/" className="flex flex-start hover:underline"><img className="icon" src={require("../imgs/icons/instagram.png")} alt="instagram" /> Instagram</Link></li>
                            <li className=""><Link to="https://twitter.com/" className="flex flex-start hover:underline"><img className="icon" src={require("../imgs/icons/facebook.png")} alt="facebook" /> Facebook</Link></li>
                            <li className=""><Link to="https://www.facebook.com/" className="flex flex-start hover:underline"><img className="icon" src={require("../imgs/icons/twitter.png")} alt="twitter" /> Twitter</Link></li>
                        </ul>
                    </div>
                </div>
                </div>
            </nav>
        </footer>
    )
}

export default Footer