import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";

class School_Dashboard extends Component{
  render(){
      return (
          <section className="dashboard">
              <Sidebar/>

              <div className="dashboard_body">
                  <div>
                      <header>
                          <h1>C3 Unilag <span className="dash_header">Directory</span></h1>
                          <p>Welcome,  Mekusa
                              {/*<span>*/}
                                         {/*{" " + this.props.student.biodata.surname} {this.props.student.biodata.firstname}*/}
                                    {/*</span>*/}
                          </p>
                          {/*<p>Bachelor of Science in {this.state.student.credentials.course}</p>*/}
                      </header>

                      <Switch>
                          <Route path="/school_admin/dashboard" component={DashboardIndex} />
                      </Switch>

                  </div>

              </div>
          </section>
      );
  }
}

export default School_Dashboard;