import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TaskCard from "./TaskCard"

import UpdateProjectForm from "./UpdateProjectForm"

const ProjectCard = (props) => {
    let token

    if(localStorage.getItem('token')){                                                      //if token is set
        token = localStorage.getItem('token')                                                   //get token
    }

    const API_URL_PROJECTS = 'https://planscape.onrender.com/api/projects'                           //default projects-route

    const [projectDropdown, setProjectDropdown] = useState(false)                           //to toggle dropdown state
    const [isUpdatingProject, setUpdatingProject] = useState(false)                         //to toggle update project form
    const [title, setTitle] = useState(props.project.title)
    const currentDate = new Date(Date.now())                                                //get current date

    //filter out tasks that are overdue or due today
    const tasksForToday = props.projectTasks.filter(task => task.dueDate && (task.dueDate.match(/.{1,10}/)[0] == currentDate.toISOString().match(/.{1,10}/) || task.dueDate.match(/.{1,10}/)[0] < currentDate.toISOString().match(/.{1,10}/)) && !task.done)

    //to toggle update project from
    const handleUpdatingProject = () => {
        setUpdatingProject(false)
    }

    //to change title on update
    const updateProjectTitle = (projectTitle) => {
        setTitle(projectTitle)
    }
    
    const deleteProject = async (token, projectId) => {
        try {                                                                                   //try
            const headers = {                                                                       //set headers
                'Authorization': `Bearer ${token}`,                                                 //for authentication
                'Content-Type': 'application/json',
              }
    
            await fetch(`${API_URL_PROJECTS}/${projectId}`, {                                       //fetch delete route
                method: 'DELETE',                                                                   //delete request
                credentials: 'include',                                                             //for auth
                headers
            })

            props.handleProjectUpdate()                                                             //call handleProjectUpddate
    
        } catch (error) {                                                                       //catch
            console.log(error.message)                                                              //Log error
        }
    }

    return(
        <div className="w-full">
            {/* update list form*/}
            {isUpdatingProject &&
                <div>
                    <div 
                        onClick={() => setUpdatingProject(false)} 
                        className="task-form-bg profile-bg fullscreen-container flex">
                    </div>
                    <div className="task-form-container">
                        <div className="task-form bg-card-light dark:bg-list-dark rounded-xl py-12 px-16">
                            <UpdateProjectForm handleProjectUpdate={props.handleProjectUpdate} key={props.projectId} projectId={props.projectId} project={props.project} projectTitle={title} onSubmit={() => setUpdatingProject(false)} updateProjectTitle={updateProjectTitle} handleUpdatingProject={handleUpdatingProject}/>
                        </div>
                    </div>
                </div>
            }
        
            <div className="relative">
                <div className="px-6 pt-4">
                    <div className="flex flex-between">
                        <h3 className="heading3-big text-overflow-ellipsis font-bold dark:text-white text-overflow-ellipsis w-3/4">{title}</h3>
                        <button className="" onClick={(e) => {
                                e.preventDefault()
                                setProjectDropdown(!projectDropdown)
                            }}>
                            <img className="w-10 h-10" src={require('../../imgs/icons/list-options-light.png')} alt="list options" />
                        </button>
                    </div>
                    <small className="text-grey">{props.projectTasks.length} Tasks</small>
                </div>

                {projectDropdown && 
                <div className="dropdown project-dropdown absolute bg-card-light border border-section-light rounded-lg">
                    <div className="flex gap-2 border-b border-section-light">
                        <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                setUpdatingProject(true)
                            }} 
                            className="block w-full text-start transition-all hover:text-grey"
                        >Edit</button>
                    </div>
                    <div className="flex gap-2 border-b border-section-light">
                        <img className="icon smallest" src={require("../../imgs/icons/delete.png")} alt="" />
                        <button 
                            onClick={(e) => {
                            e.preventDefault()
                            deleteProject(token, props.projectId)
                            }} 
                            className="text-red block w-full text-start"
                        >Delete</button>
                    </div>
                </div>
                }
            </div>
            {/* <p>progress circle</p> */}
            <div className="px-6">
                {tasksForToday.length > 0 ?
                    <h4 className="font-semibold mt-4 mb-2 project-card-heading text-purple">Your tasks for today:</h4>
                    :
                    <h4 className="font-semibold mt-4 mb-2 text-purple">No tasks for today.</h4>
                }
                <ul className="project-card-tasks w-full">
                    <div>
                        {
                            tasksForToday.length > 0 && tasksForToday.map((task, index) => {
                                return(
                                    <TaskCard key={task._id} task={task}/>
                                )
                            }).slice(0, 3)
                            
                        }
                        {tasksForToday.length > 3 &&
                            <small className="text-grey mb-2 p-2">+ {tasksForToday.length - 3} more</small>
                        }
                    </div>
                    
                </ul>
            </div>
            <div className="text-end project-card-button m-6 mt-2 flex flex-end">
                <Link  to={`/project/${props.project._id}`} key={props.project._id} className="flex py-2 px-5 card-icon text-xl text-white bg-purple rounded-lg hover:bg-black transition-all">&#8594;</Link>
            </div>
        </div>
       
    )
}

export default ProjectCard