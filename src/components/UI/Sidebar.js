import React from 'react';
import { withRouter, NavLink } from 'react-router-dom'

const sidebar= (props) => {
    var theUrl = props.match.url;

    return (
        <aside className="sidebar">
            <header>
                <h2>Navigation</h2>
            </header>
            <ul>
                <NavLink to={theUrl} exact activeClassName="active">
                    <span><i className="glyphicon glyphicon-dashboard"></i></span>
                    Dashboard
                </NavLink>
                <NavLink to={theUrl + "/bus-statistics"} activeClassName="active">
                    <span><i className="glyphicon glyphicon-stats"></i></span>
                    Bus Statistics
                </NavLink>
                <NavLink to={theUrl + "/view-students" } activeClassName="active">
                    <span><i className="glyphicon glyphicon-user"></i></span>
                    View Students
                </NavLink>

                <NavLink to={theUrl + "/logout"} activeClassName="active">
                    <span><i className="glyphicon glyphicon-log-out"></i></span>
                    Logout
                </NavLink>

            </ul>
        </aside>
    );
};

export default withRouter(sidebar);