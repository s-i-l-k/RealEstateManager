import React from 'react';
import BuildingCard from "./BuildingCard.jsx";
import AddButton from "./AddButton.jsx";

class Estates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({ buildings }));
    }

    handleClick = () => {
        {this.props.history.push('/form/estates')};
    }

    editBuilding = (event) => {
        {this.props.history.push('/form/estates/' + event.target.id)}
    }


    render() {
        return (
            <div>
                {this.state.buildings.map(building => {
                    return <BuildingCard key={ building.id } building={ building } onClick={(e) => this.editBuilding(e)}/>
                })}
                <AddButton onClick={() => this.handleClick()}/>
            </div>
        )
    }
}

export default Estates;
