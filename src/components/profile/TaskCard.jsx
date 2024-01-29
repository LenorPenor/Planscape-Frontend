const TaskCard = (props) => {
    return(
        <li key={props.task._id} className="font-semibold project-card-task flex flex-start flex-align-center border border-section-light mb-2 p-2 rounded-lg">
            <img className="list-disc" src={require("../../imgs/icons/list-disc.png")} alt="" />
            <p className="text-overflow-ellipsis">{props.task.title}</p>
        </li>
    )
}

export default TaskCard