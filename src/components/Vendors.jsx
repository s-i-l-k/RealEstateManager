import React from 'react';
import VendorCard from "./VendorCard.jsx";
import AddButton from "./AddButton.jsx";

class Tenants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/vendors')
            .then(response => response.json())
            .then(vendors => this.setState({ vendors }));
    }

    handleClick = () => {
        {this.props.history.push('/form/vendors')}
    }

    editVendor = (event) => {
        {this.props.history.push('/form/vendors/' + event.target.id)}
    }

    render() {
        return (
            <div>
                {this.state.vendors.map(vendor => {
                    return <VendorCard key={ vendor.id} vendor={ vendor } onClick={(e) => this.editVendor(e)}/>
                })}
                <AddButton onClick={() => this.handleClick()}/>
            </div>
        )
    }
}

export default Tenants;
