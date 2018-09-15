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
        fetch('https://realestatemanager-4c9ef.firebaseio.com/buildings.json')
            .then(response => response.json())
            .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
            .then(buildings => this.setState({ buildings }));
    }

    render() {
        return (
            <div className={["container", "forFixed"].join(" ")}>
                <div className="forDesktop">
                    <div className="paymentImg"></div>
                    <div className="cardsPlace">
                    {this.state.buildings.map(((building, i) => {
                        return <IsPaid key={building.id} building={building} day={this.state.date.getDate()}
                                        month={this.state.date.getMonth() +1} days={this.daysInMonths(this.state.date.getMonth() +1, this.state.date.getFullYear())}
                                        year={this.state.date.getFullYear()} today={this.state.date.getDate()} id={building.id}/>
                    }))}
                    </div>
                </div>
            </div>
        )
    }
}

class IsPaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: null,
            late: false,
            counter: 0
        }
    }

    componentDidMount() {
        if (this.props.building) {
            fetch('https://realestatemanager-4c9ef.firebaseio.com/payments.json')
                .then(response => response.json())
                .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
                .then(data => {
                    const payment = data.find(payment => payment.buildingId === this.props.building.id);

                    if (payment) {
                        this.setState({ payment })
                    } else {
                        this.setState({ payment: { arr: [], buildingId: this.props.building.id } })
                    }
                })
        }

        if(this.props.building.dayOfPayment < this.props.today) {
            this.setState({
                late: true
            });
        }
    }

    handleCheck = () => {
        let month = monthsMap.get(this.props.month + this.state.counter);

        this.setState((state) => {
            const newPayment = { ...state.payment };
            newPayment.arr = [ ...state.payment.arr, month];

            return {
                payment: newPayment,
                counter: this.whatCounter(),
                late: state.late === true ? false : state.late,
            }
        });
    }

    whatCounter = () => {
        if(this.props.month + this.state.counter === 12) {
            return this.state.counter - 11
        } else {
            return this.state.counter + 1
        }
    }

    onItemSaved = (item) => {
        savedPayment => this.setState({ payment: savedPayment })
    }

    render() {
        if (!this.state.payment) {
            return <div>loading...</div>;
        }

        let nextMonth = monthsMap.get(this.props.month + this.state.counter );

        if(this.state.late === false){
            return (
                <div className="payment">
                    <div className="greenCircle"><h3>{this.props.building.name.slice(0, 1)}</h3></div>
                    <h2>Płatności {this.props.building.name}</h2>
                    <hr/>
                    <div className="paid">
                        {this.state.payment.arr.map((e, i) => {
                                return <label key={i} className="paidItem">{e}
                                    <input type="checkbox" checked disabled></input>
                                </label>
                            }
                        )}
                    </div>
                    <br/>
                    <div className="confirmPayment">
                        <label>Potwierdź płatność za miesiąc <span>{nextMonth}</span>
                            <button className="paidbtn" onClick={this.handleCheck}>Zapłacono</button>
                        </label>
                    </div>
                    <SendButton payment={this.state.payment} onSaved={ this.onItemSaved }/>
                </div>
            )
        } else if (this.state.late){
                return (
                    <div className="payment">
                        <div className="greenCircle"><h3>{this.props.building.name.slice(0, 1)}</h3></div>
                        <h2>Płatności {this.props.building.name}</h2>
                        <hr/>
                        <p>Opóźnienie <span>{Math.abs(Number(this.props.day) - Number(this.props.building.dayOfPayment))}</span> dni!</p>
                        <div className="confirmPayment">
                            <label>Potwierdź płatność za miesiąc <span>{nextMonth}</span>
                                <button className="paidbtn" onClick={this.handleCheck}>Zapłacono</button>
                            </label>
                        </div>
                        <SendButton payment={this.state.payment} onSaved={ this.onItemSaved }/>
                    </div>
                )
            }
    }
}

class SendButton extends React.Component {
    send = () => {
        const payment = this.props.payment;

        const createUrl = `https://realestatemanager-4c9ef.firebaseio.com/payments.json`;
        const updateUrl = `https://realestatemanager-4c9ef.firebaseio.com/payments/${payment.id}.json`;

        fetch(this.props.id ? updateUrl : createUrl,{
            method : payment.id ? "PUT" : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(payment)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .then(data => this.props.onSaved(data) )
    }

    render() {
        return <button className="sendbtn" onClick={this.send}>Zapisz</button>
    }
}

const monthsMap = new Map([[1,"styczeń"],[2,"luty"],[3,"marzec"],[4,"kwiecień"],[5,"maj"],[6,"czerwiec"],
    [7,"lipiec"],[8,"sierpień"],[9,"wrzesień"],[10,"październik"],[11,"listopad"],[12,"grudzień"]]);


export default Payments;