import { useState } from "react"

const CreateProjectForm = (props) => {

    const [title, setTitle] = useState('')
	const [error, setError] = useState('')

    const createProject = async (e) => {
        e.preventDefault()                                                                                          //prevent default form behaviour
        
        try {                                                                                                       //try
            const headers = {                                                                                           //set headers
                    'Authorization': `Bearer ${props.token}`,
                    'Content-Type': 'application/json',
            }
            const response = await fetch(`https://planscape.onrender.com/api/projects`,{                                         //fetch route for creating project
                headers,
                method: 'POST',                                                                                         //post request
                body: JSON.stringify({
                    title                                                                                               //send title input to backend
                }),
            })

            if (!response.ok) {                                                                                         //if response status is not ok
                console.log(response.statusText)                                                                            //log response status text
            }
            const project = await response.json()                                                                       //get data

            if (project && !project.error) {                                                                            //if there's a project an no errors
                props.handleProjectUpdate()                                                                                 //handle project update
                setTitle('')                                                                                                //empty input field
                setError(null)                                                                                              //empty error message
            }else{                                                                                                      //else
                setError(project.error)                                                                                     //set error message
            }

        } catch (error) {                                                                                           //catch
            setError('Sorry, there was an internal server error.')                                                      //set error message
            console.log(error.message)
        }
    }

    return (
        <form noValidate onSubmit={createProject} className="create-proect-form" action="#">
            <label htmlFor="title" className="block mb-4 text-sm font-medium text-black dark:text-white">Create a new project...</label>
            <div className="flex flex-start w-full">
                <div className="flex add-list-container add-project-container w-2/4">
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="add-list-input bg-section-light dark:bg-card dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 pl-4 dark:text-white" 
                        placeholder="Project Title" 
                        required=""
                    />
                    <button type="submit" className="bg-purple text-white py-2.5 px-6 rounded-xl hover:bg-black transition-all">+</button>
                </div>
                {error && <small className='text-red m-0 p-0'>{error}</small>}
            </div>


        </form>
    )
}

export default CreateProjectForm