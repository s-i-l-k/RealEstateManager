import React from 'react';
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import Boxes from './Boxes.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Boxes title={title}>
                </Boxes>
            </div>
        )
    }
}

const title = ['Nieruchomości', 'Najemcy', 'Wykonawcy', 'Płatności', 'Alerty', 'Do zrobienia'];

export default App;
