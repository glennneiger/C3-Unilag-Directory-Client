import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';
import { returnData, returnDataSet } from '../../../util/chartConfig';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import DismissModal from '../../../components/UI/Spinner';
import errorHandler from '../../../hoc/errorHandler';
import * as actions from '../../../store/actions/index';

class DashboardIndex extends Component{
    state = {
        birthdaysArray: this.props.birthdaysArray,
        chartData: this.props.monthChartData,
        totalStudents: this.props.totalStudents,
        finalYearStudents: this.props.finalYearStudents,
        loading: this.props.busStatsChanged,
        birthdaysToday: this.props.birthdaysToday,
        parentMounted: this.props.parentMounted

    } ;

    // componentWillUpdate() {
    //     console.log('child component will update');
    // }

    componentDidUpdate(){
        console.log('child component did update');
    }

    // componentWillMount(){
    //     console.log('child component will mount', this.props.parentMounted);
    // }

    // componentWillReceiveProps(nextProps){
    //     console.log('child component will receive props', nextProps.parentMounted);
    //     if (this.props.parentMounted !== nextProps.parentMounted){
    //         this.setState({ parentMounted: nextProps.parentMounted });
    //     }
    // }

    getMonth = (monthNum) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum - 1];
    };

    configureChartData = (rawData) => {
        // TODO: handle default case i.e when there is no data
        // TODO: wrap this class in an error boundary

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
    }; // end configureChartData




    async componentDidMount(){
        console.log('child component did mount');
        try{
            if (this.props.parentMounted && this.props.busStatsChanged ){
                console.log('church dashboard index', this.props.parentMounted);
                // make request
                let getBirthdays = axios.get(`/admin/birthdays?month=${new Date().getMonth() + 1}`);          // get all the birthdays for the current month
                let getBusStats = axios.get(`/admin/bus_stats?month=${new Date().getMonth() + 1}`);           // get all the bus stats for the current month
                let getStudentDetails = axios.get('/admin/students');     // get the details for all the students

                const [ monthBirthdays, busDetails, studentDetails ] = await Promise.all([getBirthdays, getBusStats, getStudentDetails]);
                console.log('the statistics',monthBirthdays, busDetails, studentDetails);
                let theBirthdays = monthBirthdays.data.birthdays;
                let birthdaysToday = 0, theChartData = this.configureChartData(busDetails.data.monthData);

                console.log('chart data', theChartData);

                theBirthdays.forEach(birthday => {
                    if (birthday.dob.day === new Date().getDate()){
                        birthdaysToday += 1;
                    }
                });


                this.setState({
                    birthdaysArray: monthBirthdays.data.birthdays,
                    chartData: theChartData,
                    totalStudents: studentDetails.data.totalStudents,
                    finalYearStudents: studentDetails.data.finalYearStudents,
                    loading: false,
                    birthdaysToday
                });

                //  initialize dashboard data in the redux store
                const dashboardMap = new Map();

                dashboardMap.set('birthdaysArray', monthBirthdays.data.birthdays);
                dashboardMap.set('monthChartData', theChartData);
                dashboardMap.set('totalStudents', studentDetails.data.totalStudents);
                dashboardMap.set('finalYearStudents', studentDetails.data.finalYearStudents);
                dashboardMap.set('birthdaysToday', birthdaysToday);

                this.props.initializeDashboardData(dashboardMap);

            } // end if statement
        } catch(error){
            console.log('the error', error);
        }

    }  //   end componentDidMount

    componentWillUnmount(){
        console.log('child component unmounted', this.props.parentMounted);
    }

    render () {
        console.log('render in child component');

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
                let thePhoneNo = student.phoneNo;
                let modifiedNo = thePhoneNo.split('');
                // remove the first Number from the phone number to allow room for 234
                modifiedNo.splice(0, 1);


                console.log('phone no', modifiedNo);

                // link to Whatsapp message API
                let whatsappLink = `https://api.whatsapp.com/send?phone=234${modifiedNo.join('')}`;

                // students whose dob corresponds with today's date
                let todayClass = ( student.dob.day === new Date().getDate() ) ? 'today' : '';

                return (
                    <tr key={index} className={todayClass}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.surname}</td>
                        <td>{student.firstName}</td>
                        <td>{theBirthday}</td>
                        <td>{student.phoneNo}</td>
                        <td>
                            <a href={whatsappLink} target="_blank">
                                <button className="btn btn-success" style={{ marginBottom: '0px', width: '60%' }}>
                                    <i className="fa fa-whatsapp" style={{ marginRight: '5px'}}></i>
                                    Message
                                </button>
                            </a>
                        </td>
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
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'rgb(255,99,132)'}}>
                                   <span>
                                       <i className="glyphicon glyphicon-user"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={this.state.totalStudents} duration={1.5}/>
                                    <p className="number-title">Total Students</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'rgb(255,99,132)'}}>
                                   <span>
                                       <i className="glyphicon glyphicon-education"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={this.state.finalYearStudents} duration={1.5}/>
                                    <p className="number-title">Final Year Students</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
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
                        <div className="col-lg-3 col-md-6 col-sm-12">
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
                        <div className="col-12" >
                            <div className="big-box" id="birthday_box">
                                <div className="big-box-header form-header">
                                    <h3>Birthdays this Month</h3>
                                </div>
                                <div className="big-box-body table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Surname</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Date of Birth</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Action</th>
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


const mapStateToProps = state => {
    return {
        birthdaysArray: state.school.birthdaysArray,
        monthChartData: state.school.monthChartData,
        totalStudents: state.school.totalStudents,
        finalYearStudents:state.school.finalYearStudents,
        busStatsChanged: state.school.busStatsChanged,
        birthdaysToday: state.school.birthdaysToday
    }
};

const mapDispatchToProps = dispatch => {
  return {
     initializeDashboardData: (dataMap) => dispatch(actions.initializeDashboardData(dataMap))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)( DashboardIndex ) ;