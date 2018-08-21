import React from "react";

const TenantCard = ({ tenant }) => (
    <div>
        <div>
            <h2>{ tenant.name}</h2>
            <p>PESEL: {tenant.pesel}</p>
            <p>Telefon: <a href={`tel:${tenant.phone} sms:${tenant.phone}`}>{tenant.phone}</a></p>
            <p>E-mail: <a href={`tel:${tenant.email}`}>{tenant.email}</a></p>
            <button>Nieruchomości</button>
            <button>Płatności</button>
            <button>Alerty</button>
            <button>Do zrobienia</button>
        </div>
    </div>
);

export default TenantCard;