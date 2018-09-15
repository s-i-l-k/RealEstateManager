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
                    <div className="forDesktop">
                        <div className="estateImg"></div>
                        <div className="cardsPlace">
                            <EstateForm id={ this.props.match.params.id } />
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.match.params.type === "tenants") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="forDesktop">
                        <div className="tenantImg"></div>
                        <div className="cardsPlace">
                            <TenantForm id={ this.props.match.params.id } />
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.match.params.type === "vendors") {
            return (
                <div className={["container", "forFixed"].join(" ")}>
                    <div className="forDesktop">
                        <div className="vendorImg"></div>
                        <div className="cardsPlace">
                            <VendorForm id={ this.props.match.params.id } />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AddForm;

