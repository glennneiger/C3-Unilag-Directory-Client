import React, { Component } from 'react';

import HomeHeader from '../../components/UI/Home_Header';

class School_Admin_Register extends Component{
    handleChange = (event) => {
        console.log(event.target.value);
    };


    render() {
        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>School Admin Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        <label>Surname <span className="text-danger">*</span> </label>
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

                        <div className="form-group">
                            <label>Service <span className="text-danger">*</span> </label>
                            <select className="custom-select" onChange={this.handleChange} defaultValue="">
                                <option value="first">First Service</option>
                                <option value="second">Second Service</option>
                                <option value="fourth">Fourth Service</option>
                            </select>
                        </div>


                        <label>Expected Year of Graduation <span className="text-danger">*</span> </label>
                        <select className="custom-select" onChange={this.handleChange} defaultValue="">

                            <option value={2019}>2019</option>
                            <option value={2020}>2020</option>
                            <option value={2021}>2021</option>
                            <option value={2022}>2022</option>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                        </select>

                        <input type="submit" value="submit" />
                    </form>

                </div>
            </section>
        );
    }
}

export default School_Admin_Register;