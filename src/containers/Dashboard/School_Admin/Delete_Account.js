import React, { Component } from 'react';

import axios from '../../../axios-instance';

class Delete_Account extends Component {
    constructor(props){
        super(props);

        let user = JSON.parse(window.localStorage.getItem('user'));

        // initialize state
        this.state = {
            user: user
        }
    }

    deleteHandler = () => {
       axios.delete(`/delete_admin?admin=school&adminEmail=${this.state.user.email}`)
           .then(result => {
               window.localStorage.removeItem('token');
               window.localStorage.removeItem('user');

               // redirect back to login page
               this.props.history.replace('/login');
           })
           .catch(error => {
               console.log(error);
           });
    };

    cancelDeleteHandler = () => {
        this.props.history.replace('/school_admin/dashboard');
    };


    render(){
        return (
            <section className="dashindex" style={{ width: '50%' }}>
                <div className="container">
                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box">
                                <div className="big-box-header form-header">
                                    <h3>Delete Account</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <div className="logout">
                                        <p>Are you sure you want to delete this account?</p>
                                        <div>
                                            <button onClick={this.deleteHandler}>Yes</button>
                                            <button onClick={this.cancelDeleteHandler}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> {/* End row */}
                </div>
            </section>


        );
    }



}

export default Delete_Account;