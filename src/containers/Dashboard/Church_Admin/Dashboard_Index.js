import React, { Component } from 'react';
import { returnData, returnDataSet } from "../../../util/chartConfig";
import { connect } from 'react-redux';
import { Bar } from "react-chartjs-2";
import CountUp from 'react-countup';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import errorHandler from '../../../hoc/errorHandler';
import * as actions from '../../../store/actions/index';
import DismissModal from "../../../components/UI/DismissModal";
import Wrapper from "../../../hoc/Wrapper";

class Dashboard_Index extends Component{
    constructor(props){
        super(props);

        // initialize state
        this.state = {
            totalStudents: this.props.totalStudents,
            finalYearStudents: this.props.finalYearStudents,
            monthChartData: this.props.monthChartData,
            loading: this.props.totalStudents === null,
            hasError: false,
            errorMsg: null
        };

        // scroll to the top of screen
        window.scrollTo(0, 0);
    }  // end constructor

    getMonth = (monthNum) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum - 1];
    };

    dismissModal = () => {
        this.setState({
            hasError: false,
            errorMsg: null
        });
    };

   // bar chart configuration
    configureChartData = (rawData) => {
        // TODO: handle default case i.e when there is no data
        // TODO: wrap this class in an error boundary
        // TODO: use the getSnapshotBeforeUpdate() lifecycle method to handle scroll position

        let firstServiceArray = [], secondServiceArray = [], fourthServiceArray = [];
        // this is the label signifying each of the bar in the bar chart
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
        // eg. firstServiceArray = [10,20,30,40,50]
        let serviceDataArray = [firstServiceArray, secondServiceArray, fourthServiceArray];
        let datasetObjects = [];

        for (let i = 0; i < 3; i++){
            // create data set objects for first, second and fourth services
            let theDataObject = returnDataSet(serviceLabelArray[i], serviceDataArray[i], colorArray[i], colorArray[i], 1);
            datasetObjects.push(theDataObject);

        }

        return returnData(dateLabelsArray, datasetObjects)
    }; // end configureChartData

    async componentDidMount() {
        try{
            if (this.props.parentMounted && this.props.totalStudents === null){
                const getMonthStats = axios.get(`/admin/bus_stats?month=${new Date().getMonth() + 1}`);
                const getStudentDetails = axios.get('/admin/students');

                const [ monthStats, studentDetails ] = await Promise.all([getMonthStats, getStudentDetails]);
                const theChartData = this.configureChartData(monthStats.data.monthData);

                this.setState({
                    totalStudents: studentDetails.data.totalStudents,
                    finalYearStudents: studentDetails.data.finalYearStudents,
                    monthChartData: theChartData,
                    loading: false
                });

                // store dashboard data in the redux store
                const dataMap = new Map();

                dataMap.set('totalStudents', studentDetails.data.totalStudents);
                dataMap.set('finalYearStudents', studentDetails.data.finalYearStudents);
                dataMap.set('monthChartData', theChartData);

                this.props.initializeDashboardData(dataMap);


            }

            window.scrollTo(0, 0);

        }  catch (error) {
            this.setState({ hasError: true, errorMsg: error.message});
        }
    };


    render() {
        let mainBody = <Spinner />;

        if ( !(this.state.loading) ){
           // display proper UI
            mainBody = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
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
                        <div className="col-md-6 col-sm-12">
                            <div className="box">
                                <div className="box-icon" style={{ background: 'rgb(54,162,235)'}}>
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
                    </div> {/* end row*/}

                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box graph-box">
                                <div className="big-box-header form-header">
                                    <h3>Bus Statistics for {this.getMonth( new Date().getMonth() + 1)} {new Date().getFullYear()}</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <Bar data={this.state.monthChartData} />
                                </div>
                            </div>
                        </div>
                    </div> {/* End row */}
                    
                </div>
            );
        }

         return (
             <section className="dashindex">
                 <DismissModal showModal={this.state.hasError} modalTitle="Error" modalMessage={this.state.errorMsg} dismissAction={this.dismissModal}/>

                 {mainBody}
             </section>
         );
     }
}

const mapStateToProps = state => {
    return {
        totalStudents: state.church.totalStudents,
        finalYearStudents: state.church.finalYearStudents,
        monthChartData: state.church.monthChartData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initializeDashboardData: (dataMap) => dispatch(actions.initializeChurchData(dataMap))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( Dashboard_Index );