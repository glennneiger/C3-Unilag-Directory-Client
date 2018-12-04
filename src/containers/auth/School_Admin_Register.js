import React, { Component } from 'react';

import HomeHeader from '../../components/UI/Home_Header';
import Input from '../../components/UI/Input';

class School_Admin_Register extends Component{
    currentYear = new Date().getFullYear();
    yearArray = [];

    state = {
        registerForm: {
           surname: {
               elementType: 'input',
               elementConfig: {
                   type: 'text'
               },
               validation: {
                   required: true,
               },
               valid: false,
               wasTouched: false,
               value: '',
               label: 'Surname'
           },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                validation: {
                  required: true,
                },
                valid: false,
                wasTouched: false,
                value: '',
                label: 'First Name'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                wasTouched: false,
                value: '',
                label: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false,
                wasTouched: false,
                label: 'Password'
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6,
                    passwordMatcher: true
                },
                valid: false,
                wasTouched: false,
                label: 'Confirm Password'
            },
            service: {
               elementType: 'select',
                elementConfig: {
                   optionValues: [
                       { value: '', displayValue: 'Select a Service'},
                       { value: 'first', displayValue: 'First Service'},
                       { value: 'second', displayValue: 'Second Service'},
                       { value: 'fourth', displayValue: 'Fourth Service'}
                   ]
                },
                label: 'Service',
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            gradYear: {
                elementType: 'select',
                elementConfig: {
                    optionValues: [
                        { value: '', displayValue: 'Select a Year' }
                    ]
                },
                label: 'Expected Year of Graduation',
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            }

        }, // end register form
        formIsValid: false
    };


    //  make a shallow copy of registerForm in state
    registerClone = {...this.state.registerForm};
    gradYearClone = {...this.registerClone['gradYear']};
    elementConfigClone = { ...this.gradYearClone.elementConfig };
    optionsClone = [...this.elementConfigClone.optionValues];

    setYearArray = () => {
        for(var i = 0; i <= 4; i++){
            this.yearArray.push(this.currentYear + i);
        }

        var theMainArray = this.yearArray.map(element => {
            return { value: element, displayValue: element }
        });

        theMainArray.forEach(item => {
            this.optionsClone.push(item);
        });

        //fit back the clone pieces together
        this.elementConfigClone['optionValues'] = this.optionsClone;
        this.gradYearClone.elementConfig = this.elementConfigClone;
        this.registerClone.gradYear = this.gradYearClone;

        // update the state
         this.setState({ registerForm: this.registerClone });

    };

    componentDidMount(){
        this.setYearArray();
    }

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



    submitForm = (event) => {
        event.preventDefault();
        var formValues ={};

        for (let formKeys in this.state.registerForm){
            formValues[formKeys] = this.state.registerForm[formKeys].value;
        }
        console.log(formValues);
    };


    render() {
        let formElementsArray = [];
        // create form elements array from state
        for(let key in this.state.registerForm){
           formElementsArray.push({
               id: key,
               config: this.state.registerForm[key]
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    isValid={formElement.config.valid}
                    wasTouched={formElement.config.wasTouched}
                    handleBlur={() => this.onBlurHandler(formElement.id)}
                />
            );
        });
        
        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>School Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger"> <b>*</b> </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        {finalFormElements}
                        <input type="submit" value="submit" disabled={!this.state.formIsValid}/>
                    </form>

                </div>
            </section>
        );
    }
}

export default School_Admin_Register;