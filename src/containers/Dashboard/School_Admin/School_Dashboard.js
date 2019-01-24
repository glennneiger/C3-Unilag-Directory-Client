import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";
import axios from "../../../axios-instance";
import Add_Bus_Statistics from "./Add_Bus_Stats";
import errorHandler from '../../../hoc/errorHandler';

class School_Dashboard extends Component{
    state = {
        mounted: true
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

    setSidebarObject = (theActiveClass, theIconClass) => {
        return {
            activeClass: theActiveClass,
            iconClass: theIconClass
        };
    };

    configureSidebar = () => {
        const sidebarMap = new Map();

        // configure elements
        sidebarMap.set('Dashboard', this.setSidebarObject('active', 'glyphicon glyphicon-dashboard'));
        sidebarMap.set('Bus Statistics', this.setSidebarObject('active', 'glyphicon glyphicon-stats'));
        sidebarMap.set('View Students', this.setSidebarObject('active', 'glyphicon glyphicon-user'));
        sidebarMap.set('Logout', this.setSidebarObject('active', 'glyphicon glyphicon-log-out'));

        return sidebarMap;
    };

     async componentWillMount(){
        let theToken = window.localStorage.getItem('token');
        console.log('the token', theToken, window.localStorage.getItem('user'));

        let user = JSON.parse( window.localStorage.getItem('user') );
        let expireTime = user.tokenExpire, currentTime = new Date().getTime();

         // check for token time validity
         if (currentTime > expireTime){
            // token has expired, therefore redirect to login page
            await this.setState({ mounted: false });
            console.log('mounted state', this.state.mounted);
            this.props.history.replace('/login');
            // return;
        }

        else{

            console.log('parent component will mount');

            if (theToken !== null){
                // set token in header
                this.setTokenInHeader(theToken);
                console.log('heyyy');

            }
            else{
                // redirect to login page
                this.props.history.replace('/login');
            }

        } // end main else statements
    } // end componentWillMount


    componentDidMount(){
        console.log('parent component did mount');

    }

    componentWillUnmount(){
        console.log('parent component unmounted', this.state.mounted);
    }


  render(){
      const sidebarLinks = this.configureSidebar();
      console.log('render in parent', this.state.mounted);
      
      return (
          <section className="dashboard">
              <Sidebar navlinks={sidebarLinks}/>

              <div className="dashboard_body">
                  <div>
                      <header>
                          <h1>C3 Unilag <span className="dash_header">Directory</span></h1>
                          <p>Welcome,  Mekusa
                              {/*<span>*/}
                                         {/*{" " + this.props.student.biodata.surname} {this.props.student.biodata.firstname}*/}
                                    {/*</span>*/}
                          </p>
                      </header>

                      <Switch>
                          <Route path="/school_admin/dashboard/bus-statistics" component={Add_Bus_Statistics}/>
                          <Route path="/school_admin/dashboard" render={() => <DashboardIndex parentMounted={this.state.mounted}/>} exact/>

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

export default connect(mapStateToProps)( School_Dashboard );