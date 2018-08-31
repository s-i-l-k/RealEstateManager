import React from 'react';

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 1,
            buildings: []
        };
    }
    handleBuildingChange = (event) => {
        this.setState({selectedOption: event.target.value});
    };

    componentDidMount() {
        fetch('http://localhost:3000/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({buildings}));
    }

    render(){
        return (
            <div className="forFixed">
                <form>
                    Wybierz nieruchomość:
                    {this.state.buildings.map((building, i) => {
                        return (
                            <label key={i}>
                                <input type="radio" value={building.id} checked={this.state.selectedOption == building.id} onChange={this.handleBuildingChange}/>
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
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(tasks => this.setState({ tasks }));
    }

    handleItemDone = (task) => {
        const data = this.state;

        fetch('http://localhost:3000/tasks/' + task.id, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then( data => { console.log(data);});
    };

    render() {
        return (
            <div> Dodaj zadanie:
                <ToDoForm id={this.props.id} selected={this.props.selected}/>
                <ul>
                    {this.state.tasks.map((task, i) => {
                        return <ToDoItem key={i} task={ task } onDone={this.handleItemDone}/>
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
            fetch('http://localhost:3000/tasks/' + this.props.id)
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
            .then( data => { console.log(data);});
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
                <li><span>{this.props.task.task}</span>
                    <button onClick={this.handleDoneClick}>Zakończ</button>
                </li>
        )
    }
}

export default ToDo;