import React from "react";

class BuildingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {building} = this.props;
        return (
            <div className="card">
                <h2>{ building.name }</h2>
                <hr/>
                <p>adres: {building.street} {building.number} / {building.flat}</p>
                <p>powierchnia: {building.area} m2</p>
                <p>l.pokoi: {building.rooms}</p>
                <p>początek umowy: {building.startDate}</p>
                <p>koniec umowy: {building.expiringDate}</p>
                <p>data płatności: do {building.dayOfPayment} każdego miesiąca</p>
                <p>czynsz: {building.rent} zł + koszty eksploatacyjne: {building.service} zł</p>
                <div className="cardbtn">
                    <button onClick={this.props.onClick} id={building.id} className="mainbtn">Edytuj</button>
                    <button className="mainbtn">Usuń</button>
                    <button>Najemcy</button>
                    <button>Alerty</button>
                    <button>Do zrobienia</button>
                </div>
            </div>
        )
    }
}

export default BuildingCard;