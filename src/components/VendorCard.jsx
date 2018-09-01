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
                    <div className="greenCircle"><h3>{vendor.name.slice(0, 1)}</h3></div>
                    <h2>{ vendor.name}</h2>
                    <hr/>
                    <p><span>Specjalność:</span> {vendor.profession}</p>
                    <p><span>Telefon:</span> <a href={`tel:${vendor.phone} sms:${vendor.phone}`}>{vendor.phone}</a></p>
                    <p><span>E-mail:</span> <a href={`tel:${vendor.email}`}>{vendor.email}</a></p>
                    <div className="cardbtn">
                        <button onClick={this.props.onClick} id={vendor.id} className="editbtn">Edytuj</button>
                        <button onClick={() => this.props.onDelete(this.props.vendor)} className="deletebtn">Usuń</button>
                    </div>
                </div>
        )
    }
}

export default VendorCard;