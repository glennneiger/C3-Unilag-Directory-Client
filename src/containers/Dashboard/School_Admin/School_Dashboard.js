import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";
import axios from "../../../axios-instance";

class School_Dashboard extends Component{
    state = {
            
    };

    setTokenInHeader (token) {

        if (token) {
            axios.defaults.headers.common['authorization'] = token;
            // console.log('the token', axios.defaults.headers.common['authorization']);
        } else {
            axios.defaults.headers.common['authorization'] = null;
            console.log('the token', token);
            /*if setting null does not remove `Authorization` header then try
              delete axios.defaults.headers.common['Authorization'];
            */
        }
    };

    componentWillMount(){
        let theToken = window.localStorage.getItem('token');
        console.log('the token', theToken, window.localStorage.getItem('user'));

        if (theToken !== null){
            // set token in header
            this.setTokenInHeader(theToken);
            console.log('heyyy');

        }
        else{
            // redirect to login page
            this.props.history.replace('/login');
        }
    }


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

const mapStateToProps = state => {
    return {
        user: state.school.school_admin
    }
};

export default connect(mapStateToProps)(School_Dashboard);