import React, { Component } from 'react';
// import $ from 'jquery';

import HomeHeader from '../../components/UI/Home_Header';

class Church_Admin_Register extends Component{
    // componentDidMount(){
    //     window.$("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    // }

    handleChange = (event) => {
        console.log(event.target.value);
    };


    render() {
        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Church Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        <label className="control-label">Surname <span className="text-danger">*</span> </label>
                        <input type="text" name="surname" onChange={this.handleChange} required/>
                        
                        <div className="form-group">
                            <label>First name <span className="text-danger">*</span> </label>
                            <input className="form-control" type="text" name="firstName" onChange={this.handleChange} required/>
                        </div>


                        <label>Email <span className="text-danger">*</span> </label>
                        <input type="email" name="email" onChange={this.handleChange} required/>

                        <label>Password <span className="text-danger">*</span> </label>
                        <input type="password" name="password" onChange={this.handleChange} required/>

                        <label>Confirm Password <span className="text-danger">*</span> </label>
                        <input type="password" name="password-confirm" onChange={this.handleChange} required/>
                        


                        <input type="submit" value="submit" />
                    </form>

                </div>
            </section>
        );
    }
}

export default Church_Admin_Register;