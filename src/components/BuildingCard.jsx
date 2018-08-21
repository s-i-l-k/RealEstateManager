import React from "react";

const BuildingCard = ({ building }) => (
    <div>
        <h2>{ building.name }</h2>
        <p>adres: {building.street} {building.number} / {building.flat}</p>
        <p>powierchnia: {building.area} m2</p>
        <p>l.pokoi: {building.rooms}</p>
        <p>początek umowy: {building.startDate}</p>
        <p>koniec umowy: {building.expiringDate}</p>
        <p>data płatności: do {building.dayOfPayment} każdego miesiąca</p>
        <p>czynsz: {building.rent} zł + koszty eksploatacyjne: {building.service} zł</p>
        <button>Najemcy</button>
        <button>Płatności</button>
        <button>Alerty</button>
        <button>Do zrobienia</button>
    </div>
);

export default BuildingCard;