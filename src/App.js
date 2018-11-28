import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import SchoolAdmin from './containers/Dashboard/School_Admin/School_Dashboard';
import Student_Register from "./containers/Student_Register";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/school_admin/dashboard" component={SchoolAdmin}/>
                    <Route path="/" component={Student_Register}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
