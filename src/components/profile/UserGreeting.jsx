import { Link } from "react-router-dom"
import CreateProjectForm from "./CreateProjectForm"

const UserGreeting = (props) => {

    return (
        <div className="user py-10 flex flex-between">
            <img className="greet-img" src={require("../../imgs/illustrations/greeting.png")} alt="" />
            <div className="w-full greet-text text-overflow-ellipsis">
                <div className="user-greeting flex flex-between m-0">
                    <div className="w-9/12">
                        <h1 className="font-bold text-3xl text-overflow-ellipsis">Welcome back, <span className="capitalize">{props.firstname}</span>!</h1>
                        <p className="text text-grey text">What a great day to work on some projects...</p>
                    </div>
                    <Link to={"/profile-settings"} className="edit-btn flex gap-4 mt-4 text-grey bg-section-light rounded-lg text-sm py-2.5 px-10 text-center transition-all hover:text-black">
                        <img className="icon smallest" src={require("../../imgs/icons/edit.png")} alt="" />
                        <p>Edit Profile</p>
                    </Link>
                </div>
                <div className="mt-14 w-full proj-form">
                    <CreateProjectForm token={props.token} handleProjectUpdate={props.handleProjectUpdate}/>
                </div>
            </div>

        </div>
    )
}

export default UserGreeting