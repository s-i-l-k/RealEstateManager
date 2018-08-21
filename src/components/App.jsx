import React from 'react';
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import Boxes from './Boxes.jsx';
import Estates from './Estates.jsx';
import Tenants from './Tenants.jsx';
import NotFound from './NotFound.jsx';
import AddForm from "./AddForm.jsx";
import Payments from "./Payments.jsx";

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Boxes} />
                    <Route path='/estates' component={Estates}/>
                    <Route path='/tenants' component={Tenants}/>
                    <Route path='/form/:type/:id' component={AddForm}/>
                    <Route path='/form/:type' component={AddForm}/>
                    <Route path='/payments' component={Payments}/>
                    <Route component={NotFound}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default App;
