import React, { Component } from 'react';
import formValidator from '../../hoc/formValidator';

import HomeHeader from '../../components/UI/Home_Header';
import Input from '../../components/UI/Input';
import {configureDropdown, email, passwordConfirm, password, plainTextInput} from "../../util/formConfig";

class School_Admin_Register extends Component{

    constructor(props){
        super(props);

        window.scrollTo(0, 0);
    }

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
                    validationMessage={formElement.config.validation.message}
                />
            );
        });

        // check for register message
        let tempClass = this.props.responseMsg !== '' ? 'register registerMsg' : 'register';
        
        return (
            <section>
                <HomeHeader/>
                {this.props.responseMsg}
                <div className={tempClass} id="school_admin_register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>School Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger"> <b>*</b> </span> field is required</p>
                    <form onSubmit={this.props.submitForm}>
                        {finalFormElements}
                        <input type="submit" value="submit" disabled={!this.props.formIsValid}/>
                    </form>

                </div>
            </section>
        );
    }
}

const currentYear = new Date().getFullYear();
let theValues = [
    { value: '', displayValue: 'Select a Year' }
];
let serviceOptions = [
    { value: '', displayValue: 'Select a Service' },
    { value: 'first', displayValue: 'First Service' },
    { value: 'second', displayValue: 'Second Service' },
    { value: 'fourth', displayValue: 'Fourth Service' }
];

let leaderOptions = [
    { value: '', displayValue: 'Select an option' },
    { value: true, displayValue: 'Yes' },
    { value: false, displayValue: 'No' }
];

for(let i = 0; i <= 4; i++){
    theValues.push({ value: currentYear + i, displayValue: currentYear + i });
}

let theFormState = {
    surname: plainTextInput('Surname', 'text'),
    firstName: plainTextInput('First Name', 'text'),
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    leader: configureDropdown('Transport Unit Leader', leaderOptions),
    service: configureDropdown('Service', serviceOptions),
    gradYear: configureDropdown('Expected Year of Graduation', theValues)
};


export default formValidator(School_Admin_Register, theFormState, 'admin', 'school');