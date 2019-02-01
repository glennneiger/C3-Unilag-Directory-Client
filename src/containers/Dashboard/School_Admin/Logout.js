import React from 'react';
import { withRouter } from 'react-router-dom';
import {Line} from "react-chartjs-2";

const logout = (props) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');

        props.history.replace('/login');
    };

    const cancelLogoutHandler = () => {
        props.history.replace('/school_admin/dashboard');
    };


    return (
        <section className="dashindex" style={{ width: '50%' }}>
            <div className="container">
                {/*Start row*/}
                <div className="row">
                    <div className="col-12">
                        <div className="big-box">
                            <div className="big-box-header form-header">
                                <h3>Logout</h3>
                            </div>
                            <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                <div className="logout">
                                    <p>Are you sure you want to logout?</p>
                                    <div>
                                        <button onClick={logoutHandler}>Yes</button>
                                        <button onClick={cancelLogoutHandler}>No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> {/* End row */}
            </div>
        </section>


    );
};

export default withRouter(logout);