import React, { Component } from 'react';

import HomeHeader from '../components/UI/Home_Header';

class Student_Register extends Component{
    render() {
        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Register</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        <label>Surname <span className="text-danger">*</span> </label>
                        <input type="text" name="surname" onChange={this.handleChange} required/>

                        <label>First name <span className="text-danger">*</span> </label>
                        <input type="date" name="firstName" onChange={this.handleChange} required/>

                        <label>Date of Birth <span className="text-danger">*</span> </label>
                        <input type="number" name="dob"  onChange={this.handleChange} required/>

                        <label>Department <span className="text-danger">*</span> </label>
                        <input type="text" name="dept" onChange={this.handleChange} required/>

                        <label>Email <span className="text-danger">*</span> </label>
                        <input type="email" name="email" onChange={this.handleChange} required/>

                        <label>Phone Number <span className="text-danger">*</span> </label>
                        <input type="text" name="phoneNo" onChange={this.handleChange} required/>

                        <label>Expected Year of Graduation <span className="text-danger">*</span> </label>
                        <input type="submit" value="submit" />
                    </form>

                </div>
            </section>
        );
    }
}

export default Student_Register;