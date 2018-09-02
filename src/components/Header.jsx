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
                <div>
                    <div className='header'>
                        <NavLink to={'/'} className='logo'></NavLink>
                        <div className='menu' onClick={this.showHideMenu}></div>
                    </div>
                    {this.props.children}
                </div>
            )
        } else {
            return (
                <div className='slideContainer'>
                    <div className='header'>
                        <NavLink to={'/'} className='logo'></NavLink>
                        <div className='menu2' onClick={this.showHideMenu}></div>
                    </div>
                    <div className='forFixed'>
                    {title.map((e,i) => {
                        return (
                            <NavLink key={i} to={e.url || ""} onClick={this.showHideMenu} className="plain">
                                <div className={['slideMenu', 'dark'].join(" ")}>
                                    <h2>{e.name}</h2>
                                </div>
                            </NavLink>
                        )
                    })
                    }
                    </div>
                    {this.props.children}
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
    name: 'Do zrobienia',
    url: '/todo'
}];

export default Header;
