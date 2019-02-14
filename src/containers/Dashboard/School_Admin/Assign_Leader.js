import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import SuccessLabel from '../../../components/UI/SuccessLabel';
import * as actions from '../../../store/actions/index';
import DismissModal from "../../../components/UI/DismissModal";

class Assign_Leader extends Component{
    constructor(props){
        super(props);

        console.log('axios header', axios.defaults.headers.common.authorization);

        const user = JSON.parse(window.localStorage.getItem('user'));

        // initialize state
        this.state = {
            user: user,
            admins: this.props.schoolAdmins,
            loading: this.props.schoolAdminsLoading,
            selectedAdminEmail: '',
            disabled: true,
            responseMsg: '',
            hasError: false,
            errorMsg: null
        };

        // if the user is not the transport unit leader, redirect to school_admin dashboard
        if ( !(user.leader) ){
            this.props.history.replace('/school_admin/dashboard');
            return;
        }

        console.log('leader constructor');

    }

    componentDidMount(){
        if (this.props.parentMounted && this.props.schoolAdminsLoading){
            axios.get('/admin/school_admin')
                .then(result => {
                    console.log('assign_leader axios fetch');
                    const theSchoolAdmins = result.data.schoolAdmins;

                    if (theSchoolAdmins.length === 0){
                        this.setState({ loading: false });
                        return;
                    }

                    this.setState({ admins: theSchoolAdmins, loading: false });

                    // set schoolAdmins in the redux store
                    this.props.loadSchoolAdmins(theSchoolAdmins);
                })
                .catch(error => {
                    this.setState({ hasError: true, errorMsg: error.message, responseMsg: ''})
                });
        }
    }

    handleChange = (event) => {
        this.setState({ selectedAdminEmail: event.target.value, disabled: false });
    };

    submitForm = (event) => {
        event.preventDefault();
        const theAdminEmail = this.state.selectedAdminEmail;
        const spinner = <Spinner/>;

        this.setState({ responseMsg: spinner });

        axios.post('/admin/assign-leader', { selectedAdminEmail: theAdminEmail })
            .then(result => {
                const theSchoolAdmins = result.data.schoolAdmins;
                const message = <SuccessLabel message={result.data.message} leaderForm={true}/>;
                const disabledStatus = theSchoolAdmins.length === 0;
                
                this.setState({ admins: theSchoolAdmins, responseMsg: message, disabled: disabledStatus });

                // update schoolAdmins in redux store
                this.props.loadSchoolAdmins(theSchoolAdmins);
            })
            .catch(error => {
                this.setState({ hasError: true, errorMsg: error.message });
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
               <DismissModal showModal={this.state.hasError} modalTitle="Error" modalMessage={this.state.errorMsg}/>

               {this.state.responseMsg}
               {mainBody}
           </section>
        );
    }
}


const mapStateToProps = state => {
   return {
       schoolAdmins: state.school.schoolAdmins,
       schoolAdminsLoading: state.school.schoolAdminsLoading
   }
};

const mapDispatchToProps = dispatch => {
    return {
        loadSchoolAdmins: (theAdmins) => dispatch(actions.loadSchoolAdmins(theAdmins))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Assign_Leader);