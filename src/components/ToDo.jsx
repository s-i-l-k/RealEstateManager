import React from 'react';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 1,
            buildings:[]
        };
    }
    handleBuildingChange = (event) => {
        console.log(event.target.value)
        this.setState({selectedOption: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Została wybrana nieruchomość '
            + this.state.selectedOption);
    };

    componentDidMount() {
        fetch('http://localhost:3000/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({ buildings }));
    };

    render(){
        return (
            <div className="forFixed">
                <form onSubmit={this.handleSubmit}>
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
                <ToDoForm id={this.props.match.params.id}/>
            </div>
        )
    }
}

class ToDoForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            new: ''
        };
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
        this.setState({ new: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            new: '',
            tasks: [...this.state.tasks, this.state.new],
        }, this.send);
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

    handleItemDone = (title) => {
        const newItems = this.state.tasks.filter(item => {
            return item !== title;
        });
        this.setState({
            tasks: newItems
        }, this.remove);
    };

    remove = () => {
        const data = this.state;

        fetch('http://localhost:3000/tasks/' + this.props.id, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then( data => { console.log(data);});
    }

    render(){
        const items = this.state.tasks.map((item, i) => {
            return <ToDoItem
                key={i}
                title={item}
                onDone={this.handleItemDone}
                id={this.props.id}
            />
        });
        return (
            <div>Dodaj zadanie:
                <form onSubmit={this.onSubmit}>
                    <input value={this.state.new} onChange={this.onChange} />
                    <button>Dodaj</button>
                </form>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}

class ToDoItem extends React.Component{
    handleDoneClick = () => {
        if ( typeof this.props.onDone === 'function' ){
            this.props.onDone(this.props.title);
        }
    }
    render(){
        return (
            <li><span>{this.props.title}</span>
            <button onClick={this.handleDoneClick}>Zakończ</button>
        </li>
        )
    }
}

export default ToDoList;
