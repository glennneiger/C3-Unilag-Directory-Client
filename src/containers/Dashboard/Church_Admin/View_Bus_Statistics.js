import React, { Component } from 'react';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';
import { Bar, Line } from "react-chartjs-2";


class View_Bus_Statistics extends Component{
    constructor(props){
        super(props);

        // initialize state
        this.state = {
            monthChartData: {},
            yearChartData: {},
            cumulativeChartData: {},
            loading: true
        };

        window.scrollTo(0, 0);
    }

    getMonth = (monthNum) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum - 1];
    };

    componentDidMount(){

    }


    render() {
        const currentYear = new Date().getFullYear();
        let mainBody = <Spinner />;

        if ( !(this.state.loading) ){
            mainBody = (
                <div className="container">
                    {/*Start row*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="big-box">
                                <div className="big-box-header form-header">
                                    <h3>Bus Statistics for {this.getMonth( new Date().getMonth() + 1)} {new Date().getFullYear()}</h3>
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
                            <div className="big-box">
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
                            <div className="big-box">
                                <div className="big-box-header form-header">
                                    <h3>Cumulative Bus Statistics for Year ({currentYear - 9} - {currentYear})</h3>
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
                {mainBody}
            </section>
        );
    }
}

export default View_Bus_Statistics;