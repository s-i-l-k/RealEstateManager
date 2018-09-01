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
                <div className="greenCircle"><h3>{building.name.slice(0, 1)}</h3></div>
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
                    <button onClick={this.props.onClick} id={building.id} className="editbtn">Edytuj</button>
                    <button onClick={() => this.props.onDelete(this.props.building)} className="deletebtn">Usuń</button>
                    <button><NavLink to="/tenants" className="navButton">Najemcy</NavLink></button>
                    <button><NavLink to="/payments" className="navButton">Płatności</NavLink></button>
                    <button><NavLink to="/todo" className="navButton">Do zrobienia</NavLink></button>
                </div>
            </div>
        )
    }
}

export default BuildingCard;