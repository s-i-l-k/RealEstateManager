import React from 'react';
import TenantCard from "./TenantCard.jsx";
import AddButton from "./AddButton.jsx";

class Tenants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenants: []
        }
    }

    componentDidMount() {
        fetch('https://realestatemanager-4c9ef.firebaseio.com/tenants.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(tenants => this.setState({ tenants }));
    }

    handleClick = () => {
        {this.props.history.push('/form/tenants')}
    }

    editTenant = (event) => {
        {this.props.history.push('/form/tenants/' + event.target.id)}
    }

    handleTenantRemove = (tenant) => {
        const data = this.state;
        fetch(`https://realestatemanager-4c9ef.firebaseio.com/tenants/${tenant.id}.json`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        })
            .then(resp => resp.json())
            .then( data => { console.log("@@@@", data);})
            .then(() => this.tenantRemove(tenant));
    }

    tenantRemove = ({ id }) => {
        console.log('remove', id);
        this.setState((state) => {
            return {
                tenants: state.tenants.filter((tenantToFilter) => tenantToFilter.id !== id)
            }
        })
    }

    render() {
        return (
            <div className={["container", "forFixed"].join(" ")}>
                <div className="forDesktop">
                    <div className="tenantImg"></div>
                    <div className="cardsPlace">
                    {this.state.tenants.map(tenant => {
                        return <TenantCard key={ tenant.id} tenant={ tenant } onClick={(e) => this.editTenant(e)} onDelete={this.handleTenantRemove}/>
                    })}
                    <AddButton onClick={() => this.handleClick()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tenants;
