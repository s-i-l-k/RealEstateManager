import React from "react";
import ToDoForm from "./ToDoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        fetch('https://realestatemanager-4c9ef.firebaseio.com/tasks.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(tasks => this.setState({ tasks }));
    }

    handleItemDone = (task) => {
        const data = this.state;
        fetch(`https://realestatemanager-4c9ef.firebaseio.com/tasks/${task.id}.json`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        })
            .then(resp => resp.json())
            .then( data => { console.log("@@@@", data);})
            .then(() => this.taskRemove(task));
    };

    taskAdd = (task) => {
        this.setState((state) => {
            return {
                tasks: [...state.tasks, task]
            }
        })
    }

    taskRemove = ({ id }) => {

        console.log('remove', id);

        this.setState((state) => {
            return {
                tasks: state.tasks.filter((taskToFilter) => taskToFilter.id !== id)
            }
        })
    }

    render() {
        return (
            <div className="addTask"> Dodaj zadanie:
                <ToDoForm onTaskAdd={this.taskAdd} id={this.props.id} selected={this.props.selected}/>
                <div className="toDoCard">
                    <ul>
                        {this.state.tasks.map((task, i) => {
                            return <ToDoItem key={i} task={ task } onDone={this.handleItemDone} />
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ToDoList;