import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import * as actions from '../../../store/actions/index';
import { Bar, Line } from "react-chartjs-2";
import { returnData, returnDataSet } from "../../../util/chartConfig";
import DismissModal from "../../../components/UI/DismissModal";


class View_Bus_Statistics extends Component{
    constructor(props){
        super(props);

        // initialize state
        this.state = {
            monthChartData: this.props.monthChartData,
            yearChartData: this.props.yearChartData,
            cumulativeChartData: this.props.cumulChartData,
            yearsArray: this.props.yearsArray,
            loading: this.props.busContentLoading,
            hasError: false,
            errorMsg: null
        };

        window.scrollTo(0, 0);
    }

    dismissModal = () => {
        this.setState({
            hasError: false,
            errorMsg: null
        });
    };

    getMonth = (monthNum) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[monthNum - 1];
    };

    configureChartData = (rawData, chartType, chartSeason) => {
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
            let dateLabel = data.Date;
            switch(chartSeason){
                case 'month':
                    dateLabel = data.Date;
                    break;
                case 'year':
                    dateLabel = this.getMonth(data._id);
                    break;
                case 'cumulative':
                    dateLabel = data._id;
                    break;
                default:
                    dateLabel = data.Date;
                    break;
            }

            dateLabelsArray.push(dateLabel);

        });

        // the service label is the label for each data set
        // eg. firstServiceArray = [10,20,30,40,50]
        let serviceDataArray = [firstServiceArray, secondServiceArray, fourthServiceArray];
        let datasetObjects = [];

        for (let i = 0; i < 3; i++){
            // create data set objects for first, second and fourth services
            let backgroundColorArray = chartType === 'bar' ? [...colorArray] : ['transparent', 'transparent', 'transparent'];
            let borderWidth = chartType === 'bar' ? 1 : 2;
            let theDataObject = returnDataSet(serviceLabelArray[i], serviceDataArray[i], backgroundColorArray[i], colorArray[i], borderWidth);
            datasetObjects.push(theDataObject);

        }

        return returnData(dateLabelsArray, datasetObjects)
    }; // end configureChartData

    async componentDidMount(){
        try{
            if (this.props.parentMounted && this.props.busContentLoading){
                const getMonthStats = axios.get(`/admin/bus_stats?month=${new Date().getMonth() + 1}`);
                const getYearStats = axios.get(`/admin/bus_stats/year?year=${new Date().getFullYear()}`);
                const getCumulStats = axios.get('/admin/bus_stats/cumulative');

                const [ monthStats, yearStats, cumulStats ] = await Promise.all([getMonthStats, getYearStats, getCumulStats]);

                const cloneYearsArray = cumulStats.data.cumulativeData.map(data => data._id);

                // configure bar and line chart data
                const monthBarChart = this.configureChartData(monthStats.data.monthData, 'bar', 'month');
                const yearLineChart = this.configureChartData(yearStats.data.yearData, 'line', 'year');
                const cumulLineData = this.configureChartData(cumulStats.data.cumulativeData, 'line', 'cumulative');

                // set the state
                this.setState({
                    monthChartData: monthBarChart,
                    yearChartData: yearLineChart,
                    cumulativeChartData: cumulLineData,
                    yearsArray: cloneYearsArray,
                    loading: false
                });

                // load bus data in the redux store
                const dataMap = new Map();

                dataMap.set('monthChartData', monthBarChart);
                dataMap.set('yearChartData', yearLineChart);
                dataMap.set('cumulChartData', cumulLineData);
                dataMap.set('yearsArray', cloneYearsArray);

                this.props.loadBusData(dataMap);

                console.log('view bus stats axios fetch');

            } // end if statement


        }  catch(error){
            this.setState({ hasError: true, errorMsg: error.message });
        }

    }


    render() {

        let mainBody = <Spinner />;

        if ( !(this.state.loading) ){
            const currentYear = new Date().getFullYear();
            const yearsArray = this.state.yearsArray;
            const minYear = yearsArray[0];
            const maxYear = yearsArray[yearsArray.length - 1];

            mainBody = (
                <div className="container">

                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box graph-box">
                                <div className="big-box-header form-header">
                                    <h3>Bus Statistics for {this.getMonth( new Date().getMonth() + 1)} {currentYear}</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <Bar data={this.state.monthChartData} />
                                </div>
                            </div>
                        </div>
                    </div> {/* End row */}

                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box graph-box">
                                <div className="big-box-header form-header">
                                    <h3>Bus Statistics for Year {currentYear}</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <Line data={this.state.yearChartData} />
                                </div>
                            </div>
                        </div>
                    </div> {/* End row */}

                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box graph-box">
                                <div className="big-box-header form-header">
                                    <h3>Cumulative Bus Statistics for Year ({minYear} - {maxYear})</h3>
                                </div>
                                <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                    <Line data={this.state.cumulativeChartData} />
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
} // end class


// redux variables

const mapStateToProps = state => {
    return {
       monthChartData: state.church.monthChartData,
        yearChartData: state.church.yearChartData,
        cumulChartData: state.church.cumulChartData,
        yearsArray: state.church.yearsArray,
        busContentLoading: state.church.busContentLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
       loadBusData: (dataMap) => dispatch(actions.loadBusData(dataMap))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(View_Bus_Statistics);