import React from "react";

class BuildingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {building} = this.props;
        return (
            <div>
                <h2>{ building.name }</h2>
                <p>adres: {building.street} {building.number} / {building.flat}</p>
                <p>powierchnia: {building.area} m2</p>
                <p>l.pokoi: {building.rooms}</p>
                <p>początek umowy: {building.startDate}</p>
                <p>koniec umowy: {building.expiringDate}</p>
                <p>data płatności: do {building.dayOfPayment} każdego miesiąca</p>
                <p>czynsz: {building.rent} zł + koszty eksploatacyjne: {building.service} zł</p>
                <button onClick={this.props.onClick} id={building.id}>Edytuj</button>
                <button>Najemcy</button>
                <button>Płatności</button>
                <button>Alerty</button>
                <button>Do zrobienia</button>
            </div>
        )
    }
}

export default BuildingCard;