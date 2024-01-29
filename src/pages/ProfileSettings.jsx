import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

import SessionExpired from './SessionExpired'
import Footer from '../components/Footer'

const ProfileSettings = () => {

	let token
	let decodedToken
	let userId

	if(localStorage.getItem('token')){															//if token is set
		token = localStorage.getItem('token')                                                 		//get token from local storage
		decodedToken = jwtDecode(token)                                                       		//decode token to get user id
		userId = decodedToken.id																	//get user id from token
	}

	const API_URL_USERS = 'https://planscape.onrender.com/api/users'										//default users route

	//set data
	const [username, setUsername] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [error, setError] = useState('')

	const navigate = useNavigate()

    const getUser = async (userId, token) => {
        try {																						//try
            const headers = {																			//set headers
                'Authorization': `Bearer ${token}`,                                                 	//token authorization
                'Content-Type': 'application/json',
            }
            const response = await fetch(`${API_URL_USERS}/${userId}`, {headers})                       //fetch users-route/user-id (the currently logged in user)
            const user = await response.json()                                                  		//save response data into data obj
            if(user){                                                                           		//if theres data
                setUsername(user.username)																	//set values of input fields to current user data
                setFirstname(user.firstname)
                setLastname(user.lastname)
                setEmail(user.email)
            }

        } catch (error) {																			//catch
            console.log(error.message)                                                       			//log error
        }

    }

	const updateUser = async (e, userId, token) => {
		e.preventDefault()																			//prevent refresh and default form behaviour
		try {																						//try
			const headers = {																			//set headers
                'Authorization': `Bearer ${token}`,                                                 	//token authorization
                'Content-Type': 'application/json',
            }
			const response = await fetch(`${API_URL_USERS}/${userId}`, {								//fetch update-user route
				headers,
				method: 'PUT',																			//put request
				credentials: 'include',
				body: JSON.stringify({																	//send input data to backend
					username,
					firstname,
					lastname,
					email,
					password
				}),
			})
			if (!response.ok) {																			//if response was not ok
				console.log(response.statusText)															//log response status text
			}
			const data = await response.json()															//get data
		
			if (data && !data.error) {																	//if there's data and no error
				navigate('/profile')																		//navigate to profile
				document.location.reload()																	//reload

			}else{																						//else
				setError(data.error)																		//set error message
			}
		} catch (error) {																			//catch
            setError('Sorry, there was an internal server error.')                                  	//set error message
			console.log(error.message)																	//Log error
		}
		
	}

	const deleteProfile = async (token, userId) => {
		try {																						//try
            const headers = {																			//set headers
                'Authorization': `Bearer ${token}`,                                                 	//token authorization
                'Content-Type': 'application/json',
              }
    
        	const response = await fetch(`${API_URL_USERS}/${userId}`, {								//fetch delete-user route
                  method: 'DELETE',																			//delete request
                  credentials: 'include',
                  headers,
				  body: JSON.stringify({																	//send password input to backend
					password
				}),
              })

			if (!response.ok) {																				//if response was not okay
				console.log(response.statusText)																//log response status text
			}

			const data = await response.json()																//get data

			if (data && !data.error) {																		//if there's data and no error
				localStorage.clear()																			//delete auth token from local storage
				navigate('/login')																				//navigate to login

			}else{																							//else
				setError(data.error)																			//set error message
			}
    
        } catch (error) {																				//catch
            setError('Sorry, there was an internal server error.')                                      	//set error message
            console.log(error.message)																		//log error
        }

	}

	useEffect(() => {
		//get user data if user is authorized
		if(token){
			getUser(userId, token)
		}
	}, [])
	

	if(token){
		return (
			<div>
			<section className="fullscreen-container">
			<div className="flex items-center justify-center px-6 py-8 mx-auto h-screen">
			<img className="home-bg auth absolute" src={require("../imgs/illustrations/home-bg.png")} alt="" />
				<div className="auth-container settings rounded-lg shadow relative bg-card-light dark:bg-card-dark flex">
					<div className="form p-6 space-y-4 p-8">
						<h1 className="font-bold tracking-tight text-purple text-2xl">
							Profile Settings
						</h1>
						<form noValidate className="" action="#">
							
							{/* Username ----------------------------------- */}
							<div className='mb-6'>
								<label htmlFor="username" className="block mb-2 text-sm font-medium text-black dark:text-white">Username</label>
								<input 
									type="text" 
									name="username" 
									id="username" 
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
									required=""
								/>
							</div>
							
							<div className='name-input flex mb-6'>
								
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
										required=""
									/>
								</div>
							</div>
	
							{/* E-Mail -------------------------------------- */}
							<div className='mb-12'>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Your email</label>
								<input 
									type="email" 
									name="email" 
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
									required=""
								/>
							</div>
							
							{/* Password ------------------------------------ */}
							<div className='mb-6'>
								<label htmlFor="password" className="block my-2 text-sm font-medium text-black dark:text-white">Password</label>
								<input 
									type="password" 
									name="password" 
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
									required=""
									placeholder='••••••••'
								/>
								<small className='text-purple hover:underline cursor-pointer'><Link to={`/forgot-password`}>Forgot Password?</Link></small>
							</div>
	
							{error && <small className='w-full text-red mx-0 p-0'>{error}</small>}
							<button onClick={(e) => {updateUser(e, userId, token)}} type="submit" value="ProfileSettings" className="mt-2 w-full text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
							<div className="form-close flex flex-end mb-6 absolute">
								<button className="card-icon smaller hover:bg-white rounded-lg flex">
									<img className="icon smallest" src={require("../imgs/icons/close.png")} alt="" onClick={(e) => {
										e.preventDefault()
									navigate('/profile')
									}}/>
								</button>
							</div>
							<button 
								onClick={(e) => {
									e.preventDefault()
									deleteProfile(token, userId)
								}} 
								type="submit" 
								value="ProfileSettings" 
								className="w-full flex gap-x-2 text-grey hover:text-black bg-section-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
							>
								<img className="icon smallest" src={require("../imgs/icons/deleteV2.png")} alt="" />
								Delete Profile
							</button>
						</form>
					</div>
				</div>
			</div>
			</section>
			<Footer />
			</div>
		)
	}else{
		return (
			<SessionExpired />
		)
	}
}

export default ProfileSettings