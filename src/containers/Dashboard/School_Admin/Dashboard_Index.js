import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';
import { returnData, returnDataSet } from '../../../util/chartConfig';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import errorHandler from '../../../hoc/errorHandler';

class DashboardIndex extends Component{
    state = {
        birthdaysArray: [],
        chartData: {},
        studentDetails: [],
        loading: true,
        birthdaysToday: 0
    };

    getMonth = (monthNum) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum - 1];
    };





    configureChartData = (rawData) => {
        // TODO: handle default case i.e when there is no data

        let firstServiceArray = [], secondServiceArray = [], fourthServiceArray = [];
        let serviceLabelArray = ['First Service Total', 'Second Service Total', 'Fourth Service Total'], dateLabelsArray = [];
        let colorArray = ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(75,192,192,0.6)'];

        // fill service arrays for each Sunday
         rawData.forEach(data => {
             // populate the arrays for the different services. These are the 3 data sets
                 firstServiceArray.push(data.FirstService);
                 secondServiceArray.push(data.SecondService);
                 fourthServiceArray.push(data.FourthService);

                 // array for the different dates. This is the label for the x-axis
                 dateLabelsArray.push(data.Date);
         
         });

         // the service label is the label for each data set
         let serviceArray = [firstServiceArray, secondServiceArray, fourthServiceArray];
         let datasetObjects = [];

         for (let i = 0; i < 3; i++){
             // create data set objects for first, second and fourth services
            let theDataObject = returnDataSet(serviceLabelArray[i], serviceArray[i], colorArray[i], colorArray[i], 1);
            datasetObjects.push(theDataObject);

         }

         return returnData(dateLabelsArray, datasetObjects)
    };

    async componentDidMount(){
       // make request
       let getBirthdays = axios.get(`/admin/birthdays?month=${new Date().getMonth() + 1}`);          // get all the birthdays for the current month
       let getBusStats = axios.get(`/admin/bus_stats?month=${new Date().getMonth() + 1}`);           // get all the bus stats for the current month
       let getStudentDetails = axios.get('/admin/students');     // get the details for all the students

       const [ monthBirthdays, busDetails, studentDetails ] = await Promise.all([getBirthdays, getBusStats, getStudentDetails]);
        console.log(monthBirthdays, busDetails, studentDetails);
        let theBirthdays = monthBirthdays.data.birthdays;
        let birthdaysToday = 0, theChartData = this.configureChartData(busDetails.data.monthData);

        console.log('chart data', theChartData);

        theBirthdays.forEach(birthday => {
            if (birthday.dob.day === new Date().getDate()){
                birthdaysToday += 1;
            }
        });


       this.setState({
           birthdaysArray: [...monthBirthdays.data.birthdays],
           chartData: theChartData,
           studentDetails: [...studentDetails.data.students],
           loading: false,
           birthdaysToday
       });
    }  //   end componentDidMount

    render () {

        // if there are no birthdays in the current month
        let tableBody = (
            <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>No birthdays this month</td>
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

        // if the response from the API has been completed
        if ( !(this.state.loading) ){

            mainBody = (
                <div className="container">
                    {/*start row */}
                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'rgb(255,99,132)'}}>
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
                                <div className="box-icon" style={{ background: 'rgb(75,192,192)'}}>
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
                                <div className="box-icon" style={{ background: 'rgb(54,162,235)'}}>
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
                    </div>   {/* End Row*/}

                    {/*Start row*/}
                    <div className="row">
                       <div className="col-12">
                           <div className="big-box">
                               <div className="big-box-header form-header">
                                   <h3>Bus Statistics for {this.getMonth( new Date().getMonth() + 1)} {new Date().getFullYear()}</h3>
                               </div>
                               <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                   <Bar data={this.state.chartData} />
                               </div>
                           </div>
                       </div>
                    </div> {/* End row */}
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

export default connect(null, mapDispatchTProps)( errorHandler(DashboardIndex) );