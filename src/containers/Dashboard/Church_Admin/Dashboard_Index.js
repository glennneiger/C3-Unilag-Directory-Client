import React, { Component } from 'react';
import {returnData, returnDataSet} from "../../../util/chartConfig";

class Dashboard_Index extends Component{
    state = {};

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


    render() {
         return (
             <h1>Hello</h1>
         );
     }
}

export default Dashboard_Index;