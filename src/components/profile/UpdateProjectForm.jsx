import { useState } from "react"

const UpdateProjectForm = (props) => {
    const token = localStorage.getItem('token')                                                         //get token

    const [title, setTitle] = useState(props.projectTitle)
    const [error, setError] = useState('')

    const updateProject = async (e) => {
        e.preventDefault()                                                                                  //prevent default form behaviour

        try {                                                                                               //try
            const headers = {                                                                                   //set headers
                'Authorization': `Bearer ${token}`,                                                             //token authorization
                'Content-Type': 'application/json',
              }
            const response = await fetch(`https://planscape.onrender.com/api/projects/${props.projectId}`,{              //fetch update project route
			    headers,
                method: 'PUT',                                                                                  //put
                body: JSON.stringify({
                    title,                                                                                      //send title input to backend
                }),
            })

            if (!response.ok) {                                                                                 //if response status is not okay
				console.log(response.statusText)                                                                    //log status text
			}
			const data = await response.json()                                                                  //get response data

			if (data && !data.error) {                                                                          //if there's data and no error
                props.onSubmit()                                                                                    //call onSubmit
                props.updateProjectTitle(data.updatedProject.title)                                                 //update title on projectcard
                props.handleProjectUpdate()                                                                         //handle project update

			}else{                                                                                              //else
				setError(data.error)                                                                                //set error message
			}
        } catch (error) {                                                                                   //catch
            setError('Sorry, there was an internal server error.')                                              //set error message
            console.log(error.message)                                                                          //log error
        }
    }

    return (
        <form noValidate onSubmit={updateProject} action="#">
            <div className="flex flex-between mb-6">
                <h1 className="font-semibold tracking-tight text-2xl">
                    Updating Project...
                </h1>
            </div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-black dark:text-white">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
				className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white"  
                placeholder="title" 
                required=""
            />
            
			{error && <small className='w-full text-red m-0 p-0 block'>{error}</small>}
            <button 
                type="submit"
                className=" hover:bg-black w-full mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all">
                    Update project
            </button>
            <button className="absolute form-close card-icon smaller hover:bg-white rounded-lg flex" onClick={(e) => {
                        e.preventDefault()
                        props.handleUpdatingProject()
                    }}>
                    <img className="icon smallest" src={require("../../imgs/icons/close.png")} alt="" />
            </button>
        </form>
    )
}

export default UpdateProjectForm