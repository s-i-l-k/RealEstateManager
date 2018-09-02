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
        fetch('https://realestatemanager-4c9ef.firebaseio.com/buildings.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(buildings => this.setState({buildings}));
    }

    render(){
        return (
            <div className="forFixed">
                <div className="toDoImg"></div>
                <div className="toDoList">
                    <h2>Lista zadań</h2>
                    <hr/>
                    <form className="toDoForm">
                        Wybierz nieruchomość:
                        {this.state.buildings.map((building, i) => {
                            return (
                                <div className="pick">
                                    <label key={i}>
                                        <input type="radio" value={building.name} checked={this.state.selectedOption == building.name} onChange={this.handleBuildingChange}/>
                                        {building.name}
                                    </label>
                                </div>
                            )
                        })}
                    </form>
                    <ToDoList id={this.props.match.params.id} selected={this.state.selectedOption}/>
                </div>
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
            fetch(`https://realestatemanager-4c9ef.firebaseio.com/tasks/${this.props.id}.json`,)
                .then(response => response.json())
                .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
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

        fetch('https://realestatemanager-4c9ef.firebaseio.com/tasks.json', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(({ name }) => this.props.onTaskAdd({ ...data, id: name }))
            .then(() => this.setState({ task: "" }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <input className="taskPlace" value={this.state.task} onChange={this.onChange} />
                <button className="sendbtn">Dodaj</button>
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
            <li><p className="task">{this.props.task.task} <span className="building">{this.props.task.selectedOption}</span>
                <button className="paidbtn" onClick={this.handleDoneClick} >Zakończ</button></p>
            </li>
        )
    }
}

export default ToDo;