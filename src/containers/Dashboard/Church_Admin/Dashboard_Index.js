import React, { Component } from 'react';
import { returnData, returnDataSet } from "../../../util/chartConfig";
import CountUp from 'react-countup';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';

class Dashboard_Index extends Component{
    constructor(props){
        super(props);

        // initialize state
        this.state = {
            totalStudents: null,
            finalYearStudents: null,
            monthChartData: [],
            yearChartData: [],
            cumulativeChartData: []
        };

        // scroll to the top of screen
        window.scrollTo(0, 0);
    }  // end constructor

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

    fetchDashboardData = () => {

    };


    render() {
        let mainBody = <Spinner />;

        if (this.state.chartData.length > 0){
           // display proper UI
            mainBody = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="box">
                                <div className="box-icon">
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
                                <div className="box-icon">
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

export default Dashboard_Index;