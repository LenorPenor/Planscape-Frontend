import Footer from "../components/Footer"
import { ReactComponent as NotFoundImg } from '../imgs/illustrations/404-img.svg'

const NotFound = () => {
    return (
        <div>
            <div className="session-page fullscreen-container flex text-center px-6">
                <div>
                    <h1 className="text-purple ">404</h1>
                    <p className="w-full m-auto">Oh no! We couldn't find the page you were looking for.</p>
                    <p className="w-full m-auto">It's possible that the page has been <span className="font-semibold">moved,  deleted, </span>or <span className="font-semibold">never existed </span> in the first place.</p>
                    <div className="flex">
                        <NotFoundImg />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )   
}

export default NotFound