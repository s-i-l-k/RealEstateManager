import React from 'react';
import EstateForm from "./EstateForm.jsx";
import TenantForm from "./TenantForm.jsx";
import VendorForm from "./VendorForm.jsx";
import history from "./history";

class AddForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.match.params.type === "estates") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="estateImg"></div>
                    <EstateForm id={ this.props.match.params.id } />
                </div>
            )
        } else if (this.props.match.params.type === "tenants") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="tenantImg"></div>
                    <TenantForm id={ this.props.match.params.id } />
                </div>
            )
        } else if (this.props.match.params.type === "vendors") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="vendorImg"></div>
                    <VendorForm id={ this.props.match.params.id } />
                </div>
            )
        }
    }
}

export default AddForm;

