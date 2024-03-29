import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";
import Add_Bus_Statistics from "./Add_Bus_Stats";
import Assign_leader from './Assign_Leader';
import Student_Search from './Student_Search';
import Logout from './Logout';
import Delete_Account from './Delete_Account';

import axios from "../../../axios-instance";
import ErrorBoundary from '../../../util/ErrorBoundary';
import MenuButton from '../../../components/UI/MenuButton';
import Backdrop from '../../../components/UI/Backdrop';

class School_Dashboard extends Component{
    constructor(props){
        super(props);
        // scroll to the top of screen
        document.body.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        let theToken = window.localStorage.getItem('token');
        let user = JSON.parse( window.localStorage.getItem('user') );
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        //initialize state
        this.state = {
            mounted: !(currentTime > expireTime),
            user: user,
            open: false
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


    componentDidUpdate(){
        let user = this.state.user;
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        if (currentTime > expireTime){
            this.props.history.replace('/login');
        }

    }

    setTokenInHeader (token) {

        if (token) {
            axios.defaults.headers.common['authorization'] = token;
            // console.log('the token', axios.defaults.headers.common['authorization']);
        } else {
            axios.defaults.headers.common['authorization'] = null;
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
        sidebarMap.set('Student Search', this.setSidebarObject('active', 'glyphicon glyphicon-search'));

        // if user is a leader and user exists, assign an additional link
        if ( (this.state.user !== null) && this.state.user.leader ){
            sidebarMap.set('Assign Leader', this.setSidebarObject('active', 'fa fa-key'));
        }

        sidebarMap.set('Logout', this.setSidebarObject('active', 'glyphicon glyphicon-log-out'));
        sidebarMap.set('Delete Account', this.setSidebarObject('active', 'glyphicon glyphicon-trash'));


        return sidebarMap;
    };

    toggleSidebar = () => {
        this.setState(prevState => {
            return { open: !(prevState.open) }
        })
    };

    removeBackdrop = () => {
        this.setState({ open: false });
    };



  render(){
      const sidebarLinks = this.configureSidebar();
      let mobileSidebarClass = this.state.open ? 'sidebar-responsive show' : 'sidebar-responsive';

      return (
          <section className="dashboard">
              <div className="sidebar-normal">
                  <Sidebar navlinks={sidebarLinks} responsive={false}/>
              </div>

              <div className={mobileSidebarClass}>
                  <Sidebar navlinks={sidebarLinks} responsive={true} removeSidebar={this.removeBackdrop}/>
              </div>

              <Backdrop removeBackdrop={this.removeBackdrop} open={this.state.open}/>

              <div className="dashboard_body">
                  <div>
                      <header>
                          <div className="toggle-button">
                              <MenuButton toggleSidebar={this.toggleSidebar}/>
                          </div>
                          <h1>C3 Unilag <span className="dash_header">Directory</span></h1>
                      </header>

                      <ErrorBoundary>
                          <Switch>
                              <Route path="/school_admin/dashboard/add-bus-statistics" component={Add_Bus_Statistics}/>
                              <Route path="/school_admin/dashboard/delete-account" component={Delete_Account}/>
                              <Route path="/school_admin/dashboard/assign-leader" render={ (props) => <Assign_leader {...props} parentMounted={this.state.mounted}/>} />
                              <Route path="/school_admin/dashboard/student-search" component={Student_Search} />
                              <Route path="/school_admin/dashboard/logout" component={Logout} />
                              <Route path="/school_admin/dashboard" render={(props) => <DashboardIndex {...props} parentMounted={this.state.mounted} />} exact/>
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

export default connect(mapStateToProps)( School_Dashboard );