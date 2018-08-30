import React from 'react';

class ToDoList extends React.Component {
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

    onChange = (event) => {
        this.setState({ new: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            new: '',
            tasks: [...this.state.tasks, this.state.new],
        });
    }

    handleItemDone = (title) => {
        const newItems = this.state.tasks.filter(item => {
            return item !== title;
        });
        this.setState({
            tasks: newItems
        });
    };

    render(){
        const items = this.state.tasks.map((item, i) => {
            return <ToDoItem
                key={i}
                title={item}
                onDone={this.handleItemDone}
                id={item.id}
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
                <button onClick={this.send}>Koniec na dziś</button>
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
            <div>
                <li><span>{this.props.title}</span>
                    <button onClick={this.handleDoneClick}>Zakończ</button>
                </li>
            </div>
        )
    }
}

export default ToDoList;