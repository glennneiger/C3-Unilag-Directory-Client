import React, { Component } from 'react';

const formValidator = (WrappedComponent, appState) => {
    return class extends Component{
        currentYear = new Date().getFullYear();
        yearArray = [];

        state = {
            registerForm: {...appState},
            formIsValid: false
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

            // console.log('form element', );


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

                console.log(updatedFormElement);
            }
        };

        render() {
            var theForm = this.state.registerForm;
            console.log("the state", this.state.registerForm);
            return (
                <WrappedComponent
                registerForm={theForm}
                inputChangedHandler={this.inputChangedHandler}
                onBlurHandler={this.onBlurHandler}
                formIsValid={this.state.formIsValid}
                />
                
            );
        }
    }
};

export default formValidator;