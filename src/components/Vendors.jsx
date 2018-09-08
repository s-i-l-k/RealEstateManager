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
        fetch('https://realestatemanager-4c9ef.firebaseio.com/vendors.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(vendors => this.setState({ vendors }));
    }

    handleClick = () => {
        {this.props.history.push('/form/vendors')}
    }

    editVendor = (event) => {
        {this.props.history.push('/form/vendors/' + event.target.id)}
    }

    handleVendorRemove = (vendor) => {
        const data = this.state;
        fetch(`https://realestatemanager-4c9ef.firebaseio.com/vendors/${vendor.id}.json`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        })
            .then(resp => resp.json())
            .then( data => { console.log("@@@@", data);})
            .then(() => this.vendorRemove(vendor));
    }

    vendorRemove = ({ id }) => {
        console.log('remove', id);
        this.setState((state) => {
            return {
                vendors: state.vendors.filter((vendorToFilter) => vendorToFilter.id !== id)
            }
        })
    }

    render() {
        return (
            <div className={["container", "forFixed"].join(" ")}>
                <div className="vendorImg"></div>
                {this.state.vendors.map(vendor => {
                    return <VendorCard key={ vendor.id} vendor={ vendor } onClick={(e) => this.editVendor(e)} onDelete={this.handleVendorRemove}/>
                })}
                <AddButton onClick={() => this.handleClick()}/>
            </div>
        )
    }
}

export default Tenants;
