import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { ReactComponent as RegisterImg } from '../imgs/illustrations/login-img.svg'
import { useInView } from 'react-intersection-observer'

const Register = () => {
	//for animation on scroll
    const {ref: authRef, inView: authVisible} = useInView()

	//set data
	const [username, setUsername] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordRp, setPasswordRp] = useState('')

	const [error, setError] = useState('')

	const navigate = useNavigate()

	const registerUser = async (e) => {
		e.preventDefault()																		//prevent refresh and default form behaviour
		try {																					//try
			const response = await fetch('https://planscape.onrender.com/api/users', {						//fetch register route
				method: 'POST',																		//post request
				credentials: 'include',
				headers: {																			//set headers
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({																//send input data to backend
					username,
					firstname,
					lastname,
					email,
					password,
					passwordRp
				}),
			})
			if (!response.ok) {																		//if response was not ok
				console.log(response.statusText)														//log response status text
			}
			const data = await response.json()														//get data

			if (data && !data.error) {																//if there's data and no error
				navigate('/login')																		//navigate to login (register was successful)
			}else{																					//else
				setError(data.error)																	//set error message
			}
		} catch (error) {																		//catch
            setError('Sorry, there was an internal server error.')                              	//set error message
			console.error(error.message)															//log error
		}
		
	}

	//logout when accessing register form
	useEffect(() => {
		localStorage.clear()
	}, [])

	return (

		<div>
		<section className="fullscreen-container">
		<div className="flex items-center justify-center px-6 py-8 mx-auto h-screen">
		<img className="home-bg auth absolute" src={require("../imgs/illustrations/home-bg.png")} alt="" />
			<div ref={authRef} className={`${authVisible && 'animate-entrance'} hidden-entrance hidden-auth auth-container register rounded-lg shadow bg-card-light dark:bg-card-dark flex`}>
				<div className='auth-img'>
					<RegisterImg />
				</div>
				<div className="form p-6 space-y-4 p-8">
					<h1 className="font-bold tracking-tight text-purple text-2xl">
						Create an account
					</h1>
					<form noValidate onSubmit={registerUser} className="space-y-4 xl:space-y-6" action="#">
						
						{/* Username ----------------------------------- */}
						<div>
							<label htmlFor="username" className="block mb-2 text-sm font-medium text-black dark:text-white">Username</label>
							<input 
								type="text" 
								name="username" 
								id="username" 
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
								placeholder="username" 
								required=""
							/>
						</div>
						
						<div className='name-input flex'>
							
							{/* First Name ---------------------------------- */}
							<div>
								<label htmlFor="firstname" className="block mb-2 text-sm font-medium text-black dark:text-white">First Name</label>
								<input 
									type="text" 
									name="firstname" 
									id="firstname"
									value={firstname}
									onChange={(e) => setFirstname(e.target.value)}
									className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
									placeholder="John" 
									required=""
								/>
							</div>

							{/* Last Name ----------------------------------- */}
							<div>
								<label htmlFor="lastname" className="block mb-2 text-sm font-medium text-black dark:text-white">Last Name</label>
								<input 
									type="text" 
									name="lastname" 
									id="lastname"
									value={lastname}
									onChange={(e) => setLastname(e.target.value)}
									className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
									placeholder="Doe" 
									required=""
								/>
							</div>
						</div>

						{/* E-Mail -------------------------------------- */}
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Your email</label>
							<input 
								type="email" 
								name="email" 
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
								placeholder="example@email.com" 
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
						</div>
						
						{/* Confirm Password ---------------------------- */}
						<div>
							<label htmlFor="passwordRp" className="block mb-2 text-sm font-medium text-black dark:text-white">Confirm password</label>
							<input 
								type="password"
								name="passwordRp"
								id="passwordRp"
								value={passwordRp}
								onChange={(e) => setPasswordRp(e.target.value)}
								className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white"
								placeholder="••••••••"
								required=""
							/>
						</div>
						
						{error && <small className='w-full text-red m-0 p-0'>{error}</small>}
						<button type="submit" value="Register" className="w-full text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-black">Create an account</button>
						<p className="text-sm font-light dark:text-white text-black">
							Already have an account? <Link to="/login" className="text-purple font-semibold hover:underline">Login</Link>
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

export default Register