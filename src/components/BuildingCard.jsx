import React from "react";
import {NavLink} from 'react-router-dom';
import Tenants from "./Tenants.jsx";

class BuildingCard extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {building} = this.props;
        return (
            <div className="card">
                <h2>{ building.name }</h2>
                <hr/>
                <p><span>adres:</span> {building.street} {building.number} / {building.flat}</p>
                <p><span>powierchnia:</span> {building.area} m2</p>
                <p><span>l.pokoi:</span> {building.rooms}</p>
                <p><span>początek umowy:</span> {building.startDate}</p>
                <p><span>koniec umowy: </span>{building.expiringDate}</p>
                <p><span>data płatności: </span>do {building.dayOfPayment} każdego miesiąca</p>
                <p><span>czynsz: </span>{building.rent} zł + koszty eksploatacyjne: {building.service} zł</p>
                <div className="cardbtn">
                    <button onClick={this.props.onClick} id={building.id} className="mainbtn">Edytuj</button>
                    <button onClick={() => this.props.onDelete(this.props.building)} className="mainbtn">Usuń</button>
                    <button onClick={this.showTenants}>Najemcy</button>
                    <button><NavLink to="/payments" className="navButton">Płatności</NavLink></button>
                    <button><NavLink to="/todo" className="navButton">Do zrobienia</NavLink></button>
                </div>
            </div>
        )
    }
}

class More extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onClick}>Pokaż więcej</button>
                {this.props.children}
            </div>
        )
    }
}

export default BuildingCard;