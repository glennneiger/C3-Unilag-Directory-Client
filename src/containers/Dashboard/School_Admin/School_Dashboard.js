import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";
import Add_Bus_Statistics from "./Add_Bus_Stats";
import Assign_leader from './Assign_Leader';
import Logout from './Logout';

import axios from "../../../axios-instance";
import errorHandler from '../../../hoc/errorHandler';
import ErrorBoundary from '../../../util/ErrorBoundary';

class School_Dashboard extends Component{
    constructor(props){
        super(props);

        let theToken = window.localStorage.getItem('token');
        let user = JSON.parse( window.localStorage.getItem('user') );
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        //initialize state
        this.state = {
            mounted: !(currentTime > expireTime),
            user: user
        };

        // check for token time validity
        if ( currentTime > expireTime){

            // window.localStorage.removeItem('token');
            // window.localStorage.removeItem('user');
            this.props.history.replace('/login');
            
        }

        else{

            if (theToken !== null){
                // set token in header
                this.setTokenInHeader(theToken);

            }
            else{
                // redirect to login page
                this.props.history.replace('/login');
            }

        } // end main else statements


    }

    // componentWillUpdate() {
    //     console.log('parent component will update');
    // }

    componentDidUpdate(){
        let user = this.state.user;
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        if (currentTime > expireTime){
            this.props.history.replace('/login');
        }

        console.log('parent component did update');
    }

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
        sidebarMap.set('Add Bus Statistics', this.setSidebarObject('active', 'glyphicon glyphicon-stats'));
        sidebarMap.set('View Students', this.setSidebarObject('active', 'glyphicon glyphicon-user'));

        // if user is a leader and user exists, assign an additional link
        if ( (this.state.user !== null) && this.state.user.leader ){
            sidebarMap.set('Assign Leader', this.setSidebarObject('active', 'fa fa-key'));
        }

        sidebarMap.set('Logout', this.setSidebarObject('active', 'glyphicon glyphicon-log-out'));
        sidebarMap.set('Delete Account', this.setSidebarObject('active', 'glyphicon glyphicon-trash'));


        return sidebarMap;
    };


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
                          <p>Welcome, Olorondu Chukwuemeka
                              {/*<span>*/}
                              {/*{" " + this.props.student.biodata.surname} {this.props.student.biodata.firstname}*/}
                              {/*</span>*/}
                          </p>
                      </header>

                      <ErrorBoundary>
                          <Switch>
                              <Route path="/school_admin/dashboard/add-bus-statistics" component={Add_Bus_Statistics}/>
                              <Route path="/school_admin/dashboard/assign-leader" render={ () => <Assign_leader parentMounted={this.state.mounted}/>} />
                              <Route path="/school_admin/dashboard/logout" component={Logout} />
                              <Route path="/school_admin/dashboard" render={() => <DashboardIndex parentMounted={this.state.mounted} />} exact/>
                          </Switch>
                      </ErrorBoundary>

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

export default connect(mapStateToProps)( errorHandler(School_Dashboard) );