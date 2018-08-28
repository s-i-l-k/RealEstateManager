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
                    <button onClick={this.props.onClick} id={vendor.id}>Edytuj</button>
                    <button>Nieruchomości</button>
                    <button>Płatności</button>
                    <button>Alerty</button>
                    <button>Do zrobienia</button>
                </div>
        )
    }
}

export default VendorCard;