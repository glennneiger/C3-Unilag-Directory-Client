import React, { Component } from 'react';
import axios from '../axios-instance';
import SuccessLabel from "../components/UI/SuccessLabel";
import ErrorLabel from "../components/UI/ErrorLabel";

const formValidator = (WrappedComponent, appState, adminStatus, adminType) => {
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
                // eg 08012345678
                let regex = /^\d{11}$/;
                isValid = regex.test(value) && isValid;
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
            let formValues = {};

            for (let formKeys in this.state.registerForm){
                formValues[formKeys] = this.state.registerForm[formKeys].value;
            }

            console.log('form validator values', formValues);

            console.log('the path', this.props);
            // submit the form
            let thePath = this.props.match.url === '/' ? this.props.match.url + 'register_student' : this.props.match.url;

            // axios post request
            axios.post(thePath, formValues)
                .then(result => {
                    window.scroll(0,0);
                    let registerFormClone = { ...this.state.registerForm };
                    let registerFormCloneKeys = [];

                    // immutably copy each key
                    for (let key in registerFormClone){
                        let tempObject =  { ...registerFormClone[key] } ;
                        registerFormCloneKeys.push(tempObject);

                        // console.log('the temp object', tempObject);
                    }

                    // display appropriate label based on registered status
                    let theMsg = result.data.registered ? <SuccessLabel message={result.data.message} /> : <ErrorLabel message={result.data.message}/>;
                    let theIndex = 0;

                    // redirect if registration is successful
                    if (result.data.registered){

                        // edit the cloned form fields
                        registerFormCloneKeys.forEach(theObject => {
                            theObject.value = '';
                            theObject.valid = false;

                            // if wasTouched property exists, reset to false
                            if(theObject.wasTouched){
                                theObject.wasTouched = false;
                            }
                        });

                        // set the edited values into the cloned registerForm
                        for(let key in registerFormClone){
                            registerFormClone[key] = registerFormCloneKeys[theIndex];
                            theIndex += 1;
                        }

                        // set state immutably
                        this.setState({ responseMsg: theMsg, registerForm: registerFormClone, formIsValid: false });

                        // redirection options
                        if (adminStatus === 'admin'){
                            // store token and user details in the local storage
                            window.localStorage.setItem('token', result.data.token);
                            window.localStorage.setItem('user', JSON.stringify(result.data.user) );
                            
                            switch(adminType){
                                case 'school':
                                    this.props.history.replace('/school_admin/dashboard');
                                    break;
                                case 'church':
                                    this.props.history.replace('/church_admin/dashboard');
                                    break;
                                default:
                                    this.props.history.replace(this.props.match.url);
                                    break;
                            }
                        }
                        else{
                            this.props.history.replace(this.props.match.url);
                        }
                    } // end registered if statement
                    else{
                        console.log('reg form clone', registerFormClone);
                        this.setState({ responseMsg: theMsg });
                    }

                })
                .catch(error => {
                    console.log(error.message);
                });

        };  // end submit form


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

formValidator.displayName = 'formValidator';

export default formValidator;