import React from 'react';

const logout = (props) => {
    document.body.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');

        props.history.replace('/login');
    };

    const cancelLogoutHandler = () => {
        props.history.replace('/church_admin/dashboard');
    };


    return (
        <section className="dashindex">
            <div className="container">
                {/*Start row*/}
                <div className="row">
                    <div className="col-12">
                        <div className="big-box" id="church_logout">
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

export default logout;