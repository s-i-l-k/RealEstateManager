import React from "react";
import history from "./history";

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
            .then(() => history.replace("/vendors"))
            .then( data => { console.log(data);});
    }

    render() {

        return (
            <div className="form">
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
                    <input type="submit" onClick={this.send} value="Zapisz" className="sendbtn"/>
                </form>
            </div>
        )
    }
}

export default VendorForm;