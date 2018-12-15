import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CountUp from 'react-countup';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';

class DashboardIndex extends Component{
    state = {
        birthdaysArray: [],
        busDetails: [],
        studentDetails: [],
        loading: true,
        birthdaysToday: 0
    };

    getMonth = (monthNum) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum - 1];
    };

    getToken (token) {

        if (token) {
            axios.defaults.headers.common['authorization'] = token;
            // console.log('the token', axios.defaults.headers.common['authorization']);
        } else {
            axios.defaults.headers.common['authorization'] = null;
            console.log('the token', token);
            /*if setting null does not remove `Authorization` header then try
              delete axios.defaults.headers.common['Authorization'];
            */
        }
    };

    componentWillMount(){
        let theToken = window.localStorage.getItem('token');
        console.log('the token', theToken, window.localStorage.getItem('user'));

        if (theToken !== null){
            // set token in header
            this.getToken(theToken);
            console.log('heyyy');

        }
        else{
            // redirect to login page
            this.props.history.replace('/login');
        }
    }

    async componentDidMount(){
       // make request
       let getBirthdays = axios.get(`/admin/birthdays?month=${new Date().getMonth() + 1}`);          // get all the birthdays for the current month
       let getBusStats = axios.get(`/admin/bus_stats?month=${new Date().getMonth() + 1}`);           // get all the bus stats for the current month
       let getStudentDetails = axios.get('/admin/students');     // get the details for all the students

       const [ monthBirthdays, busDetails, studentDetails ] = await Promise.all([getBirthdays, getBusStats, getStudentDetails]);
        console.log(monthBirthdays, busDetails, studentDetails);
        let theBirthdays = monthBirthdays.data.birthdays;
        let birthdaysToday = 0;

        theBirthdays.forEach(birthday => {
            if (birthday.dob.day === new Date().getDate()){
                birthdaysToday += 1;
            }
        });
       this.setState({
           birthdaysArray: [...monthBirthdays.data.birthdays],
           busDetails: [...busDetails.data.monthData],
           studentDetails: [...studentDetails.data.students],
           loading: false,
           birthdaysToday
       });
    }

    render () {
        let tableBody = (
            <tr>
                <td colSpan={5}>No birthdays this month</td>
            </tr>
        );

        if (this.state.birthdaysArray.length > 0){
            tableBody = this.state.birthdaysArray.map( (student, index) => {
                let theMonth = this.getMonth(student.dob.month);
                let theBirthday = `${student.dob.day} ${theMonth}`;
                let todayClass = ( student.dob.day === new Date().getDate() ) ? 'today' : '';
                return (
                    <tr key={index} className={todayClass}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.surname}</td>
                        <td>{student.firstName}</td>
                        <td>{theBirthday}</td>
                        <td>{student.phoneNo}</td>
                    </tr>
                );
            } );

        }

        let mainBody = <Spinner/>;

        if ( !(this.state.loading) ){
            
            mainBody = (
                <div className="container">
                    {/*start row */}
                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: '#ff524a'}}>
                                   <span>
                                       <i className="glyphicon glyphicon-user"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={this.state.studentDetails.length} duration={1.5}/>
                                    <p className="number-title">Total Students</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'mediumseagreen'}}>
                                   <span>
                                       <i className="glyphicon glyphicon-info-sign"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={this.state.birthdaysToday} duration={1.5}/>
                                    <p className="number-title">Birthdays Today</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'deepskyblue'}}>
                                   <span>
                                       <i className="glyphicon glyphicon-calendar"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={this.state.birthdaysArray.length} duration={1.5}/>
                                    <p className="number-title">Birthdays This Month</p>
                                </div>
                            </div>
                        </div>
                    </div>  {/* end row */}

                    {/*start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box">
                                <div className="big-box-header form-header">
                                    <h3>Birthdays this Month</h3>
                                </div>
                                <div className="big-box-body table-responsive">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Surname</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Date of Birth</th>
                                                <th scope="col">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableBody}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <section className="dashindex">
                {mainBody}
            </section>
        );
    }
}

const mapDispatchTProps = dispatch => {
  return {
      
  }
};

export default connect(null, mapDispatchTProps)(DashboardIndex);