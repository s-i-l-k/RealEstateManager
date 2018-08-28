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
        fetch('http://localhost:3000/tenants')
            .then(response => response.json())
            .then(tenants => this.setState({ tenants }));
    }

    handleClick = () => {
        {this.props.history.push('/form/tenants')}
    }

    editTenant = (event) => {
        {this.props.history.push('/form/tenants/' + event.target.id)}
    }

    render() {
        return (
            <div className="container">
                {this.state.tenants.map(tenant => {
                    return <TenantCard key={ tenant.id} tenant={ tenant } onClick={(e) => this.editTenant(e)}/>
                })}
                <AddButton onClick={() => this.handleClick()}/>
            </div>
        )
    }
}

export default Tenants;
