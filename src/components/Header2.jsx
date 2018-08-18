import React from 'react';

class Header2 extends React.Component {

    render() {
        return (
            <div className='header'>
                <div className='logo'></div>
                <div className='menu2' onClick={this.props.onClick}></div>
            </div>
        )
    }
};

export default Header2;