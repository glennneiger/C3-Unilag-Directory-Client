import React, { Component } from 'react';

import HomeHeader from '../../components/UI/Home_Header';

class Student_Register extends Component{
    handleChange = (event) => {
        console.log(event.target.value);
    };


    render() {
        return (
            <section>
                <HomeHeader/>
                <div className="register">
                    <div className="form-header">
                        <h1 style={{ marginBottom: '0px' }}>Student Registration</h1>
                    </div>
                    <p style={{ padding: '5px 20px 0px', marginBottom: '0px'}}> <span className="text-danger">* </span> field is required</p>
                    <form onSubmit={this.submitForm}>
                        <label>Surname <span className="text-danger">*</span> </label>
                        <input type="text" name="surname" onChange={this.handleChange} required/>

                        <div className="form-group">
                            <label>First name <span className="text-danger">*</span> </label>
                            <input className="form-control" type="text" name="firstName" onChange={this.handleChange} required/>
                        </div>


                        <label>Date of Birth <span className="text-danger">*</span> </label>
                        <input type="date" name="dob"  onChange={this.handleChange} required/>

                        <label>Department <span className="text-danger">*</span> </label>
                        <input type="text" name="dept" onChange={this.handleChange} required/>

                        <label>Email <span className="text-danger">*</span> </label>
                        <input type="email" name="email" onChange={this.handleChange} required/>

                        <label>Phone Number <span className="text-danger">*</span> </label>
                        <input type="text" name="phoneNo" onChange={this.handleChange} required/>

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

export default Student_Register;