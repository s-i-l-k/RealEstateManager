import React from "react";

class ToDoItem extends React.Component{
    handleDoneClick = () => {
        if ( typeof this.props.onDone === 'function' ){
            this.props.onDone(this.props.task);
        }
    }
    render(){
        return (
            <li><p className="task">{this.props.task.task} <span className="building">{this.props.task.selectedOption}</span>
                <button className="paidbtn" onClick={this.handleDoneClick} >Zakończ</button></p>
            </li>
        )
    }
}

export default ToDoItem;