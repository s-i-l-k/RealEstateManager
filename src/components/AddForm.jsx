import React from 'react';
import {NavLink} from 'react-router-dom';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.match.params.type === "estates") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="estateImg"></div>
                    <FullForm id={ this.props.match.params.id } />
                </div>
            )
        } else if (this.props.match.params.type === "tenants") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="tenantImg"></div>
                    <TenantForm id={ this.props.match.params.id } />
                </div>
            )
        } else if (this.props.match.params.type === "vendors") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="vendorImg"></div>
                    <VendorForm id={ this.props.match.params.id } />
                </div>
            )
        }
    }
}


class FullForm extends React.Component {
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

            .then( () => { console.log(data);});
    }

    render() {

        return (
            <div>
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
                    <NavLink to="/estates"><input type="submit" onClick={this.send}/></NavLink>
                </form>
            </div>
        )
    }
}

class TenantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            pesel: ''
        }
    }

    componentDidMount() {
        if (this.props.id) {
            fetch(`https://realestatemanager-4c9ef.firebaseio.com/tenants/${this.props.id}.json`)
                .then(response => response.json())
                .then(data => {
                    this.setState(data)
                })
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    handlePeselChange = (event) => {
        this.setState({pesel: event.target.value})
    }

    send = () => {
        const data = this.state;

        const createUrl = `https://realestatemanager-4c9ef.firebaseio.com/tenants.json`;
        const updateUrl = `https://realestatemanager-4c9ef.firebaseio.com/tenants/${this.props.id}.json`;


        fetch(this.props.id ? updateUrl : createUrl, {
            method : this.props.id ? "PUT" : 'POST',
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
            <div>
                <h3>NOWY NAJEMCA</h3>
                <form>
                    <label>
                        Imię i nazwisko
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    </label>
                    <label>
                        Telefon
                        <input type="number" value={this.state.phone} onChange={this.handlePhoneChange}></input><br/>
                    </label>
                    <label>
                        Email
                        <input type="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                    </label>
                    <label>
                        Pesel
                        <input type="number" value={this.state.pesel} onChange={this.handlePeselChange}></input><br/>
                    </label>
                    <NavLink to={'/tenants'}><input type="submit" onClick={this.send}/></NavLink>
                </form>
            </div>
        )
    }
}

class VendorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            profession: '',
            phone: '',
            email: ''
        }
    }

    componentDidMount() {
        if (this.props.id) {
            fetch(`https://realestatemanager-4c9ef.firebaseio.com/vendors/${this.props.id}.json`)
                .then(response => response.json())
                .then(data => {
                    this.setState(data)
                })
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handleProfessionChange = (event) => {
        this.setState({profession: event.target.value})
    }

    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    send = () => {
        const data = this.state;

        const createUrl = `https://realestatemanager-4c9ef.firebaseio.com/vendors.json`;
        const updateUrl = `https://realestatemanager-4c9ef.firebaseio.com/vendors/${this.props.id}.json`;

        fetch(this.props.id ? updateUrl : createUrl, {
            method : this.props.id ? "PUT" : 'POST',
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
            <div>
                <h3>NOWY WYKONAWCA</h3>
                <form>
                    <label>
                        Imię i nazwisko
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    </label>
                    <label>
                        Specjalność
                        <input type="text" value={this.state.profession} onChange={this.handleProfessionChange}/><br/>
                    </label>
                    <label>
                        Telefon
                        <input type="number" value={this.state.phone} onChange={this.handlePhoneChange}></input><br/>
                    </label>
                    <label>
                        Email
                        <input type="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                    </label>
                    <NavLink to="/vendors"><input type="submit" onClick={this.send}/></NavLink>
                </form>
            </div>
        )
    }
}

export default AddForm;

