import { useEffect, useState } from "react"
import jwtDecode from 'jwt-decode'


const Header = () => {
    const [navVisible, setNavVisible] = useState(false)

    let token
    let decodedToken

    if(localStorage.getItem('token')){                                      //if the token is set
        token = localStorage.getItem('token')                                   //get it
        decodedToken = jwtDecode(token)                                         //decode it
    }

    const [isLoggedIn, setLoggedIn] = useState('')                          //to check if user is logged in and render header appropriately

    const logout = () => {                                                  //on logout
        localStorage.clear()                                                    //clear local storage
        setLoggedIn(false)                                                      //set isLoggedIn to false
    }

    useEffect(() => {
        if(token){                                                          //if the token is set
            setLoggedIn(true)                                                   //set isLoggedIn to trur

            if(decodedToken.exp * 1000 < Date.now()){                           //if token expiry date is smaller then current date (expired)
                logout()                                                            //logout
            }
        } else{                                                             //else
            setLoggedIn(false)                                                  //set isLoggedIn to false
        }
    }, [])

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
        <header className="header fixed w-full text-sm bg-white dark:bg-black text-grey">
            <nav className="header-nav">
                <ul className="header-nav-list flex">
                    <div className="flex gap-x-20 open-menu">
                        <li><a href="/" className="font-bold text-purple hover:text-black">Planscape</a></li>
                        <li><a href="/#about" className="hover:text-black">About</a></li>
                        <li><a href="/#features" className="hover:text-black">Features</a></li>
                        <li><a href="/#contact" className="hover:text-black">Contact</a></li>
                    </div>
                    <div className="relative burger-menu hidden">
                    <button onClick={() => {setNavVisible(!navVisible)}} className="space-y-2 hover:bg-section-light p-2">
                            <div className="w-8 h-1 bg-grey rounded-full"></div>
                            <div className="w-8 h-1 bg-grey rounded-full"></div>
                            <div className="w-8 h-1 bg-grey rounded-full"></div>
                    </button>
                    {navVisible &&
                        <div className="gap-x-20 absolute bg-card-light border-border-section-light rounded-lg top-14 left-0 p-8 space-y-4">
                            <li><a href="/" className="font-bold text-purple hover:text-black">Planscape</a></li>
                            <li><a href="/#about" className="hover:text-black">About</a></li>
                            <li><a href="/#features" className="hover:text-black">Features</a></li>
                            <li><a href="/#contact" className="hover:text-black">Contact</a></li>
                        </div>
                    }
                    </div>

                    {isLoggedIn ?
                        <div className="flex gap-x-20">
                            <div className="hover:bg-section-light rounded-full p-2 flex">
                                <li><a href="/profile" className="hover:text-black"><img className="icon header-icon" src={require('../imgs/icons/profile-icon.png')} alt="profile" /></a></li>
                            </div>
                            <div className="hover:bg-section-light rounded-full p-2 flex">
                                <li><a href="/login" className="hover:text-black" onClick={() => {logout()}}><img className="icon header-icon" src={require('../imgs/icons/logout-icon.png')} alt="logout" /></a></li>
                            </div>
                        </div>
                        :
                        <li><a href="/login" className="hover:text-black">Login</a></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header