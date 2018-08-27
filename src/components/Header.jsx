import React from 'react';

class Header extends React.Component {



    render() {
        return (
            <div className='header'>
                <div className='logo'></div>
                <div className='menu' onClick={this.props.onClick}></div>
            </div>
        )
    }
};

export default Header;
