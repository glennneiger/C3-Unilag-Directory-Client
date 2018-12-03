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
               value: '',
               label: 'Surname'
           },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                label: 'First Name'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email'
                },
                value: '',
                label: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                label: 'Password'
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                label: 'Confirm Password'
            },
            service: {
               elementType: 'select',
                elementConfig: {
                   defaultValue: '',
                   optionValues: [
                       { value: '', displayValue: 'Select a Service'},
                       { value: 'first', displayValue: 'First Service'},
                       { value: 'second', displayValue: 'Second Service'},
                       { value: 'fourth', displayValue: 'Fourth Service'}
                   ]
                },
                label: 'Service',
                value: ''
            },
            gradYear: {
                elementType: 'select',
                elementConfig: {
                    defaultValue: '',
                    optionValues: [
                        { value: '', displayValue: 'Select a Year' }
                    ]
                },
                label: 'Expected Year of Graduation',
                value: ''
            }

        }
    };


    //  make a shallow copy of registerForm in state
    registerClone = {...this.state.registerForm};
    gradYearClone = {...this.registerClone['gradYear']};
    elementConfigClone = { ...this.gradYearClone.elementConfig };
    optionsClone = [...this.elementConfigClone['optionValues']];

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


    inputChangedHandler = (event, inputIdentifier) => {
        const registerFormClone = { ...this.state.registerForm };
        const registerFormKey_Value = { ...registerFormClone[inputIdentifier] };

        registerFormKey_Value.value = event.target.value;
        registerFormClone[inputIdentifier] = registerFormKey_Value;

        //set the state on change
        this.setState({ registerForm: registerFormClone });


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
                        <input type="submit" value="submit" />
                    </form>

                </div>
            </section>
        );
    }
}

export default School_Admin_Register;