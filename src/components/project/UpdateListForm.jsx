import { useState } from "react"

const UpdateListForm = (props) => {

    const [title, setTitle] = useState(props.list.name)
    const [error, setError] = useState('')

	const token = localStorage.getItem('token')                                                                         //get token

    const updateList = async (e) => {
        e.preventDefault()
        try {                                                                                                           //try
            const headers = {                                                                                               //set headers
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            const response = await fetch(`http://localhost:5000/api/lists/${props.list.id}`,{                               //fetch list to be updates
			    headers,
                method: 'PUT',                                                                                              //PUT
                body: JSON.stringify({
                    title,                                                                                                  //update title 
                }),
            })

            if (!response.ok) {                                                                                             //if response status was not okay
				console.log(response.statusText)                                                                                //log response status text
			}

			const list = await response.json()                                                                              //get data
			if (list && !list.error) {                                                                                      //if there's a list and there's no error
                props.onSubmit()                                                                                                //call on submit
                props.handleUpdateList(list.title, list._id)                                                                    //update projects list-object

			}else{                                                                                                          //else
				setError(list.error)                                                                                            //set error message
			}
        } catch (error) {                                                                                               //catch
            setError('Sorry, there was an internal server error.')                                                      //set error message
            console.log(error.message)                                                                                      //log error
        }
    }

    return (
        <form noValidate onSubmit={updateList} action="#">
            <div className="flex flex-between mb-6">
                <h1 className="font-semibold tracking-tight text-2xl">
                    Updating List...
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
                className="w-full mt-4 text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-black">
                    Update List
            </button>
            <button 
                className="absolute form-close card-icon smaller hover:bg-white rounded-lg flex" 
                onClick={(e) => {
                    e.preventDefault()
                    props.handleUpdatingList()
                }}>
                <img className="icon smallest" src={require("../../imgs/icons/close.png")} alt="" />
            </button>

        </form>
    )
}

export default UpdateListForm