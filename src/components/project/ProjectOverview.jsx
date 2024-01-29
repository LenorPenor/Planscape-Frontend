import { useState } from "react"
import { CircularProgressbar } from "react-circular-progressbar"

import OverviewTracker from "./OverviewTracker"

const ProjectOverview = (props) => {

    const [tasksDetailed, setTasksDetailed] = useState(true)

    return (
        <div className="project-overview fixed bg-white shadow-md flex flex-start">
                  <div className="project-overview-container flex">
                    <div className="project-progress-container bg-card-light rounded-xl shadow-sm">
                      <p className="font-semibold">Overall Progress</p>
                      <div className="project-progress flex">
                        <div className="progress-bar">
                          <CircularProgressbar value={props.progress} text={`${props.progress}%`} />
                        </div>
                      </div>
                    </div>

                    <div className="w-full overview-trackers">
                      <div className="w-full mb-10">
                        <OverviewTracker img={'lists-icon.png'} tasksCount={props.listCount} color={'purple'} name={'Total List'}/>
                      </div>
    
                      <div className="w-full">
                        <div className="bg-card-light tasks-count rounded-xl shadow-sm w-full mb-3 flex flex-between">
                          <div className="overview-stat flex flex-start">
                            <p className="font-semibold">{props.tasksCount} Total Task{props.tasksCount > 1 || props.tasksCount === 0 ? 's' : ''}</p>
                            <div className="card-icon smaller rounded-lg flex bg-purple">
                                <img className="icon smaller" src={require('../../imgs/icons/tasks-icon.png')} alt="" />
                            </div>
                          </div>
                          <button onClick={() => {setTasksDetailed(!tasksDetailed)}}>
                            <svg className="w-4 h-4 mr-4 cursor-pointer" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                        </div>

                        <div className={`${!tasksDetailed && 'hidden'}`}>
                          <OverviewTracker img={'overdue-tasks-icon.png'} tasksCount={props.overdueTasksCount} color={'red'} name={'Overdue Task'}/>
                          <OverviewTracker img={'open-tasks-icon.png'} tasksCount={props.openTasksCount} color={'orange'} name={'Open Task'}/>
                          <OverviewTracker img={'check-icon.png'} tasksCount={props.completedTasksCount} color={'green'} name={'Completed Task'}/>
                        </div>
                      </div>
                    </div>

                  </div>
                  </div>
    )
}

export default ProjectOverview