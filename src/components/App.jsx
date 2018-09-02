import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from "./history";
import Boxes from './Boxes.jsx';
import Estates from './Estates.jsx';
import Tenants from './Tenants.jsx';
import NotFound from './NotFound.jsx';
import AddForm from "./AddForm.jsx";
import Payments from "./Payments.jsx";
import Header from "./Header.jsx";
import Vendors from "./Vendors.jsx";
import ToDo from "./ToDo.jsx";

class App extends React.Component {

    render() {
        return (
            <Router history={ history }>
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
                        <Route path='/todo' component={ToDo}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
