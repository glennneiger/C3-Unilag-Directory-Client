import React, { Component } from 'react';
import { Link, Switch, Route, NavLink } from 'react-router-dom';

import Sidebar from "../../../components/UI/Sidebar";
import DashboardIndex from "./Dashboard_Index";
import axios from "../../../axios-instance";
import View_Bus_Statistics from "./View_Bus_Statistics";
import Logout from './Logout';

import ErrorBoundary from '../../../util/ErrorBoundary';
import Delete_Account from "./Delete_Account";
import MenuButton from "../../../components/UI/MenuButton";
import Backdrop from "../../../components/UI/Backdrop";

class Church_Dashboard extends Component{
    constructor(props){
        super(props);

        let theToken = window.localStorage.getItem('token');
        let user = JSON.parse( window.localStorage.getItem('user') );
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        //initialize state
        this.state = {
            mounted: !(currentTime > expireTime),
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
        let user = JSON.parse( window.localStorage.getItem('user') );
        let expireTime = user !== null ? user.tokenExpire : 0 , currentTime = new Date().getTime();

        if (currentTime > expireTime){
            this.props.history.replace('/login');
        }

        console.log('church dashboard component did update');
    }

    componentWillUnmount(){
        console.log('church parent will unmount')
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
        sidebarMap.set('View Bus Statistics', this.setSidebarObject('active', 'fa fa-line-chart'));
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
        console.log('backdrop removed');
        this.setState({ open: false });
    };
    

    componentDidMount(){
        console.log('parent component did mount');

    }

    componentWillUnmount(){
        console.log('parent component unmounted', this.state.mounted);
    }


    render(){
        const sidebarLinks = this.configureSidebar();
        let mobileSidebarClass = this.state.open ? 'sidebar-responsive show' : 'sidebar-responsive';

        console.log('render in parent', this.state.mounted);

        return (
            <section className="dashboard">
                <div className="sidebar-normal">
                    <Sidebar navlinks={sidebarLinks} responsive={false}/>
                </div>

                <div className={mobileSidebarClass}>
                    <Sidebar navlinks={sidebarLinks} responsive={true} removeSidebar={this.removeBackdrop}/>
                </div>

                <Backdrop removeBackdrop={this.removeBackdrop} open={this.state.open}/>

                <div className="dashboard_body fa-line">
                    <div>
                        <header>
                            <div className="toggle-button">
                                <MenuButton toggleSidebar={this.toggleSidebar}/>
                            </div>
                            <h1>C3 Unilag <span className="dash_header">Directory</span></h1>

                        </header>

                        <ErrorBoundary>
                            <Switch>
                                <Route path="/church_admin/dashboard/view-bus-statistics" render={() => <View_Bus_Statistics parentMounted={this.state.mounted}/>}/>
                                <Route path="/church_admin/dashboard/delete-account" component={Delete_Account}/>
                                <Route path="/church_admin/dashboard/logout" component={Logout}/>
                                <Route path="/church_admin/dashboard" render={(props) => <DashboardIndex {...props} parentMounted={this.state.mounted}/>} exact/>
                            </Switch>
                        </ErrorBoundary>

                    </div>

                </div>
            </section>
        );
    }
}

export default  Church_Dashboard ;