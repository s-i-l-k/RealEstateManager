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
                {this.state.buildings.map(((building, i) => {
                    return <IsPaid key={building.id} building={building} day={this.state.date.getDate()}
                                       month={this.state.date.getMonth() +1} days={this.daysInMonths(this.state.date.getMonth() +1, this.state.date.getFullYear())}
                                       year={this.state.date.getFullYear()} today={this.state.date.toLocaleDateString()} id={building.id}/>
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

    componentDidMount() {
        if (this.props.id) {
            fetch('http://localhost:3000/payments/' + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState(data)
                })
        }

        if(this.props.building.dayOfPayment + "." + this.props.month + "." + this.props.year < this.props.today) {
            this.setState({
                late: true
            });
        }
    }

    handleCheck = () => {
        let month = monthsMap.get(this.props.month + this.state.counter);

        this.setState({
            arr: [...this.state.arr, month],
            counter: this.whatCounter(),
        }, this.isLate);
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

    render() {
        let nextMonth = monthsMap.get(this.props.month + this.state.counter);

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
                    <SendButton arr={this.state.arr} id={this.props.id} />
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
                        <SendButton arr={this.state.arr} id={this.props.id} />
                    </div>
                )
            }
    }
}

class SendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }

    update = () => {
        this.setState({
            arr: this.props.arr
        }, this.send)
    }

    send = () => {
        const data = this.state;
        fetch('http://localhost:3000/payments' + (this.props.id ? `/${this.props.id}` : ""),{
            method : this.props.id ? "PUT" : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then( data => { console.log(data);})
    }

    render() {
        return <button onClick={this.update}>Zapisz</button>
    }
}

const monthsMap = new Map([[1,"styczeń"],[2,"luty"],[3,"marzec"],[4,"kwiecień"],[5,"maj"],[6,"czerwiec"],
    [7,"lipiec"],[8,"sierpień"],[9,"wrzesień"],[10,"październik"],[11,"listopad"],[12,"grudzień"]]);

export default Payments;