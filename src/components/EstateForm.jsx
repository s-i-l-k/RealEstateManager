import React from "react";
import history from "./history";

class EstateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            street : "",
            number : "",
            flat : "",
            rooms : "",
            area : "",
            startDate : "",
            expiringDate : "",
            rent : "",
            service : "",
            dayOfPayment: ""
        }

    }

    componentDidMount() {
        if (this.props.id) {
            fetch(`https://realestatemanager-4c9ef.firebaseio.com/buildings/${this.props.id}.json`)
                .then(response => response.json())
                .then(data => {
                    this.setState(data)
                })
        }

    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handleStreetChange = (event) => {
        this.setState({street: event.target.value})
    }

    handleNumberChange = (event) => {
        this.setState({number: event.target.value})
    }

    handleFlatChange = (event) => {
        this.setState({flat: event.target.value})
    }

    handleRoomsChange = (event) => {
        this.setState({rooms: event.target.value})
    }

    handleAreaChange = (event) => {
        this.setState({area: event.target.value})
    }

    handleStartDateChange = (event) => {
        this.setState({startDate: event.target.value})
    }

    handleExpiringDateChange = (event) => {
        this.setState({expiringDate: event.target.value})
    }

    handleRentChange = (event) => {
        this.setState({rent: event.target.value})
    }

    handleServiceChange = (event) => {
        this.setState({service: event.target.value})
    }

    handleDayOfPaymentChange = (event) => {
        this.setState({dayOfPayment: event.target.value})
    }

    send = () => {
        const data = this.state;

        const createUrl = `https://realestatemanager-4c9ef.firebaseio.com/buildings.json`;
        const updateUrl = `https://realestatemanager-4c9ef.firebaseio.com/buildings/${this.props.id}.json`;

        fetch(this.props.id ? updateUrl : createUrl, {
            method : this.props.id ? "PUT" : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(() => history.replace("/estates"))
            .then( () => { console.log(data);});
    }

    render() {

        return (
            <div className="form">
                <h3>NOWA NIERUCHOMOŚĆ</h3>
                <form>
                    <label>
                        Nazwa nieruchomości
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    </label>
                    <label>
                        Adres: <br/>
                        <input type="text" value={this.state.street} placeholder="Ulica" onChange={this.handleStreetChange}/>
                        <input type="text" value={this.state.number} placeholder="Numer domu" onChange={this.handleNumberChange}/>
                        <input type="text" value={this.state.flat} placeholder="Numer mieszkania" onChange={this.handleFlatChange}/>
                    </label>
                    <label>
                        Liczba pokoi
                        <input type="number" value={this.state.rooms} onChange={this.handleRoomsChange}/><br/>
                    </label>
                    <label>
                        Powierzchnia
                        <input type="number" value={this.state.area} onChange={this.handleAreaChange}/><br/>
                    </label>
                    <label>
                        Dane dotyczące umowy: <br/>
                        <input type="text" value={this.state.startDate} placeholder="Data rozpoczęcia umowy" onChange={this.handleStartDateChange}/>
                        <input type="text" value={this.state.expiringDate} placeholder="Data zakończenia umowy" onChange={this.handleExpiringDateChange}/>
                        <input type="number" value={this.state.rent} placeholder="Czynsz" onChange={this.handleRentChange}/>
                        <input type="number" value={this.state.service} placeholder="Koszty eksploatacyjne" onChange={this.handleServiceChange}/>
                        <input type="number" value={this.state.dayOfPayment} placeholder="Dzień płatności" onChange={this.handleDayOfPaymentChange}/>
                    </label>
                    <input type="submit" onClick={this.send} value="Zapisz" className="sendbtn"/>
                </form>
            </div>
        )
    }
}

export default EstateForm;