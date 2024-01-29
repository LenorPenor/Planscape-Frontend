const OverviewTracker = (props) => {
    return(
        <div className="overview-stat flex flex-start bg-card-light rounded-xl shadow-sm w-full mb-1">
        <p className="font-semibold"><span className={`${(props.tasksCount && props.color === 'red') > 0 ? 'text-red font-bold' : ''}`}>{props.tasksCount}</span> {props.name}{props.tasksCount > 1 || props.tasksCount == 0 ? 's' : ''}</p>
        <div className={`card-icon smaller rounded-lg flex bg-${props.color}`}>
            <img className="icon smaller" src={require(`../../imgs/icons/${props.img}`)} alt="" />
        </div>
      </div>
    )
}

export default OverviewTracker