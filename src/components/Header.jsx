import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    showHideMenu = () => {
        this.setState({
            visible: this.state.visible ? false : true
        })

    }

    render() {
        if(this.state.visible) {
            return (
                <div className='header'>
                    <div className='logo'></div>
                    <div className='menu' onClick={this.showHideMenu}></div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='header'>
                        <div className='logo'></div>
                        <div className='menu2' onClick={this.showHideMenu}></div>
                    </div>
                    {title.map((e,i) => {
                        return (
                            <NavLink key={i} to={e.url || ""} onClick={this.showHideMenu}>
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

export default Header;
