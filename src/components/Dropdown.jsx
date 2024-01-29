const Dropdown = (props) => {
  return (
    <div className="dropdown absolute bg-card-light border border-section-light rounded-lg">
    <div className="flex gap-2 border-b border-section-light">
            <img className="icon smallest" src={require("../imgs/icons/edit.png")} alt="" />
            <button 
                onClick={(e) => {
                    props.handleEdit()
                }} 
                className="block w-full text-start transition-all hover:text-grey"
            >Edit</button>
    </div>
    <div className="flex gap-2 border-b border-section-light">
            <img className="icon smallest" src={require("../imgs/icons/delete.png")} alt="" />
            <button 
                onClick={(e) => {
                    props.handleDelete()
                }} 
                className="text-red hover:text-red-darker block w-full text-start transition-all"
            >Delete</button>
        </div>
    </div>
  );
};

export default Dropdown;