import { useState } from 'react'

import TaskOpen from './TaskOpen'

const Task = (props) => {
    let token

    if(localStorage.getItem('token')){                                                      //if token is set
        token = localStorage.getItem('token')                                                   //get token
    }

    const API_URL_TASKS = 'http://localhost:5000/api/tasks'                                 //default tasks-route

    //set Task data
    const [isDone, setDone] = useState(props.isDone)
    const [isUpdatingTask, setUpdatingTask] = useState(false)

    const [title, setTitle] = useState(props.heading)
    const [description, setDescription] = useState(props.content)
    const [dueDate, setDueDate] = useState(props.dueDate)
    const [urgency, setUrgency] = useState(props.urgency)

    //update task data when task is being updated in TaskOpen Component
    const updateTask = (title, description, dueDate, urgency) => {
        setTitle(title)
        setDescription(description)
        setDueDate(dueDate)
        setUrgency(urgency)
    }

    //close update task form
    const handleUpdatingTask = () => {
        setUpdatingTask(false)
    }

    //handle urgency color classes
    let urgencyIndicator = 'bg-urgency-nice-to-have'

    switch (urgency) {
        case 'not urgent':
            urgencyIndicator = 'bg-green'
            break
        case 'slightly urgent':
            urgencyIndicator = 'bg-yellow'
            break
        case 'urgent':
            urgencyIndicator = 'bg-orange'
            break
        case 'very urgent':
            urgencyIndicator = 'bg-red'
            break
        default:
            break
    }

    //update task done state
    const updateTaskDoneState =  async (token, taskId, isDone) => {
        try {                                                                           //try
            const headers = {                                                               //set headers
                'Authorization': `Bearer ${token}`,                                         //authorization
                'Content-Type': 'application/json',
              }

            await fetch(`${API_URL_TASKS}/${taskId}`, {                                     //update task route
                  method: 'PUT',                                                                //put request
                  credentials: 'include',
                  headers,
                  body: JSON.stringify({
                    done: isDone                                                                //send isDone current state to backend (gets toggled based on wether checkbox is chcked)
                })
              })
            
            const response = await fetch(`${API_URL_TASKS}/task/${taskId}`, {               //after task has been updated get that task and set isDone to that tasks done value
                method: 'GET',                                                                  //get request
                credentials: 'include',
                headers,
            })
            const task = await response.json()                                              //get data
            setDone(task[0].done)                                                               //set done to tasks done-state

            props.handleUpdateTaskDoneState(task[0].list, task[0]._id, task[0].done)        //update task in projects list-object
            props.handleUpdatingStats()                                                     //update project overview stats
            
        } catch (error) {                                                               //catch
            console.log(error.message)                                                      //log error
        }
    
    }

    return(
        <div>
            {isUpdatingTask &&
                <div>
                    <div 
                        onClick={() => setUpdatingTask(false)} 
                        className="task-form-bg absolute fullscreen-container flex">
                    </div>
                    <div className="task-form-container">
                        <div className="task-form bg-card-light dark:bg-list-dark rounded-xl py-12 px-16">
                            <TaskOpen draggable={props.draggable} handleUpdateTask={props.handleUpdateTask} handleDeleteTask={props.handleDeleteTask} task={props.task} handleUpdatingStats={props.handleUpdatingStats} handleUpdatingData={props.handleUpdatingData} updateTask={updateTask} handleTaskUpdate={props.handleTaskUpdate} handleUpdatingTask={handleUpdatingTask} list={props.list} taskId={props.taskId} heading={title} content={description} urgency={urgency} dueDate={dueDate} isDone={props.isDone}/>
                        </div>
                    </div>
                </div>
            }
            <div onClick={() => {setUpdatingTask(true)}} className="task flex p-2 task flex-start cursor-pointer">
                <span className={"urgency-indicator " + urgencyIndicator}></span>
                <div className="task-preview">
                    <div className='flex flex-between'>
                        <h3 className="task-heading font-semibold text-overflow-ellipsis"> {title} </h3>
                        <input className='checkbox-done accent-green' onChange={() => {updateTaskDoneState(token, props.taskId, !isDone)}} type="checkbox" name="isDone" id="isDone" checked={isDone} onClick={(e) => {e.stopPropagation()}}/>
                    </div>
                    <div className='flex flex-between'>
                        <p className="task-text description text-overflow-ellipsis text-card-text">{description}</p>
                        <p className={`task-text w-full text-end ${dueDate && dueDate < props.currentDate && isDone === false ? 'text-red font-semibold' : 'text-card-text'}`}>
                            {dueDate && 'Due: ' + (dueDate.match(/.{1,10}/)[0] == props.currentDate.match(/.{1,10}/)[0] ? 'Today' : dueDate.match(/.{1,10}/))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task