import React, { Component } from 'react';
import axios from '../axios-instance';
import SuccessLabel from "../components/UI/SuccessLabel";
import ErrorLabel from "../components/UI/ErrorLabel";

const formValidator = (WrappedComponent, appState) => {
    return class extends Component{

        state = {
            registerForm: {...appState},
            formIsValid: false,
            responseMsg: ''
        };

        checkValidity (value, validationRule) {
            let isValid = true;

            if (validationRule.required)  {
                isValid =( value.trim() !== '') && (isValid );
            }

            if (validationRule.minLength){
                isValid = (value.length >= validationRule.minLength) && (isValid);
            }

            if (validationRule.maxLength){
                isValid = (value.length <= validationRule.maxLength) && (isValid);
            }

            if (validationRule.email){
                let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                isValid = regex.test(value) && isValid;

            }

            if(validationRule.passwordMatcher){
                isValid = (value === this.state.registerForm.password.value) && isValid;
            }

            if (validationRule.phoneNo){
                // write a Regular Expression that allows only 11 digit phone numbers
            }

            return isValid;

        }


        inputChangedHandler = (event, inputIdentifier) => {
            const registerFormClone = { ...this.state.registerForm };
            const updatedFormElement = { ...registerFormClone[inputIdentifier] };

            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
            updatedFormElement.wasTouched = true;
            registerFormClone[inputIdentifier] = updatedFormElement;

            //check overall validity of form
            let formValidChecker = true;
            for (let formElement in this.state.registerForm){
                formValidChecker = registerFormClone[formElement].valid && formValidChecker;
            }

            //set the state on change
            this.setState({ registerForm: registerFormClone, formIsValid: formValidChecker });


        };

        onBlurHandler =(elementID) => {
            if (elementID === 'password'){
                const registerFormClone = { ...this.state.registerForm };
                const updatedFormElement = { ...registerFormClone['passwordConfirm'] };
                const match = updatedFormElement.value === this.state.registerForm['password'].value;

                if (!match){
                    updatedFormElement.valid = false;
                    registerFormClone['passwordConfirm'] = updatedFormElement;

                    //check overall validity of form
                    let formValidChecker = true;
                    for (let formElement in this.state.registerForm){
                        formValidChecker = registerFormClone[formElement].valid && formValidChecker;
                    }

                    this.setState({ registerForm: registerFormClone, formIsValid: formValidChecker });
                }

            }
        };

        // handler for submitting form
        submitForm = (event) => {
            event.preventDefault();
            var formValues ={};


            for (let formKeys in this.state.registerForm){
                formValues[formKeys] = this.state.registerForm[formKeys].value;
            }


            // submit the form
            let thePath = this.props.match.url === '/' ? this.props.match.url + 'register_student' : this.props.match.url;
            console.log('the path', this.props.match.url);

            axios.post(thePath, formValues)
                .then(result => {
                    window.scroll(0,0);
                    const registerFormClone = { ...this.state.registerForm };

                    // reset the form fields after submission
                    for(let key in registerFormClone){
                        registerFormClone[key].value = '';
                        registerFormClone[key].valid = false;

                        // if wasTouched property exists, reset to false
                        if(registerFormClone[key].wasTouched){
                            registerFormClone[key].wasTouched = false;
                        }
                    }

                    // display appropriate label based on registered status
                    let theMsg = result.data.registered ? <SuccessLabel message={result.data.message} /> : <ErrorLabel message={result.data.message}/>;
                    this.setState({ responseMsg: theMsg, registerForm: registerFormClone, formIsValid: false });

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
            var theForm = this.state.registerForm;
            return (
                <WrappedComponent
                registerForm={theForm}
                inputChangedHandler={this.inputChangedHandler}
                onBlurHandler={this.onBlurHandler}
                formIsValid={this.state.formIsValid}
                submitForm={this.submitForm}
                responseMsg={this.state.responseMsg}
                {...this.props}
                />
                
            );
        }
    }
};

export default formValidator;