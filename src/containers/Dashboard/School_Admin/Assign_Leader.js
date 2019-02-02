import React, { Component } from 'react';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import SuccessLabel from '../../../components/UI/SuccessLabel';

class Assign_Leader extends Component{
    constructor(props){
        super(props);

        const user = JSON.parse(window.localStorage.getItem('user'));

        // initialize state
        this.state = {
            user: user,
            admins: [],
            loading: true,
            selectedAdminEmail: '',
            disabled: true,
            responseMsg: ''
        };

        // if the user is not the transport unit leader, redirect to school_admin dashboard
        if ( !(user.leader) ){
            this.props.history.replace('/school_admin/dashboard');
            return;
        }

        console.log('leader constructor');

    }

    componentDidMount(){
        if (this.props.parentMounted){
            axios.get('/admin/school_admin')
                .then(result => {
                    const theSchoolAdmins = result.data.schoolAdmins;

                    if (theSchoolAdmins.length === 0){
                        this.setState({ loading: false });
                        return;
                    }
                    this.setState({ admins: theSchoolAdmins, loading: false });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleChange = (event) => {
        this.setState({ selectedAdminEmail: event.target.value, disabled: false });
    };

    submitForm = (event) => {
        event.preventDefault();
        const theAdminEmail = this.state.selectedAdminEmail;

        axios.post('/admin/assign-leader', { selectedAdminEmail: theAdminEmail })
            .then(result => {
                const theSchoolAdmins = result.data.schoolAdmins;
                const message = <SuccessLabel message={result.data.message} leaderForm={true}/>;
                const disabledStatus = theSchoolAdmins.length === 0;
                
                this.setState({ admins: theSchoolAdmins, responseMsg: message, disabled: disabledStatus });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        let mainBody = <Spinner />;

        if ( !(this.state.loading) ){
            //if admins are not found
            let dataBody = <p className="leader-subheading">No School Admin available</p>;

            // if admins are present
            if (this.state.admins.length > 0){
               dataBody = this.state.admins.map(admin => {
                   let fullName = `${admin.surname} ${admin.firstName}`;
                   return (
                       <div className="radio-options" key={admin.email}>
                           <input type="radio"  name="admin" value={admin.email} onClick={this.handleChange}/>
                           <label className="form-check-label">
                               {fullName}
                           </label>
                       </div>
                   );
               });
            }


            mainBody = (
                <div className="container">
                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box">
                                <div className="big-box-header form-header">
                                    <h3>Assign A Leader</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <p className="leader-subheading">Assign a Leadership Role to one of the following Admins:</p>
                                    <form className="leader-form" onSubmit={this.submitForm}>
                                        {dataBody}
                                        <button type="submit" className="leader-submit" disabled={this.state.disabled}>
                                            Submit
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div> {/* End row */}
                </div>
            );
        }

        return (
           <section className="dashindex">
               {this.state.responseMsg}
               {mainBody}
           </section>
        );
    }
}

export default Assign_Leader;