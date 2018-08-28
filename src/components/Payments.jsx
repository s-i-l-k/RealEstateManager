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
            <div className={["container", "forFixed"].join(" ")}>
                {this.state.buildings.map((building => {
                    return <IsPaid key={building.id} building={building} day={this.state.date.getDate()} month={this.state.date.getMonth() +1} days={this.daysInMonths(this.state.date.getMonth() +1, this.state.date.getFullYear())} year={this.state.date.getFullYear()} today={this.state.date.toLocaleDateString()}/>
                }))}
            </div>
        )
    }
}

class IsPaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            late: false,
            counter: 0
        }
    }

    handleCheck = () => {
        let month;
        if(this.props.month + this.state.counter === 1) {
            month = "styczeń";
        } else if (this.props.month + this.state.counter === 2){
            month = "luty";
        } else if (this.props.month + this.state.counter === 3){
            month = "marzec";
        } else if (this.props.month + this.state.counter === 4){
            month = "kwiecień";
        } else if (this.props.month + this.state.counter === 5){
            month = "maj";
        } else if (this.props.month + this.state.counter === 6){
            month = "czerwiec";
        } else if (this.props.month + this.state.counter === 7){
            month = "lipiec";
        } else if (this.props.month + this.state.counter === 8){
            month = "sierpień";
        } else if (this.props.month + this.state.counter === 9){
            month = "wrzesień";
        } else if (this.props.month + this.state.counter === 10){
            month = "październik";
        } else if (this.props.month + this.state.counter === 11){
            month = "listopad";
        } else if (this.props.month + this.state.counter === 12){
            month = "grudzień";
        }

        this.setState({
            arr: [...this.state.arr, month],
            counter: this.whatCounter(),
        }, this.isLate());
    }

    isLate = () => {
        if(this.state.late) {
            this.setState({
                late: false
            })
        }
    }

    whatCounter = () => {
        if(this.props.month + this.state.counter === 12) {
            return this.state.counter - 11
        } else {
            return this.state.counter + 1
        }
    }

    componentDidMount() {

        if(this.props.building.dayOfPayment + "." + this.props.month + "." + this.props.year < this.props.today) {
            this.setState({
                late: true
            });
        }
    }

    render() {
        let nextMonth = this.props.month + this.state.counter;
        if(this.props.month + this.state.counter === 1) {
            nextMonth = "styczeń";
        } else if (this.props.month + this.state.counter === 2){
            nextMonth = "luty";
        } else if (this.props.month + this.state.counter === 3){
            nextMonth = "marzec";
        } else if (this.props.month + this.state.counter === 4){
            nextMonth = "kwiecień";
        } else if (this.props.month + this.state.counter === 5){
            nextMonth = "maj";
        } else if (this.props.month + this.state.counter === 6){
            nextMonth = "czerwiec";
        } else if (this.props.month + this.state.counter === 7){
            nextMonth = "lipiec";
        } else if (this.props.month + this.state.counter === 8){
            nextMonth = "sierpień";
        } else if (this.props.month + this.state.counter === 9){
            nextMonth = "wrzesień";
        } else if (this.props.month + this.state.counter === 10){
            nextMonth = "październik";
        } else if (this.props.month + this.state.counter === 11){
            nextMonth = "listopad";
        } else if (this.props.month + this.state.counter === 12){
            nextMonth = "grudzień";
        }

        if(this.state.late === false){
            return (
                <div>
                    <p>Płatności {this.props.building.name}</p>
                    {this.state.arr.map((e, i) => {
                            return <label key={i}>{e}
                                <input type="checkbox" checked disabled></input>
                            </label>
                        }
                    )}
                    <br/>
                    <label>Potwierdź płatność za miesiąc {nextMonth}
                        <button onClick={this.handleCheck}>Zapłacono</button>
                    </label>
                </div>
            )
        } else if (this.state.late){
                return (
                    <div>
                        <p>Płatności {this.props.building.name}</p>
                        <p>Opóźnienie {Math.abs(Number(this.props.day) - Number(this.props.building.dayOfPayment))} dni!</p>
                        <label>Potwierdź płatność za miesiąc {nextMonth}
                            <button onClick={this.handleCheck}>Zapłacono</button>
                        </label>
                    </div>
                )
            }
    }
}

export default Payments;