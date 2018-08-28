import React from 'react';
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import Boxes from './Boxes.jsx';
import Estates from './Estates.jsx';
import Tenants from './Tenants.jsx';
import NotFound from './NotFound.jsx';
import AddForm from "./AddForm.jsx";
import Payments from "./Payments.jsx";
import Header from "./Header.jsx";
import Vendors from "./Vendors.jsx";
import Alerts from "./Alerts.jsx";
import ToDoList from "./ToDo.jsx";

class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Boxes} />
                        <Route path='/estates' component={Estates}/>
                        <Route path='/tenants' component={Tenants}/>
                        <Route path='/vendors' component={Vendors}/>
                        <Route path='/form/:type/:id' component={AddForm}/>
                        <Route path='/form/:type' component={AddForm}/>
                        <Route path='/payments' component={Payments}/>
                        <Route path='/alerts' component={Alerts}/>
                        <Route path='/todo' component={ToDoList}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;
