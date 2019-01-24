import React, { Component } from 'react';

import axios from '../../../axios-instance';
import Spinner from "../../../components/UI/Spinner";
import SuccessLabel from '../../../components/UI/SuccessLabel';


class Add_Bus_Stats extends Component{
    state = {
       formData: {
          going: null,
          returning: null
       },
       loading: false,
       submitMessage: ''
    };


    submitForm = (event) => {
        event.preventDefault();
        // scroll to the top position
        window.scrollTo(0, 0);

        let theSpinner = <Spinner />;

        // get user details from local storage
        let theUser = JSON.parse(localStorage.getItem('user'));

        // set a spinner on submit to depict loading state
        this.setState({ loading: true, submitMessage: theSpinner });

        // submit the form
        axios.post(`/admin/bus_stats?service=${theUser.service}`, this.state.formData)
            .then(result => {
                let cloneFormData = { ...this.state.formData };
                let successMsg = <SuccessLabel message={result.data.message} />;

                cloneFormData.going = null;
                cloneFormData.returning = null;

                this.setState({ loading: false, submitMessage: successMsg, formData: cloneFormData });
            })
            .catch();
    };

    handleChange = (event) => {
        let formClone = {...this.state.formData};
        formClone[event.target.name] = event.target.value;

        // update the state immutably with the new login form
        this.setState({ formData: formClone });
    };

    render() {

        // check for register message
        let tempClass = this.state.submitMessage !== '' ? 'register registerMsg' : 'register';

        return (
            <section>

                {this.state.submitMessage}

                <div className={tempClass} >
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Add Bus Statistics</h1>
                    </div>

                    <form onSubmit={this.submitForm}>
                        <label>Going</label>
                        <input type="number" name="going" defaultValue={this.state.formData.going} onChange={this.handleChange} min={0} required/>

                        <label>Returning</label>
                        <input type="number" name="returning" defaultValue={this.state.formData.returning} onChange={this.handleChange} min={0} required/>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Add_Bus_Stats;