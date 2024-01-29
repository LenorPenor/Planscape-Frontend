import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { ReactComponent as LoginImg } from '../imgs/illustrations/login-img.svg'
import { useInView } from 'react-intersection-observer'

const Login = () => {
    const {ref: authRef, inView: authVisible} = useInView()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()																//to redirect to profile after successful login

	const loginUser = async (e) => {
		e.preventDefault()																		//prevent refresh and default form behaviour

		try {																					//try
			const response = await fetch('https://planscape.onrender.com/api/users/login', {					//fetch user login from backend
				method: 'POST',																		//post request
				credentials: 'include',																//for auth token
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,																		//set db username to input username (username: username)
					password,																		//set db password to input password
				}),
			})
			if (!response.ok) {																		//if response status is not ok
				console.log(response.statusText)														//log response status text
			}

			const data = await response.json()														//get data

			if (data && !data.error) {																//if theres data and no error
				const token = data.token																//get token from data
				localStorage.setItem('token', token)													//save it in local storage to access it from frontend

				navigate('/profile')																	//navigate to profile with user id from token
				document.location.reload()																//reload

			}else{																					//else
				setError(data.error)																	//set error message
			}
		} catch (error) {																		//catch
            setError('Sorry, there was an internal server error.')                                  //set error message
			console.log(error.message)																//log error
		}
		
	}

	useEffect(() => {
		localStorage.clear()																	//clear token when login page is accessed
	}, [])
	

	return (

		<div>
			<section className="fullscreen-container">
				<div className="flex px-6 py-8 mx-auto h-screen py-0">
					<img className="home-bg auth absolute" src={require("../imgs/illustrations/home-bg.png")} alt="" />
					<div ref={authRef} className={`${authVisible && 'animate-entrance'} hidden-entrance hidden-auth auth-container rounded-lg shadow bg-card-light dark:bg-card-dark flex`}>
						<div className='auth-img'>
							<LoginImg />
						</div>
						<div className="form space-y-4 p-8">
							<h1 className="font-bold tracking-tight text-purple text-2xl">
								Login to your account
							</h1>
							<form noValidate onSubmit={loginUser} className="space-y-4 md:space-y-6" action="#">
								
								{/* Username ----------------------------------- */}
								<div>
									<label htmlFor="username" className="block mb-2 text-sm font-medium text-black dark:text-white">Username</label>
									<input 
										type="text" 
										name="username" 
										id="username" 
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
										placeholder="username" 
										required=""
									/>
								</div>

								{/* Password ------------------------------------ */}
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
									<input 
										type="password" 
										name="password" 
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
										placeholder="••••••••"
										required=""
									/>
									<small className='text-purple hover:underline cursor-pointer'><Link to={`/forgot-password`}>Forgot Password?</Link></small>
								</div>
								{error && <small className='text-red'>{error}</small>}	
								<button type="submit" value="Login" className="w-full text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-black transition-all">
									Login
								</button>
								<p className="text-sm font-light dark:text-white text-black">
									Don't have an account yet? <Link to="/register" className="text-purple auth-form-link font-semibold hover:underline">Sign up</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Login