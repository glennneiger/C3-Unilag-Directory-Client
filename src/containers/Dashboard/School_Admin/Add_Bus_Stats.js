import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-instance';
import Spinner from "../../../components/UI/Spinner";
import SuccessLabel from '../../../components/UI/SuccessLabel';
import * as actions from '../../../store/actions/index';
import DismissModal from "../../../components/UI/DismissModal";


class Add_Bus_Stats extends Component{
    constructor(props){
        super(props);
        const theUser = JSON.parse(localStorage.getItem('user'));
        const theService = theUser.leader ? '' : theUser.service;

        this.state = {
            formData: {
                going: '',
                returning: ''
            },
            service: theService,
            loading: false,
            submitMessage: '',
            hasError: false,
            errorMsg: null
        };
    }


    submitForm = (event) => {
        event.preventDefault();

        // scroll to the top position
        document.body.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        let theSpinner = <Spinner />;

        // get user details from local storage


        // set a spinner on submit to depict loading state
        this.setState({ loading: true, submitMessage: theSpinner, hasError: false, errorMsg: null });

        // submit the form
        axios.post(`/admin/bus_stats?service=${this.state.service}`, this.state.formData)
            .then(result => {
                let cloneFormData = { ...this.state.formData };
                let successMsg = <SuccessLabel message={result.data.message} />;

                cloneFormData.going = '';
                cloneFormData.returning = '';

                this.setState({ loading: false, submitMessage: successMsg, formData: cloneFormData, service: '' });

                // let redux store know that bus stats has changed
                this.props.busStatsChanged();
            })
            .catch(error => {
                this.setState({ hasError: true, errorMsg: error.message });
            });
    };

    handleChange = (event) => {
        let formClone = {...this.state.formData};
        formClone[event.target.name] = parseInt(event.target.value, 10);  // converts string input to integer

        // update the state immutably with the new login form
        this.setState({ formData: formClone });
    };

    handleDropdownChange = (event) => {
        this.setState({ service: event.target.value });
    };

    dismissModal = () => {
        this.setState({
            hasError: false,
            errorMsg: null
        });
    };

    render() {

        // check for register message
        let tempClass = this.state.submitMessage !== '' ? 'register registerMsg' : 'register';
        const user = JSON.parse(window.localStorage.getItem('user'));

        // render service dropdown depending on whether user is the transport unit leader
        let serviceToggle = user.leader ? (
            <Fragment>
                <label>Service</label>
                <select className="custom-select" value={this.state.service} onChange={this.handleDropdownChange} required>
                    <option value="" >Select a service</option>
                    <option value="first">First Service</option>
                    <option value="second">Second Service</option>
                    <option value="fourth">Fourth Service</option>
                </select>
            </Fragment>
        ) : null;

        return (
            <section >
                <DismissModal showModal={this.state.hasError} modalTitle="Error" modalMessage={this.state.errorMsg} dismissAction={this.dismissModal}/>

                {this.state.submitMessage}

                <div className={tempClass} id="add_bus_stats">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Add Bus Statistics</h1>
                    </div>

                    <form onSubmit={this.submitForm}>
                        {serviceToggle}

                        <label>Going</label>
                        <input type="number" name="going" value={this.state.formData.going} onChange={this.handleChange} min={0} required/>

                        <label>Returning</label>
                        <input type="number" name="returning" value={this.state.formData.returning} onChange={this.handleChange} min={0} required/>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </section>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        busStatsChanged: () => dispatch(actions.busStatsChanged())
    }
};

export default connect(null, mapDispatchToProps)(Add_Bus_Stats);