import { Draggable, Droppable } from "react-beautiful-dnd"
import { useState, useRef, useMemo } from "react"

import CreateTaskForm from "./CreateTaskForm"
import UpdateListForm from "./UpdateListForm"
import Task from "./Task"
import Dropdown from "../Dropdown"

const List = (props) => {
    let token

    if(localStorage.getItem('token')){                                                          //if token is set
        token = localStorage.getItem('token')                                                       //get token
    }

    const currentDate = new Date(Date.now())                                                    //get current date

    const API_URL_LISTS = 'http://localhost:5000/api/lists'                                     //default lists-route

    //scrollbar behaviour
    const wrapperRef = useRef()
    const isScrollbarVisible = useMemo(() => {
        if(wrapperRef.current){
            return wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight
        }
        return false
    })

    //to open and close forms
    const [isCreatingTask, setCreatingTask] = useState(false)
    const [isUpdatingList, setUpdatingList] = useState(false)

    //to open create task form
    const handleCreatingTask = () => {
        setCreatingTask(false)
    }

    //to open update list form
    const handleUpdatingList = () => {
        setUpdatingList(false)
    }

    const deleteList = async (token, listId) => {
        try {                                                                                   //try
            const headers = {                                                                       //set headers
                'Authorization': `Bearer ${token}`,                                                 //for authentication
                'Content-Type': 'application/json',
              }
    
            const response = await fetch(`${API_URL_LISTS}/list/${listId}`, {                       //fetch list get route
                  method: 'GET',                                                                        //get request
                  credentials: 'include',
                  headers
            }) 

            const list = await response.json()                                                      //get list data

            if(list){                                                                               //if theree's a list
                await fetch(`${API_URL_LISTS}/${listId}`, {                                             //fetch list delete route
                    method: 'DELETE',                                                                       //delete request
                    credentials: 'include',                                                                 //for auth
                    headers
                })
                props.handleDeleteList(list._id)                                                        //call handleDeleteList to delete list from projects list-object
            }
    
        } catch (error) {                                                                       //catch
            console.log(error.message)                                                              //log error
        }
    }

    //delete list (on button click)
    const handleDelete = () => {
        deleteList(token, props.list.id)
    }

    //open edit form (on button click)
    const handleEdit = () => {
        setUpdatingList(true)
    }

    return(
    //list
    <div>
        {/* create task form*/}
        {isCreatingTask &&
            <div>
                <div 
                    onClick={() => setCreatingTask(false)} 
                    className="task-form-bg absolute fullscreen-container flex">
                </div>
                <div className="task-form-container flex">
                    <div className="task-form bg-card-light dark:bg-list-dark rounded-xl py-12 px-16">
                        <CreateTaskForm handleUpdatingStats={props.handleUpdatingStats} handleCreateTask={props.handleCreateTask} key={props.listId} listId={props.listId} list={props.list} listName={props.list.name} onCreate={() => setCreatingTask(false)} handleCreatingTask={handleCreatingTask}/>
                    </div>
                </div>
            </div>
        }

        {/* update list form*/}
        {isUpdatingList &&
            <div>
                <div 
                    onClick={() => setUpdatingList(false)} 
                    className="task-form-bg absolute fullscreen-container flex">
                </div>
                <div className="task-form-container">
                    <div className="task-form bg-card-light dark:bg-list-dark rounded-xl py-12 px-16">
                        <UpdateListForm handleUpdateList={props.handleUpdateList} key={props.listId} listId={props.listId} list={props.list} listName={props.list.name} onSubmit={() => setUpdatingList(false)} handleUpdatingList={handleUpdatingList}/>
                    </div>
                </div>
            </div>
        }

      <div className="list bg-card-light dark:bg-list-dark rounded-xl overflow-hidden mr-6 shadow-sm" key={props.listId} >
        {/* list header */}
        <header className="list-header-container relative z-0">
            <div className="list-header flex px-7 pt-8">
                <div className="list-heading">
                    <h2 className="font-bold text-overflow-ellipsis">{props.listName}</h2>
                    <p className="task-count text-grey">{props.list.items.length} Task{(props.list.items.length > 1 || props.list.items.length == 0) && 's'}</p>
                </div>
                <button onClick={() => {
                    props.handleDropdownClick(props.index)
                }}>
                    <img className=" w-10 h-10" src={require('../../imgs/icons/list-options-light.png')} alt="list options" />
                </button>
            </div>
            {props.activeIndex === props.index &&
                <Dropdown handleDropdownClick={props.handleDropdownClick} listId={props.listId} handleEdit={handleEdit} handleDelete={handleDelete}/>
            }
        </header>

        {/* task wrapper */}
        <div ref={wrapperRef} className={`task-wrapper-container flex`} style={{ margin: 8, marginBottom: 0}}>
            <Droppable droppableId={props.listId.toString()} key={props.listId}>
            {(provided, snapshot) => {

            return (
                <ul className={`task-wrapper rounded-xl overflow-y-auto ${isScrollbarVisible ? 'overflow-scroll' : 'overflow-hidden'} ${props.list.items.length <= 0 ? 'flex' : ''} ${snapshot.isDraggingOver ? "bg-card-light-hover dark:bg-card-wrapper-dark-hover" : "dark:bg-card-wrapper-dark"}`} 
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {props.list.items.length > 0 ? 
                    props.list.items.map((item, index) => {
                        return (
                            <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                            {(provided, snapshot) => {
                                return (
                                    <li
                                    
                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                    className={`border bg-card-light hover:bg-card-light-hover border-section-light task-container shadow-sm mb-4 last:mb-0 p-3 rounded-lg dark:bg-card-dark dark:hover:bg-card-dark-hover ${item.done && 'border-green bg-green-lighter hover:bg-green-light'} ${(item.dueDate <= currentDate.toISOString() && item.done === false) && 'bg-red-lighter hover:bg-red-light border-red'} `}>
                                        <Task handleUpdateTask={props.handleUpdateTask} handleUpdateTaskDoneState={props.handleUpdateTaskDoneState} handleDeleteTask={props.handleDeleteTask} handleUpdatingStats={props.handleUpdatingStats} handleTaskUpdate={props.handleTaskUpdate} list={props.list} task={item} taskId={item._id} heading={item.title} content={item.description} urgency={item.urgency} dueDate={item.dueDate} isDone={item.done} currentDate={currentDate.toISOString()}/>
                                    </li>
                                )
                            }}
                            </Draggable>
                        )
                    }): 
                    <p className="text-center text-grey">no tasks yet.</p>
                }

                {provided.placeholder}
                </ul>
            )
            }}
            </Droppable>
        </div>
        <button onClick={() => {setCreatingTask(true)}} className="btn-add-task flex py-3 my-6 rounded-lg text-grey hover:bg-white hover:text-black transition-all">+ Add Task</button>
        {/* border shadow-md */}
      </div>
    </div>
        
    )
}
export default List