import React from 'react';

class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date,
            buildings: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({ buildings }));
    }

    render() {
        return (
            <div>
                {this.state.buildings.map((building => {
                    return <IsPaid key={building.id} building={building} month={this.state.date.getMonth() +1}/>
                }))}
            </div>
        )
    }
}

class IsPaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    handleCheck = (event) => {
        this.setState({
            checked: this.state.checked ? false : true
        })
    }

    render() {
        return (
            <form>
                <p>Dla Nieruchomości {this.props.building.name} termin płatności upływa {this.props.building.dayOfPayment}.0{this.props.month}.</p>
                <label>Czy wpłynęła płatność za miesiąc {this.props.month} ?
                    <input type="checkbox" value={this.state.checked} onChange={this.handleCheck}></input>
                </label>
            </form>
        )
    }
}

export default Payments;

// {this.state.date.getDate()}