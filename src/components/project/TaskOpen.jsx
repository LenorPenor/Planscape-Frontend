import { useState, useEffect } from "react"

const TaskOpen = (props) => {
    const token = localStorage.getItem('token')                                                 //get token

    const API_URL_TASKS = 'https://planscape.onrender.com/api/tasks'                                     //default tasks-route
    
    //set data
    const [title, setTitle] = useState(props.heading)
    const [description, setDescription] = useState(props.content)
    const [urgency, setUrgency] = useState(props.urgency)
    const [dueDate, setDueDate] = useState(props.dueDate)

    const [error, setError] = useState('')

    const [isUpdatingTitle, setUpdatingTitle] = useState(false)
    const [isUpdatingDescription, setUpdatingDescription] = useState(false)
    const [isUpdatingUrgency, setUpdatingUrgency] = useState(false)
    const [isUpdatingDueDate, setUpdatingDueDate] = useState(false)

    const updateTask =  async (token, taskId, title, description, dueDate, urgency) => {
        try {                                                                                   //try
            const headers = {                                                                       //set headers
                'Authorization': `Bearer ${token}`,                                                 //authorization
                'Content-Type': 'application/json',
              }
    
            //update task description
            const response = await fetch(`${API_URL_TASKS}/task/${taskId}`, {                       //fetch update-task route
                  method: 'PUT',                                                                    //put request
                  credentials: 'include',
                  headers,
                  body: JSON.stringify({                                                            //send data to backend
                    title,
                    description,
                    dueDate,
                    urgency
                })
              })
            if (!response.ok) {                                                                     //if response was not ok
				console.log(response.statusText)                                                        //log response status text
			}
			const task = await response.json()                                                      //get data

			if (task && !task.error) {                                                              //if there's data and no error
				setTitle(title)                                                                         //set inputs
                setDescription(description)
                setDueDate(dueDate)
                setUrgency(urgency)

                setError('')                                                                            //empty error

                setUpdatingTitle(false)                                                                 //close update states
                setUpdatingDescription(false)

                props.updateTask(title, description, dueDate, urgency)                                  //update task card and project-overview stats, close update form
                props.handleUpdateTask(task.list, task._id, task.title, task.description, task.dueDate, task.urgency)
                props.handleUpdatingStats()

			}else{                                                                                  //else
				setError(task.error)                                                                    //set error message
			}
        } catch (error) {                                                                       //catch
            setError('Sorry, there was an internal server error.')                                  //set error message
            console.log(error.message)                                                              //log error
        }
        
    }

    const deleteTask = async (token, id) => {
        try {                                                                                   //try
            const headers = {                                                                       //set headers
                'Authorization': `Bearer ${token}`,                                                 //authorization
                'Content-Type': 'application/json',
              }

            const response = await fetch(`${API_URL_TASKS}/task/${id}`, {                           //fetch get task route
                    method: 'GET',                                                                      //get request
                    credentials: 'include',
                    headers
            })

            const task = await response.json()                                                      //get data
            if(task){                                                                                   //if there's data
                    await fetch(`${API_URL_TASKS}/${id}`, {                                                 //fetch task delete route
                          method: 'DELETE',                                                                 //delete request
                          credentials: 'include',
                          headers
                      }) 
            
                    props.handleDeleteTask(task[0].list, task[0]._id)                                       //remove task from projects list-object

            }
            props.handleUpdatingStats()                                                                 //update project-overview stats
    
        } catch (error) {                                                                       //catch
            console.log(error.message)                                                              //log error
        }
    }

return(
    
    <form noValidate className="" action="#">
        <div className="form-close flex flex-end mb-6 absolute">
            <button className="card-icon smaller hover:bg-white rounded-lg flex" onClick={(e) => {
                    e.preventDefault()
                    props.handleUpdatingTask()
                }}>
            <img className="icon smallest" src={require("../../imgs/icons/close.png")} alt="" /></button>
        </div>
        {isUpdatingTitle ?
        <div>
            <input
                name="title" 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black rounded-lg block w-full p-2.5 text-black dark:text-white" 
                placeholder="Need more detail?"
                required=""
            />
            <div className="text-end">
                <button 
                    type="submit" 
                    className="text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 px-10 text-center transition-all hover:bg-black"
                    onClick={(e) => {
                        e.preventDefault()
                        updateTask(token, props.task._id, title, description, dueDate, urgency)
                    }}
                >
                    Save</button>
            </div>
        </div>
        :
        <div>
            <div className="flex flex-between flex-align-start">
                <div className="11/12">
                    <h1 className="heading-small font-bold">{title}</h1>
                </div>
                <button 
                    onClick={() => {
                        setUpdatingTitle(true)
                        setUpdatingDescription(false)
                        setUpdatingDueDate(false)
                        setUpdatingUrgency(false)
                    }}
                    className="text-grey"
                >
                    <div className="flex gap-1 mt-4">
                        <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                        <small>Edit</small>
                    </div>
                </button>
            </div>
            <div className="w-2/4">
                <p className="text-grey text-overflow-ellipsis">In List: {props.list.name}</p>
            </div>
        </div>
        }

        {/* Description ------------------------------------------------------------------- */}
        {isUpdatingDescription ?
        <div>
            <div className="mb-4 mt-16">
                <div className='flex flex-start task-open-heading'>
                    <div className="card-icon smaller rounded-lg flex bg-purple">
                        <img className="icon smaller" src={require('../../imgs/icons/lists-icon.png')} alt="" />
                    </div>
                    <label htmlFor="description" className="block heading2-small font-semibold text-black dark:text-white">Description</label>
                </div>
            </div>

            <textarea
                name="description" 
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
                placeholder="Need more detail?"
                required=""
            />
            <div className="text-end">
                <button 
                    type="submit" 
                    className="mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 px-10 text-center transition-all hover:bg-black"
                    onClick={(e) => {
                        e.preventDefault()
                        updateTask(token, props.taskId, title, description, dueDate, urgency)
                    }}
                >
                    Save</button>
            </div>
        </div> 
        : 
        <div>
            <div className="flex flex-between flex-align-center mt-16 mb-2">
                <div className='flex flex-start task-open-heading'>
                    <div className="card-icon smaller rounded-lg flex bg-purple">
                        <img className="icon smaller" src={require('../../imgs/icons/lists-icon.png')} alt="" />
                    </div>
                    <h2 className="heading2-small font-semibold">Description</h2>
                </div>
                <button 
                    onClick={() => {
                        setUpdatingDescription(true)
                        setUpdatingTitle(false)
                        setUpdatingDueDate(false)
                        setUpdatingUrgency(false)
                    }}
                    className="text-grey"
                >
                    <div className="flex gap-1">
                        <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                        <small>Edit</small>
                    </div>
                </button>
            </div>
            <p className="">{description ? description : 'no description'}</p>
        </div>
        }

        {/* Due Date ------------------------------------------------------------------- */}
        {isUpdatingDueDate ?
        <div>
            <div className="mb-4 mt-16">
                <div className="flex flex-start task-open-heading">
                    <div className="card-icon smaller rounded-lg flex bg-purple">
                        <img className="icon smaller" src={require('../../imgs/icons/dueDate-icon.png')} alt="" />
                    </div>
                    <label htmlFor="dueDate" className="heading2-small font-semibold">Due Date</label>
                </div>
            </div>
            <input 
                type="date" 
                name="dueDate" 
                id="dueDate" 
                value={dueDate ? dueDate.match(/.{1,10}/) : ''}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
                required=""
            />
            <div className="text-end">
                <button 
                    type="submit" 
                    className="mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 px-10 text-center transition-all hover:bg-black"
                    onClick={(e) => {
                        e.preventDefault()
                        setUpdatingDueDate(false)
                        updateTask(token, props.taskId, title, description, dueDate, urgency)
                    }}
                >
                    Save</button>
            </div>
        </div>
        :
        <div>
            <div className="flex flex-between flex-align-center mt-16 mb-2">
                <div className='flex flex-start task-open-heading'>
                    <div className="card-icon smaller rounded-lg flex bg-purple">
                        <img className="icon smaller" src={require('../../imgs/icons/dueDate-icon.png')} alt="" />
                    </div>
                    <h2 className="heading2-small font-semibold">Due Date</h2>
                </div>
                <button 
                    onClick={() => {
                        setUpdatingDueDate(true)
                        setUpdatingTitle(false)
                        setUpdatingDescription(false)
                        // setDescription(props.content)
                        setUpdatingUrgency(false)
                        // setUrgency(props.urgency)
                    }}
                    className="text-grey"
                >
                    <div className="flex gap-1">
                        <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                        <small>Edit</small>
                    </div>
                </button>
            </div>
                <p>{dueDate ? dueDate.match(/.{1,10}/) : 'no due Date'}</p>
            </div>
            }
            {/* Urgency ------------------------------------------------------------------------ */}
            {isUpdatingUrgency ?
            <div>
                <div className="mb-4 mt-16">
                    <div className="flex flex-start task-open-heading">
                        <div className="card-icon smaller rounded-lg flex bg-purple">
                            <img className="icon smaller" src={require('../../imgs/icons/exclamation-mark.png')} alt="" />
                        </div>
                        <label htmlFor="dueDate" className="heading2-small font-semibold">Urgency</label>
                    </div>
                </div>
                <div className="flex urgency-btns-wrapper">
                    <div className="urgency-btn-container flex">
                        <input 
                            type="radio" 
                            name="urgency" 
                            id="not-urgent"
                            value={'not urgent'}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="urgency-btn hidden hover:border"
                            required=""
                        />
                        <label htmlFor="not-urgent" className="urgency-label bg-green"></label>
                    </div>
                    <div className="urgency-btn-container flex">
                        <input 
                            type="radio" 
                            name="urgency" 
                            id="slightly-urgent"
                            value={'slightly urgent'}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="urgency-btn hidden"
                            required=""
                        />
                        <label htmlFor="slightly-urgent" className="urgency-label bg-yellow"></label>
                    </div>
                    <div className="urgency-btn-container flex">
                        <input 
                            type="radio" 
                            name="urgency" 
                            id="urgent"
                            value={'urgent'}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="urgency-btn hidden"
                            required=""
                        />
                        <label htmlFor="urgent" className="urgency-label bg-orange"></label>
                    </div>
                    <div className="urgency-btn-container flex">
                        <input 
                            type="radio" 
                            name="urgency" 
                            id="very-urgent"
                            value={'very urgent'}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="urgency-btn hidden"
                            required=""
                        />
                        <label htmlFor="very-urgent" className="urgency-label bg-red"></label>
                    </div>
                </div>
                <div className="text-end">
                <button 
                    type="submit" 
                    className="mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 px-10 text-center transition-all hover:bg-black"
                    onClick={(e) => {
                        e.preventDefault()
                        setUpdatingUrgency(false)
                        updateTask(token, props.taskId, title, description, dueDate, urgency)
                    }}
                    >
                        Save</button>
                </div>
            </div>
            
            :
            <div>
                <div className="flex flex-between flex-align-center mt-16 mb-4">
                    <div className='flex flex-start task-open-heading'>
                        <div className="card-icon smaller rounded-lg flex bg-purple">
                            <img className="icon smaller" src={require('../../imgs/icons/exclamation-mark.png')} alt="" />
                        </div>
                        <h2 className="heading2-small font-semibold">Urgency</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setUpdatingUrgency(true)
                            setUpdatingDescription(false)
                            setUpdatingTitle(false)
                            setUpdatingDueDate(false)
                            setUpdatingTitle(false)
                        }}
                        className="text-grey"
                    >
                        <div className="flex gap-1">
                            <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                            <small>Edit</small>
                        </div>
                    </button>
                </div>
                <p className={`font-semibold text-sm text-center p-2.5 rounded-lg ${urgency === 'very urgent' && 'text-white bg-red'} ${urgency === 'urgent' && 'text-white bg-orange'} ${urgency === 'slightly urgent' && 'text-black bg-yellow'} ${urgency === 'not urgent' && 'text-white bg-green'}`}>
                    {urgency}
                </p>
            </div>
            }
        
            <div className="flex flex-end mt-10">
            <button onClick={(e) => {
                e.preventDefault()
                deleteTask(token, props.taskId)}} className="flex gap-x-2  mt-4 text-grey bg-section-light rounded-lg text-sm px-4 py-2.5 text-center transition-all hover:text-black"><img className="icon smallest" src={require("../../imgs/icons/deleteV2.png")} alt="" />Delete Task</button>
            </div>
						{error && <small className='w-full text-red m-0 p-0'>{error}</small>}

        </form>
)

}

export default TaskOpen
