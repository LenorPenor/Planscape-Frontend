import { useState, useEffect, useRef, useMemo } from "react"
import jwtDecode from "jwt-decode"
import BeatLoader from "react-spinners/BeatLoader"

import UserGreeting from '../components/profile/UserGreeting'
import ProjectCard from "../components/profile/ProjectCard"
import SessionExpired from "./SessionExpired"
import Footer from "../components/Footer"

const Profile = () => {

    let token
    let decodedToken
    let id

    if(localStorage.getItem('token')){                                                      //if token is set
        token = localStorage.getItem('token')                                                   //get token from local storage
        decodedToken = jwtDecode(token)                                                         //decode token to get user id
        id = decodedToken.id
    }

    //declare api url paths
    const API_URL_USERS = 'https://planscape.onrender.com/api/users'                                 //default users-route
    const API_URL_PROJECTS = 'https://planscape.onrender.com/api/projects'                           //default projects-route
    const API_URL_TASKS = 'https://planscape.onrender.com/api/tasks'                                 //default tasks-route

    const currentDate = new Date(Date.now())                                                //get current date
    const upcomingDate =  (new Date()).setDate(currentDate.getDate() + 2)                   //get date 2 days away from current date (to show upcoming tasks)

    const [isLoading, setLoading] = useState(true)

    //scrollbar behaviour
    const wrapperRef = useRef()
    const isScrollbarVisible = useMemo(() => {
        if(wrapperRef.current){
            return wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight
        }
        return false
    })

    //declare user and users projects
    const[user, setUser] = useState([])
    const[projects, setProjects] = useState({})
    const[tasks, setTasks] = useState([])

    const [updatingProject, setUpdatingProject] = useState(false)

    const handleProjectUpdate = () => {
        setUpdatingProject(!updatingProject)
    }
	
    //find user through id
    const getUser = async (userId, token) => {
        try {                                                                                       //try
                const headers = {
                    'Authorization': `Bearer ${token}`,                                                 //token authorization
                    'Content-Type': 'application/json',
                }
                const response = await fetch(`${API_URL_USERS}/${userId}`, {method: 'GET', headers})   //fetch users-route/user-id (the currently logged in user)
                const user = await response.json()                                                      //save response data into data obj
                if(user){                                                                               //if theres data
                    setUser(user)                                                                           //set user to fetched data
                }

        } catch (error) {                                                                           //catch
            console.log(error.toString())                                                               //log error
        }

    }

    //find users projects
    const getProjects = async (token) => {
        try {                                                                                       //try
            const headers = {                                                                           //set headers
                'Authorization': `Bearer ${token}`,                                                     //token authorization
                'Content-Type': 'application/json',
                }
            const response = await fetch(`${API_URL_PROJECTS}`, {headers})                              //fetch projects-route (all projects from currently logged in user)
            const projects = await response.json()                                                      //save response data into data obj
            if (projects){
                setProjects(projects)                                                                       //set projects to fetched data
            }

        } catch (error) {                                                                           //catch
			console.log(error.message)															        //if there was an error, log it
        }
    }

    const getTasks = async (token) => {
        try {                                                                                       //try
            const headers = {                                                                           //set headers
                'Authorization': `Bearer ${token}`,                                                     //token authorization
                'Content-Type': 'application/json',
                }
    
            const response = await fetch(`${API_URL_TASKS}`, {headers})                                 //fetch tasks-route (all tasks from currently logged in user)
            const tasks = await response.json()                                                         //save response data into data obj
            if(tasks && !tasks.error){
                setTasks(tasks)                                                                             //set tasks to fetched data
            }
           
        } catch (error) {                                                                           //catch
			console.log(error.message)															    //if there was an error, log it
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getUser(id, token)                                                                    //call function to get user with id from token
            await getProjects(token)                                                                    //call function to get projects from user
            await getTasks(token)                                                                       //call function to get tasks from user
            setLoading(false)                                                                           //set loading to false
          }
          if(token){                                                                                //if token is set
            fetchData()                                                                                 //fetch data
          }
    }, [])

    useEffect(() => {
        const fetchProjects = async () => {
            await getProjects(token)                                                                    //call function to get projects from user
            setLoading(false)                                                                           //set loading to false
          }

          if(token){                                                                                //if token is set
            fetchProjects()                                                                             //fetch projects
          }
    }, [updatingProject])                                                                           //call everytime a proj is updated or deleted

    if(token){
        return(
            <div className="">
            <img className="profile-bg absolute" src={require("../imgs/illustrations/home-bg.png")} alt="" />
                {isLoading ?
                    <div className="fullscreen-container flex">
                        <BeatLoader color={'#A285D5'} loading={isLoading} size={14} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
                    :
                    <div className="m-auto fullscreen-container">
                        <div className="mx-6">
                            <div className="wrapper profile-wrapper">
                                <UserGreeting token={token} username={user.username} firstname={user.firstname} lastname={user.lastname} projectCount={projects.length} handleProjectUpdate={handleProjectUpdate}/>
                            </div>
                            <div className="rounded-xl mt-10">
                                <div className="wrapper projects-wrapper">
                                <div className="projects profile-heading flex flex-start">
                                    <h2 className="heading2-big">Your Projects</h2>
                                    <img className="project-icon" src={require('../imgs/icons/project-icon.png')} alt="" />
                                </div>
                                <div>
                                    <ul className={`rounded-xl p-4 w-full project-card-container bg-section-light ${projects.length <= 0 ? 'no-projects': ''}`}>
                                        {/* if user has projects -> run through all existing projects and display them, if not -> show message */}
                                        {projects.length > 0 ? projects.map((project, index) => {
                                        return (
                                            <li key={index} className="project-card overflow-hidden relative rounded-xl bg-card-light dark:bg-list-dark">
                                                <ProjectCard handleProjectUpdate={handleProjectUpdate} key={project._id} project={project} projectTasks={tasks && tasks.filter(task => task.project === project._id)} projectTitle={project.title} projectId={project._id}/>
                                            </li>
                                        )
                                    }): <div>
                                            <p className="text-grey projects-empty-text rounded-xl">Haven't seen a project from you yet. Let's get started and see what you can create...</p>
                                        </div>}
                                    </ul>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    }
            <Footer />
            </div>
        )
    }else{
        return (
            <SessionExpired />
        )
    }
}

export default Profile