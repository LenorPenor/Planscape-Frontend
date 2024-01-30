import { useState } from "react"

const CreateListForm = (props) => {

    const [title, setTitle] = useState('')
	const [error, setError] = useState('')

	const token = localStorage.getItem('token')                                                                 //get token

    const createList = async (e) => {
        e.preventDefault()                                                                                          //prevent default form behaviour

        try {                                                                                                       //try
            const headers = {                                                                                           //set headers
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            const response = await fetch(`https://planscape.onrender.com/api/lists/${props.projectId}`,{                         //fetch route for creating list
			    headers,
                method: 'POST',                                                                                         //post
                body: JSON.stringify({
                    title                                                                                               //send title input to backend
                }),
            })

            if (!response.ok) {                                                                                         //if response status is not ok
                console.log(response.statusText)                                                                            //log response status text
            }
            const list = await response.json()                                                                          //get data

            if (list && !list.error) {                                                                                  //if there's a list an no errors
                setTitle('')                                                                                                //empty input field
                setError(null)                                                                                              //empty error message
                props.handleCreateList(list.title, list._id)                                                                //add list to projects list-object
            }else{                                                                                                      //else
                setError(list.error)                                                                                        //set error message
            }
            
        } catch (error) {                                                                                           //catch
            setError('Sorry, there was an internal server error.')                                                      //set error message
            console.log(error.message)                                                                                  //log error
        }
    }

    return (
        <form noValidate onSubmit={createList} className="create-list" action="#">

            <label htmlFor="title" className="block mb-4 text-sm font-medium text-black dark:text-white">Create a new list...</label>
            <div className="flex flex-start w-full">
                <div className="flex add-list-container w-4/12">
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="add-list-input bg-white dark:bg-card dark:border-black text-black sm:text-sm rounded-lg block p-2.5 pl-4 dark:text-white" 
                        placeholder="List Title" 
                        required=""
                    />
                    <button type="submit" className="bg-purple text-white py-2.5 px-6 rounded-xl hover:bg-black transition-all">+</button>
                </div>
                {error && <small className='text-red m-0 p-0'>{error}</small>}
            </div>
        </form>
    )
}

export default CreateListForm
