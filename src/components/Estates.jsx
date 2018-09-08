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
        fetch('https://realestatemanager-4c9ef.firebaseio.com/buildings.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(buildings => this.setState({ buildings }));
    }

    handleClick = () => {
        {this.props.history.push('/form/estates')};
    }

    editBuilding = (event) => {
        {this.props.history.push('/form/estates/' + event.target.id)}
    }

    handleBuildingRemove = (building) => {
        const data = this.state;
        fetch(`https://realestatemanager-4c9ef.firebaseio.com/buildings/${building.id}.json`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        })
            .then(resp => resp.json())
            .then( data => { console.log("@@@@", data);})
            .then(() => this.buildingRemove(building));
    }

    buildingRemove = ({ id }) => {
        console.log('remove', id);
        this.setState((state) => {
            return {
                buildings: state.buildings.filter((buildingToFilter) => buildingToFilter.id !== id)
            }
        })
    }


    render() {
        return (
            <div className='forFixed'>
                <div className="estateImg"></div>
                {this.state.buildings.map(building => {
                    return <BuildingCard key={ building.id } building={ building } onClick={(e) => this.editBuilding(e)} onDelete={this.handleBuildingRemove} />
                })}
                <AddButton onClick={() => this.handleClick()}/>
            </div>
        )
    }
}

export default Estates;
