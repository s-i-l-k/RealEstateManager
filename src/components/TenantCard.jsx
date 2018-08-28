import React from "react";

class TenantCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {tenant} = this.props;
        return (
            <div className="card">
                <h2>{ tenant.name}</h2>
                <hr/>
                <p>PESEL: {tenant.pesel}</p>
                <p>Telefon: <a href={`tel:${tenant.phone} sms:${tenant.phone}`}>{tenant.phone}</a></p>
                <p>E-mail: <a href={`tel:${tenant.email}`}>{tenant.email}</a></p>
                <button onClick={this.props.onClick} id={tenant.id}>Edytuj</button>
                <button>Nieruchomości</button>
                <button>Płatności</button>
                <button>Alerty</button>
                <button>Do zrobienia</button>
            </div>
        )
    }
}

export default TenantCard;