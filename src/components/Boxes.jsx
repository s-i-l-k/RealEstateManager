import React from 'react';
import Header from './Header.jsx';

const Boxes = ({children}) => {
    return (
        <div className='container'>
            <Header/>
            <div className='box'>
                <h2>Nieruchomości</h2>
            </div>
            <div className='box'>
                <h2>Najemcy</h2>
            </div>
            <div className='box'>
                <h2>Wykonawcy</h2>
            </div>
            {children}
        </div>
    )
};

export default Boxes;
