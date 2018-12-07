import React, { Component } from 'react';
import { plainTextInput, email, password, passwordConfirm } from '../../util/formConfig';

// import $ from 'jquery';

import HomeHeader from '../../components/UI/Home_Header';
import Input from "../../components/UI/Input";
import formValidator from '../../hoc/formValidator';

class Church_Admin_Register extends Component{
    // componentDidMount(){
    //     window.$("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    // }



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

        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Church Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        {finalFormElements}
                        <input type="submit" value="submit" disabled={!this.props.formIsValid}/>
                    </form>

                </div>
            </section>
        );
    }
}

let theForm = {
    surname: plainTextInput('Surname'),
    firstName: plainTextInput('First Name'),
    email: email,
    password: password,
    passwordConfirm: passwordConfirm
};

export default formValidator(Church_Admin_Register, theForm);