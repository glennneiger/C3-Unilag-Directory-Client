import React, { Component } from 'react';
import { plainTextInput, email, password, passwordConfirm } from '../../util/formConfig';
import axios from '../../axios-instance';

import HomeHeader from '../../components/UI/Home_Header';
import Input from "../../components/UI/Input";
import formValidator from '../../hoc/formValidator';
import SuccessLabel from '../../components/UI/SuccessLabel';
import ErrorLabel from '../../components/UI/ErrorLabel';

class Church_Admin_Register extends Component{
    state = {
        responseMsg: ''
    };

    // handler for submitting form
    submitForm = (event) => {
        event.preventDefault();
        var formValues ={};

        for (let formKeys in this.props.registerForm){
            formValues[formKeys] = this.props.registerForm[formKeys].value;
        }
        // console.log('form values', formValues);

        // submit the form
        axios.post(this.props.match.url, formValues)
            .then(result => {
                window.scroll(0,0);
                console.log(result.message, this.props);

                // display appropriate label for registered status
                let theMsg = result.data.registered ? <SuccessLabel message={result.data.message} /> : <ErrorLabel message={result.data.message}/>;
                this.setState({ responseMsg: theMsg });

                // redirect if registration is successful
                if (result.data.registered){
                    this.props.history.replace(this.props.match.url);
                }

            })
            .catch(error => {
               console.log(error.message);
            });

    };

    render() {
        let formElementsArray = [];
        // create form elements array from state
        for(let key in this.props.registerForm){
            formElementsArray.push({
                id: key,
                config: this.props.registerForm[key]
            });
        }

        let finalFormElements = formElementsArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    theConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    input_type={formElement.config.elementType}
                    theValue={formElement.config.value}
                    changed={(event) => this.props.inputChangedHandler(event, formElement.id)}
                    isValid={formElement.config.valid}
                    wasTouched={formElement.config.wasTouched}
                    handleBlur={() => this.props.onBlurHandler(formElement.id)}
                />
            );
        });

        // check for register message
        let tempClass = this.state.responseMsg !== '' ? 'register registerMsg' : 'register';

        return (
            <section>
                <HomeHeader/>
                {this.state.responseMsg}
                <div className={tempClass}>
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Church Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        {finalFormElements}
                        <input type="submit" value="submit" disabled={!this.props.formIsValid} />
                    </form>

                </div>
            </section>
        );
    }
}



let theFormState = {
    surname: plainTextInput('Surname', 'text'),
    firstName: plainTextInput('First Name', 'text'),
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
};

export default formValidator(Church_Admin_Register, theFormState);