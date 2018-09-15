import React from 'react';
import ToDoList from "./ToDoList.jsx";

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
                <div className="forDesktop">
                    <div className="toDoImg"></div>
                    <div className="cardsPlace">
                        <div className="toDoList">
                            <h2>Lista zadań</h2>
                            <hr/>
                            <form className="toDoForm">
                                Wybierz nieruchomość:
                                {this.state.buildings.map((building, i) => {
                                    return (
                                        <div className="pick" key={i}>
                                            <label>
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
                </div>
            </div>
        )
    }
}

export default ToDo;