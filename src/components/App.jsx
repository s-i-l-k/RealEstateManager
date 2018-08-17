import React from 'react';
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import Boxes from './Boxes.jsx';

class App extends React.Component {
    render() {
        return (
            <div className='fix'>
                <Boxes>
                </Boxes>
            </div>
        )
    }
}

export default App;
