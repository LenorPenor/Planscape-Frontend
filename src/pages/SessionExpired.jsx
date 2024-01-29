import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { ReactComponent as SessionImg } from '../imgs/illustrations/session-img.svg'

const NotFound = () => {
    return (
        <div>
            <div className="session-page fullscreen-container flex text-center px-6">
                <div>
                    <h1 className="text-purple">Oops...</h1>
                    <p className="w-full m-auto">It looks like your session has expired. Don't worry, it happens to the best of us!</p>
                    <p className="w-full m-auto mb-4">Please <Link className="text-purple font-semibold underline hover:text-black" to="/login">log in</Link> again to continue your session.</p>
                    <div className="flex">
                        <SessionImg />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )   
}

export default NotFound