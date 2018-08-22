import React from 'react';

class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date,
            buildings: [],
            daysInMonths: ""
        }
    }

    daysInMonths = (month, year) => {
        return new Date(year, month, 0).getDate();
    }

    componentDidMount() {
        fetch('http://localhost:3000/buildings')
            .then(response => response.json())
            .then(buildings => this.setState({ buildings }));
    }

    render() {
        return (
            <div>
                {this.state.buildings.map((building => {
                    return <IsPaid key={building.id} building={building} month={this.state.date.getMonth() +1} days={this.daysInMonths(this.state.date.getMonth() +1, this.state.date.getFullYear())} today={this.state.date.getDate()}/>
                }))}
            </div>
        )
    }
}

class IsPaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            late: true
        }
    }

    handleCheck = () => {
        this.setState({
            checked: this.state.checked ? false : true
        });
        this.isLate();
    }

    isLate = () => {
        if(Number(this.props.building.dayOfPayment) < Number(this.props.today) && this.state.checked === false) {
            this.setState({
                late: false
            });
        } else {
            this.setState({
                late: true
            });
        }
    }

    render() {
        let info;
        if(this.state.late) {
            info = <div>Termin płatności minął {Math.abs(Number(this.props.building.dayOfPayment) - Number(this.props.today))} dni temu!</div>
        } else {
            info = <div>Termin płatności mija za {Number(this.props.building.dayOfPayment) + (Number(this.props.days) - Number(this.props.today))} dni</div>
        }

        return (
            <form>
                {info}
                <label>Czy wpłynęła płatność za miesiąc {this.props.month} ?
                    <input type="checkbox" value={this.state.checked} onChange={this.handleCheck}></input>
                </label>
            </form>
        )
    }
}


export default Payments;
