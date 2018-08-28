import React from "react";

class VendorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {vendor} = this.props;
        return (
                <div className="card">
                    <h2>{ vendor.name}</h2>
                    <hr/>
                    <p>Telefon: <a href={`tel:${vendor.phone} sms:${vendor.phone}`}>{vendor.phone}</a></p>
                    <p>E-mail: <a href={`tel:${vendor.email}`}>{vendor.email}</a></p>
                    <div className="cardbtn">
                        <button onClick={this.props.onClick} id={vendor.id} className="mainbtn">Edytuj</button>
                        <button className="mainbtn">Usuń</button>
                    </div>
                </div>
        )
    }
}

export default VendorCard;