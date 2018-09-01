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
                <div className="greenCircle"><h3>{tenant.name.slice(0, 1)}</h3></div>
                <h2>{ tenant.name}</h2>
                <hr/>
                <p><span>PESEL:</span> {tenant.pesel}</p>
                <p><span>Telefon:</span> <a href={`tel:${tenant.phone} sms:${tenant.phone}`}>{tenant.phone}</a></p>
                <p><span>E-mail:</span> <a href={`tel:${tenant.email}`}>{tenant.email}</a></p>
                <div className="cardbtn">
                    <button onClick={this.props.onClick} id={tenant.id} className="editbtn">Edytuj</button>
                    <button onClick={() => this.props.onDelete(this.props.tenant)} className="deletebtn">Usuń</button>
                </div>
            </div>
        )
    }
}

export default TenantCard;