
import React from 'react';
import Header from './Header.jsx';
import Header2 from './Header2.jsx';
import {NavLink} from 'react-router-dom';

class Boxes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showMenu = () => {
        this.setState({
            visible: true
        })

    }

    hideMenu = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        if (this.state.visible === false) {
            return (
                <div className='container'>
                    <Header onClick={this.showMenu}/>
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
        } else {
            return (
                <div className='container'>
                    <Header2 onClick={this.hideMenu}/>
                    {title.map((e,i) => {
                        return (
                            <NavLink key={i} to={e.url || ""}>
                                <div className={['slideMenu', 'dark'].join(" ")}>
                                    <h2>{e.name}</h2>
                                </div>
                            </NavLink>
                        )
                    })
                    }
                </div>
            )
        }
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
