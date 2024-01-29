import { useState } from "react"

const CreateTaskForm = (props) => {

    const token = localStorage.getItem('token')                                                                     //get token

    //set data
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('')
    const [dueDate, setDueDate] = useState('')

    const [error, setError] = useState('')
    
    if(!urgency){                                                                                                   //if no urgency is checked
        setUrgency('not urgent')                                                                                        //set default urgency
    }

    const createTask = async (e) => {
        e.preventDefault()                                                                                              //prevent default form behaviour
        try {                                                                                                           //try
            const headers = {                                                                                               //set headers
                'Authorization': `Bearer ${token}`,                                                                         //token authorization
                'Content-Type': 'application/json',
              }
            const response = await fetch(`http://localhost:5000/api/tasks/${props.list.id}`,{                               //fetch create-task route
			    headers,
                method: 'POST',                                                                                             //post request
                body: JSON.stringify({                                                                                      //send input data to backend
                    title,
                    description,
                    urgency,
                    dueDate
                }),
            })

            if (!response.ok) {                                                                                             //if the response was not ok
				console.log(response.statusText)                                                                                //log response status text
			}
			const task = await response.json()                                                                              //get data

			if (task && !task.error) {                                                                                      //if there's data and no error
                props.onCreate()                                                                                                //close form
                props.handleCreateTask(task.list, task)                                                                         //push task into lists task-array
                props.handleUpdatingStats()                                                                                     //update project-overview stats
                setError(null)                                                                                                  //clear error message
			}else{                                                                                                          //else
				setError(task.error)                                                                                            //set error message
			}

        } catch (error) {                                                                                               //catch
            setError('Sorry, there was an internal server error.')                                                          //set error message
            console.log(error.message)
        }
    }

    return (
        <form noValidate onSubmit={createTask} className="" action="#" method="POST">
            <div className="flex flex-between mb-6">
                <h1 className="font-semibold tracking-tight text-2xl">
                    Creating a new task...
                </h1>
            </div>
                <div className="flex flex-start task-open-heading mb-4 mt-10">
                    <div className="card-icon smaller rounded-lg flex bg-purple">
                        <img className="icon smaller" src={require('../../imgs/icons/lists-icon.png')} alt="" />
                    </div>
                    <label htmlFor="dueDate" className="font-semibold">Title</label>
                </div>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
				className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white"  
                placeholder="What's the name of your task?"
                required=""
            />

            <div className="flex flex-start task-open-heading mb-4 mt-10">
                <div className="card-icon smaller rounded-lg flex bg-purple">
                    <img className="icon smaller" src={require('../../imgs/icons/lists-icon.png')} alt="" />
                </div>
                <label htmlFor="dueDate" className="font-semibold">Description</label>
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
            <div className="flex flex-start task-open-heading mb-4 mt-10">
                <div className="card-icon smaller rounded-lg flex bg-purple">
                    <img className="icon smaller" src={require('../../imgs/icons/exclamation-mark.png')} alt="" />
                </div>
                <label htmlFor="dueDate" className="font-semibold">Urgency</label>
            </div>
            <div className="flex urgency-btns-wrapper">
                <div className="urgency-btn-container flex">
                    <input 
                        type="radio" 
                        name="urgency" 
                        id="not-urgent"
                        value={'not urgent'}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="urgency-btn hidden"
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
            <div className="flex flex-start task-open-heading mb-4 mt-10">
                <div className="card-icon smaller rounded-lg flex bg-purple">
                    <img className="icon smaller" src={require('../../imgs/icons/overdue-tasks-icon.png')} alt="" />
                </div>
                <label htmlFor="dueDate" className="font-semibold">Due Date</label>
            </div>
            <input 
                type="date" 
                name="description" 
                id="description" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
				className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
                required=""
            />
			{error && <small className='w-full text-red m-0 p-0'>{error}</small>}
            <button 
                type="submit" 
                value='createTask' 
                className="hover:bg-black w-full mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all">
                    Create Task
            </button>
            <button 
                className="absolute form-close card-icon smaller hover:bg-white rounded-lg flex" 
                onClick={(e) => {
                    e.preventDefault()
                    props.handleCreatingTask()
                }}>
                    <img className="icon smallest" src={require("../../imgs/icons/close.png")} alt="" />
            </button>
        
        </form>
    )
}

export default CreateTaskForm