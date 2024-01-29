import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DragDropContext } from "react-beautiful-dnd"
import BeatLoader from "react-spinners/BeatLoader"
import 'react-circular-progressbar/dist/styles.css'

import List from "../components/project/List"
import CreateListForm from "../components/project/CreateListForm"
import ProjectOverview from '../components/project/ProjectOverview'
import SessionExpired from './SessionExpired'

const API_URL_PROJECTS = 'https://planscape.onrender.com/api/projects'                           //default projects-route
const API_URL_LISTS = 'https://planscape.onrender.com/api/lists'                                 //default lists-route
const API_URL_TASKS = 'https://planscape.onrender.com/api/tasks'                                 //default tasks-route

let token

if(localStorage.getItem('token')){                                                      //if token is set
    token = localStorage.getItem('token')                                                 //get token from local storage
}

const updateTaskPosition = async (token, listId, taskId) => {                           //for when task gets dropped into another list (only updates tasks list reference)
try {                                                                                       //try
    const headers = {                                                                           //set headers
      'Authorization': `Bearer ${token}`,                                                       //token authorization
      'Content-Type': 'application/json',
    }

    await fetch(`${API_URL_TASKS}/${taskId}/reorder`, {                                         //fetch tasks-route/task-id/reorder (the task that has been dropped into a list)
      method: 'PUT',                                                                            //put request
      credentials: 'include',
      headers,
      body: JSON.stringify({
        list: listId                                                                            //update tasks list reference and set it to listId from parameter
      }),
    })
  
  } catch (error) {                                                                         //catch
    console.log(error.message)                                                                  //log error
  }
  
}

const reorderList = async (token, taskId, listId, taskIndex) => {                         //for when task gets dropped in a list (updates tasks array-index)
  try {                                                                                       //try
    const headers = {                                                                             //set headers
      'Authorization': `Bearer ${token}`,                                                         //token authorization
      'Content-Type': 'application/json',
    }

    await fetch(`${API_URL_LISTS}/${listId}/reorder`, {                                           //fetch tasks-route/task-id (the task that has been dropped into a list)
      method: 'POST',                                                                             //post request
      credentials: 'include',
      headers,
      body: JSON.stringify({                                                                      //send task index & id
        taskIndex,
        taskId
      }),
    })
  
  } catch (error) {                                                                           //catch
    console.log(error.message)                                                                    //log error
  }
  
}

  //drag and drop behaviour
  const onDragEnd = (result, lists, setLists) => {                                        //onDragEnd function to define what happens after a task has been dropped into a list

    if (!result.destination) return
    const { source, destination } = result                                                    //source: container it is currently in, destination: container it will be dropped into
  
    if (source.droppableId !== destination.droppableId) {                                     //if source and destination are not the same
  
      const sourceList = lists[source.droppableId]                                                //get source list
      const destList = lists[destination.droppableId]                                             //get destination list
      const sourceItems = [...sourceList.items]                                                   //get source tasks from source list
      const destItems = [...destList.items]                                                       //get destination tasks from destination list
      
      const [removed] = sourceItems.splice(source.index, 1)                                       //get the task that is being dragged/dropped
      destItems.splice(destination.index, 0, removed)
  
      setLists({
        ...lists,
        [source.droppableId]: {
          ...sourceList,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destList,
          items: destItems
        }
      })
  
      reorderList(token, removed._id, destList.id, destination.index)                               //update task index
      updateTaskPosition(token, destList.id, removed._id)                                           //update tasks list-reference
  
  
  } else {                                                                                      //else (if source and destination are the same)
  
      const list = lists[source.droppableId]                                                      //get source list
      const copiedItems = [...list.items]                                                         //get list items
      const destList = lists[destination.droppableId]                                             //get destination list
  
      const [removed] = copiedItems.splice(source.index, 1)                                       //get the task that is being dragged/dropped
      copiedItems.splice(destination.index, 0, removed)
      
      setLists({
        ...lists,
        [source.droppableId]: {
          ...list,
          items: copiedItems
        }
      })
      reorderList(token, removed._id, destList.id, destination.index)                             //only call reorder list to update task index (since tasks list reference stays the same)
  
    }
  }



const Project = () => {

  const [isLoading, setLoading] = useState(true)

  //get data
  const [lists, setLists] = useState({})
  const [project, setProject] = useState({})
  const [tasks, setTasks] = useState([])

  const [tasksCount, setTasksCount] = useState(0)
  const [completedTasksCount, setCompletedTasksCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [overdueTasksCount, setOverdueTasksCount] = useState(0)

  const [updatingStats, setUpdatingStats] = useState(false)

  const [activeIndex, setActiveIndex] = useState(null);

  const handleDropdownClick = (index) => {
    if (activeIndex === index) {
      // If the clicked dropdown is already active, then close it
      setActiveIndex(null);
    } else {
      // Otherwise, close the previously active dropdown (if any) and open the clicked dropdown
      setActiveIndex(index);
    }
  };

  //to refresh project overview when there's related changes
  const handleUpdatingStats = () => {
    setUpdatingStats(!updatingStats)
  }

  const getProject = async (token, projectId) => {
    try {                                                                                       //try
      const headers = {                                                                             //set headers
        'Authorization': `Bearer ${token}`,                                                         //token authorization
        'Content-Type': 'application/json',
      }
      const response = await fetch(`${API_URL_PROJECTS}/${projectId}`, {headers})                   //fetch current project with projectId from params
      const project =  await response.json()                                                        //save response data into data obj
  
      if(project && !project.error){                                                                //if there's data and no error
        setProject(project)                                                                           //set projects to data
      }

    } catch (error) {                                                                           //catch
			console.log(error.message)															                                      //log error
    }
  }

  const getTasks =  async (token, listId) => {
    try {                                                                                       //try
      const headers = {                                                                             //set headers
        'Authorization': `Bearer ${token}`,                                                         //token authorization
        'Content-Type': 'application/json',
      }
      const response = await fetch(`${API_URL_TASKS}/${listId}`, {headers})                         //fetch tasks from current projects lists with listId from params
      const tasks =  await response.json()                                                          //save response data into data obj
  
      if(tasks){                                                                                    //if there's data
        return tasks                                                                                    //return it
      }

    } catch (error) {                                                                           //catch
			console.log(error.message)															                                      //log error
    }
  }

  const getLists = async (token, projectId) => {
    try {                                                                                       //try
      const headers = {                                                                             //set headers
        'Authorization': `Bearer ${token}`,                                                         //token authorization
        'Content-Type': 'application/json',
      }
      const response = await fetch(`${API_URL_LISTS}/${projectId}`, {headers})                      //fetch current projects lists with projectId from params
      const lists = await response.json()                                                           //save response data into data obj
      
      const fetchedLists = {}                                                                       //create object for fetched lists
      const fetchedTasks = []                                                                       //create object for fetched tasks
  
      for(const list of lists){                                                                     //for each fetched list
        const tasks = await getTasks(token, list._id)                                                   //get that lists tasks with token and lists id
        
        for(const task of tasks){                                                                       //for each task
          fetchedTasks.push(task)                                                                         //push it into fetchedTasks
        }
        (fetchedLists[list._id] = {name: list.title, id:list._id, items: tasks})                        //push lists into fetchedLists Object with Id as key and a name, id and the lists tasks
      }

    setTasks(fetchedTasks)                                                                          //set tasks to fetched tasks
  
      return fetchedLists                                                                           //return fetched lists

    } catch (error) {                                                                           //catch
			console.log(error.message)															                                      //log error
    }
  }

  const getStats = async (token, projectId) => {
    try {                                                                                       //try
      const headers = {                                                                             //set headers
        'Authorization': `Bearer ${token}`,                                                         //token authorization
        'Content-Type': 'application/json',
      }
      const response = await fetch(`${API_URL_PROJECTS}/${projectId}/stats`, {headers})             //fetch current projects lists with projectId from params
      const stats = await response.json()                                                           //get data
  
      //set Stats
      setTasksCount(stats.totalTasks)
      setCompletedTasksCount(stats.completedTasks)
      setOverdueTasksCount(stats.overdueTasks)

      //set Progress
      if(stats.totalTasks > 0){
          setProgress(((stats.completedTasks * 100) / stats.totalTasks).toFixed(2))
      }else{
          setProgress((0).toFixed(2))
      }

      } catch (error) {                                                                           //catch
        console.log(error.message)															                                      //log error
      }
    
  }

  const {projectId} = useParams()                                                             //get project id from url params


  useEffect( () => {

    //get projects complete data (project, lists & tasks)    
    const fetchData = async () => {
    getProject(token, projectId)
    const lists = await getLists(token, projectId)
      setLists(lists)
      await getStats(token, projectId)
      setLoading(false)
    }

    //if user is authorized, get their project data
    if(token){
      fetchData()
    }
  }, [])

  useEffect( () => {
    //get projects stats   
    const fetchData = async () => {
      await getStats(token, projectId)
      console.log(lists)
      setLoading(false)
    }

    //if user is authorized, get their project data
    if(token){
      fetchData()
    }

  }, [updatingStats]) //rerender stats everytime they get updates

  //refresh state of lists-object whenever a task is created, updated, or deleted to show changes in real time
  const handleDeleteTask = (listId, taskId) => {
    const modifiedLists = {...lists};                                                       //create a copy of the lists object to modify
    const modifiedList = {...modifiedLists[listId]};                                        //create a copy of the list object to modify

    if(modifiedList.items){                                                                 //if the list has a tasks array
      modifiedList.items = modifiedList.items.filter(task => task._id !== taskId);            //remove the task with the specified taskId
      modifiedLists[listId] = modifiedList;                                                   //update the modified list in the modified lists object
      setLists(modifiedLists);                                                                //update the state with the modified lists object
    }
  }

  const handleCreateTask = (listId, task) => {
    const modifiedLists = {...lists};                                                       //create a copy of the lists object to modify
    const modifiedList = {...modifiedLists[listId]};                                        //create a copy of the list object to modify

    if(modifiedList.items){                                                                 //if the list has a tasks array
      modifiedList.items.push(task);                                                          //push the task into the array

      modifiedLists[listId] = modifiedList;                                                   //update the modified list in the modified lists object
      setLists(modifiedLists);                                                                //update the state with the modified lists object
    }
  }

  const handleUpdateTask = (listId, taskId, taskTitle, taskDescription, taskDueDate, taskUrgency) => {
    const modifiedLists = {...lists};                                                       //create a copy of the lists object to modify
    const modifiedList = {...modifiedLists[listId]};                                        //create a copy of the list object to modify

    if(modifiedList.items){                                                                 //if the list has a tasks array
      const tasks = modifiedList.items                                                        //get the tasks
      const modifiedTaskIndex = modifiedList.items.findIndex(task => task._id === taskId)     //get the index of the task that is being updated

      tasks[modifiedTaskIndex].title = taskTitle                                              //update the task that has said index
      tasks[modifiedTaskIndex].description = taskDescription
      tasks[modifiedTaskIndex].dueDate = taskDueDate
      tasks[modifiedTaskIndex].urgency = taskUrgency

      setLists(modifiedLists);                                                                //update the state with the modified lists object

    }
  }

  const handleUpdateTaskDoneState = (listId, taskId, taskDoneState) => {
    const modifiedLists = {...lists};                                                         //create a copy of the lists object to modify
    const modifiedList = {...modifiedLists[listId]};                                          //create a copy of the list object to modify

    if(modifiedList.items){                                                                   //if the list has a tasks array
      const tasks = modifiedList.items                                                          //get the tasks
      const modifiedTaskIndex = modifiedList.items.findIndex(task => task._id === taskId)       //get the index of the task that is being updated

      tasks[modifiedTaskIndex].done = taskDoneState                                             //update the done-state of the task with said index

      setLists(modifiedLists);                                                                  //update the state with the modified lists object
    }
  }

  //refresh state of lists-object whenever a list is created, updated, or deleted to show changes in real time
  const handleCreateList = (listTitle, listId) => {
    const modifiedLists = {...lists};                                                         //create a copy of the lists object to modify

    if(modifiedLists){                                                                        //if lists obj exists
      modifiedLists[listId] = {name: listTitle, id: listId, items: []};                         //add the new list to the obj
      setLists(modifiedLists);                                                                  //update the state with the modified lists object
    }
  }

  const handleUpdateList = (listTitle, listId) => {
    const modifiedLists = {...lists};                                                         //create a copy of the lists object to modify

    if(modifiedLists){                                                                        //if lists obj exists
      modifiedLists[listId].name = listTitle                                                    //update list
      modifiedLists[listId].id = listId
      setLists(modifiedLists);                                                                  //update the state with the modified lists object
    }
  }

  const handleDeleteList = (listId) => {
    const modifiedLists = {...lists};                                                         //create a copy of the lists object to modify

    if(modifiedLists){                                                                        //if lists obj exists
      delete modifiedLists[listId];                                                             //delete list
      setLists(modifiedLists);                                                                  //update the state with the modified lists object
    }
  }

  if(token){
    return (
      <div>
        {isLoading ?
        <div className="fullscreen-container flex">
          <BeatLoader
          color={'#A285D5'}
          loading={isLoading}
          size={14}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div>
        :
        <div className="fullscreen-container project-page bg-section-light">
          <ProjectOverview progress={progress} listCount={Object.entries(lists).length} tasksCount={tasksCount} completedTasksCount={completedTasksCount} overdueTasksCount={overdueTasksCount} openTasksCount={tasksCount - completedTasksCount}/>

                  <div className="wrapper project-wrapper">
                  <div className="project-header mb-10 w-full">
                    <div className="project-heading flex flex-start mb-10">
                      <div className="w-3/4">
                        <h1 className="heading-small text-overflow-ellipsis">{project.title}</h1>
                        {/* show list count */}
                        <p className="text-grey leading-6">{Object.keys(lists).length} Lists</p>
                      </div>
                        <img className="project-icon" src={require('../imgs/icons/project-icon.png')} alt="" />
                    </div>
                    <CreateListForm handleCreateList={handleCreateList} projectId={projectId} handleUpdatingStats={handleUpdatingStats}/>
                  </div>
                
                  <div>
                    <div className="lists-wrapper">
                      {/* drag and drop container */}
                      <DragDropContext onDragEnd={result => onDragEnd(result, lists, setLists)}>
                        {/* if there's lists -> run through all existing lists and display them, if not -> show message*/}
                        {Object.entries(lists).length > 0 ? Object.entries(lists).map(([listId, list], index) => {
                            return (
                                <List handleUpdateList={handleUpdateList} handleDeleteList={handleDeleteList} handleDeleteTask={handleDeleteTask} handleCreateTask={handleCreateTask} handleUpdateTask={handleUpdateTask} handleUpdateTaskDoneState={handleUpdateTaskDoneState} activeIndex={activeIndex} index={index} handleDropdownClick={handleDropdownClick} key={listId} listId={listId} list={list} listName={list.name} handleUpdatingStats={handleUpdatingStats}/>
                            )
                        }) : <p>no lists yet.</p>}
                      </DragDropContext>
                    </div>
                </div>
              </div>
            </div>
      }
      </div>
    )
  }else{
    return(
      <SessionExpired />
    )
  }
  
}

export default Project
