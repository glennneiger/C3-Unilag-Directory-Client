import React, { Component, Suspense, lazy, StrictMode } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { defaults } from 'react-chartjs-2';

import SchoolAdmin from './containers/Dashboard/School_Admin/School_Dashboard';
import Student_Register from "./containers/auth/Student_Register";
import AdminLogin from "./containers/auth/Admin_Login";
import School_Admin_Register from "./containers/auth/School_Admin_Register";
import Church_Admin_Register from "./containers/auth/Church_Admin_Register";
import Church_Admin_Dashboard from './containers/Dashboard/Church_Admin/Church_Dashboard';
import Spinner from './components/UI/Spinner';

// const Student_Register = lazy( () => import('./containers/auth/Student_Register') );


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <StrictMode>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route path="/school_admin/dashboard" component={SchoolAdmin}/>
                            <Route path="/school_admin/register" component={School_Admin_Register}/>
                            <Route path="/church_admin/dashboard" component={Church_Admin_Dashboard}/>
                            <Route path="/church_admin/register" component={Church_Admin_Register}/>
                            <Route path="/login" component={AdminLogin}/>
                            <Route path="/"  component={Student_Register}/>
                        </Switch>
                    </Suspense>
                </StrictMode>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
