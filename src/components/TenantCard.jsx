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
                <div className="cardbtn">
                    <button onClick={this.props.onClick} id={tenant.id} className="mainbtn">Edytuj</button>
                    <button onClick={() => this.props.onDelete(this.props.tenant)} className="mainbtn">Usuń</button>
                </div>
            </div>
        )
    }
}

export default TenantCard;