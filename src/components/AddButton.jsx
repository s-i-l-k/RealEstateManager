import React from 'react';

const AddButton = (props) => (
    <div className='container'>
        <button className='addButton' onClick={props.onClick}></button>
    </div>
);

export default AddButton;