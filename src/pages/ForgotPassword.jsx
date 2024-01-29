import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { ReactComponent as ResetImg } from '../imgs/illustrations/reset-password-img.svg'
import { useInView } from 'react-intersection-observer'

const ForgotPassword = () => {
    const {ref: authRef, inView: authVisible} = useInView()

	const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

	const sendResetMail = async (e) => {
		e.preventDefault()																		//prevent refresh and default form behaviour

		try {																					//try
			const response = await fetch('https://planscape.onrender.com/api/users/forgot-password', {		//fetch forgot-password from backend
				method: 'POST',																		//post request
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email																			//send email input to backend
				}),
			})
			if (!response.ok) {																		//if the response status is not ok
				console.log(response.statusText)														//log the status text
			}

			const data = await response.json()														//get response data

			if (data && !data.error) {																//if there's data and no error
				setSuccess(data.message)																//set success message
			}else{																					//else
				setError(data.error)																	//set error message
			}
		} catch (error) {																		//catch								
            setError('Sorry, there was an internal server error.')                                  //set error message
			console.log(error.message)																//log error
		}
		
	}

	return (

		<>
		<section className="fullscreen-container">
		<div className="flex px-6 py-8 mx-auto h-screen py-0">
			<img className="home-bg auth absolute" src={require("../imgs/illustrations/home-bg.png")} alt="" />
			<div ref={authRef} className={`${authVisible && 'animate-entrance'} hidden-entrance hidden-auth auth-container register rounded-lg shadow bg-card-light dark:bg-card-dark flex`}>
				<div className='auth-img'>
					<ResetImg />
				</div>
                {success ? 
                    <div className="form p-6 space-y-4 p-8 text-center">
                        <div className='flex'>
                            <img src={require("../imgs/icons/check-fill.png")} alt="" className=''/>
                        </div>
                        <p className=''>{success}</p>
                        <p className=" text-sm font-light dark:text-white text-black">
                            Go back to <Link to="/login" className="text-purple font-semibold hover:underline">Login</Link>
                        </p>
                    </div>
                    : 
                    <div className="form p-6 space-y-4 p-8">
					<h1 className="font-bold tracking-tight text-purple text-2xl">
						Reset Password
					</h1>
					<form noValidate onSubmit={sendResetMail} className="space-y-4 md:space-y-6" action="#">
						
						{/* Email ----------------------------------- */}
						<div>
							<label htmlFor="username" className="block mb-2 text-sm font-medium text-black dark:text-white">Enter Your Email</label>
							<input 
								type="text" 
								name="username" 
								id="username" 
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
								placeholder="example@email.com" 
								required=""
							/>
						</div>

						{error && <small className='text-red'>{error}</small>}	
						<button type="submit" value="forgotPassword" className="w-full text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-black">Send</button>
						<p className="text-sm font-light dark:text-white text-black">
							Go back to <Link to="/login" className="text-purple font-semibold hover:underline">Login</Link>
						</p>
					</form>
				</div>
                }
			</div>
		</div>
		</section>
		<Footer />
		</>
	)
}

export default ForgotPassword