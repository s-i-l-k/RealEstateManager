import React from 'react';
import {NavLink} from 'react-router-dom';

class Boxes extends React.Component {

    render() {
            return (
                <div className='container'>
                    {title.map((e,i) => {
                        return (
                            <NavLink key={i} to={e.url || ""}>
                                <div className={['box', `image${i+1}`].join(" ")}>
                                    <h2>{e.name}</h2>
                                </div>
                            </NavLink>
                        )
                    })
                    }
                </div>
            )
    }
};

const title = [{
    name: 'Nieruchomości',
    url: '/estates'
}, {
    name: 'Najemcy',
    url: '/tenants'
}, {
    name: 'Wykonawcy',
    url: '/vendors'
}, {
    name: 'Płatności',
    url: '/payments'
}, {
    name: 'Alerty',
    url: '/alerts'
}, {
    name: 'Do zrobienia',
    url: '/todo'
}];


export default Boxes;