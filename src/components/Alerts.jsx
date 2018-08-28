import React from 'react';

class Alerts extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={["container", "forFixed"].join(" ")}>Alert!</div>
        )
    }
}

export default Alerts;