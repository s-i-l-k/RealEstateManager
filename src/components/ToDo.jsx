import React from 'react';

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            buildings: []
        };
    }
    handleBuildingChange = (event) => {
        this.setState({selectedOption: event.target.value});
    };

    componentDidMount() {
        fetch('/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({buildings}));
    }

    render(){
        return (
            <div className="forFixed">
                <div className="toDoImg"></div>
                <form>
                    Wybierz nieruchomość:
                    {this.state.buildings.map((building, i) => {
                        return (
                            <label key={i}>
                                <input type="radio" value={building.name} checked={this.state.selectedOption == building.name} onChange={this.handleBuildingChange}/>
                                {building.name}
                            </label>
                        )
                    })}
                </form>
                <ToDoList id={this.props.match.params.id} selected={this.state.selectedOption}/>
            </div>
        )
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => this.setState({ tasks }));
    }

    handleItemDone = (task) => {
        const data = this.state;
        fetch('/tasks/' + task.id, {
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
            <div> Dodaj zadanie:
                <ToDoForm onTaskAdd={this.taskAdd} id={this.props.id} selected={this.props.selected}/>
                <ul>
                    {this.state.tasks.map((task, i) => {
                        return <ToDoItem key={i} task={ task } onDone={this.handleItemDone} />
                    })}
                </ul>
            </div>
        )
    }
}

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            selectedOption: ""
        }

    }

    componentDidMount() {
        if (this.props.id) {
            fetch('/tasks/' + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState(data)
                })
        }

    }

    onChange = (event) => {
        this.setState({
            task: event.target.value ,
            selectedOption: this.props.selected
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.send();
    }

    send = () => {
        const data = this.state;

        fetch('http://localhost:3000/tasks', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then((newTask) => this.props.onTaskAdd(newTask))
            .then(() => this.setState({ task: "" }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input value={this.state.task} onChange={this.onChange} />
                <button>Dodaj</button>
            </form>
        )
    }
}

class ToDoItem extends React.Component{
    handleDoneClick = () => {
        if ( typeof this.props.onDone === 'function' ){
            this.props.onDone(this.props.task);
        }
    }
    render(){
        return (
            <li><span>{this.props.task.task}</span> <span>{this.props.task.selectedOption}</span>
                <button onClick={this.handleDoneClick} >Zakończ</button>
            </li>
        )
    }
}

export default ToDo;