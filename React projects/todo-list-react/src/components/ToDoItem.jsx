import React from "react";
import DeleteIcon from "@material-ui/icons/HighlightOff";


function ToDoItem(props) {
  return (
    <div>
      <li>{props.text}  
        <DeleteIcon className="deleteIcon" onClick={() => {
        props.onChecked(props.id);}}/>
      </li>
     
    </div>
  );
}

export default ToDoItem;
