import React, { Component, Suspense, lazy, StrictMode } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { defaults } from 'react-chartjs-2';

import Spinner from './components/UI/Spinner';

const StudentRegister = lazy( () => import('./containers/auth/Student_Register') );
const SchoolAdminRegister = lazy( () => import('./containers/auth/School_Admin_Register') );
const SchoolAdminDashboard = lazy( () => import('./containers/Dashboard/School_Admin/School_Dashboard') );
const ChurchAdminRegister = lazy( () => import('./containers/auth/Church_Admin_Register') );
const ChurchAdminDashboard = lazy( () => import('./containers/Dashboard/Church_Admin/Church_Dashboard') );
const AdminLogin = lazy( () => import('./containers/auth/Admin_Login') );

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <StrictMode>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route path="/school_admin/dashboard" render={(props) => <SchoolAdminDashboard {...props}/>} />
                            <Route path="/school_admin/register" render={(props) => <SchoolAdminRegister {...props}/>} />
                            <Route path="/church_admin/dashboard" render={(props) => <ChurchAdminDashboard {...props}/>} />
                            <Route path="/church_admin/register" render={(props) => <ChurchAdminRegister {...props}/>} />
                            <Route path="/login" render={(props) => <AdminLogin {...props}/>} />
                            <Route path="/"  render={(props) => <StudentRegister {...props}/>} />
                        </Switch>
                    </Suspense>
                </StrictMode>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
