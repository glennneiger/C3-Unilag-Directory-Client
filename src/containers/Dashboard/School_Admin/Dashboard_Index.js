import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup'

class DashboardIndex extends Component{
    render (){
        return (
            <section className="dashindex">
                <div className="container">
                    {/*start row */}
                    <div className="row">
                       <div className="col-lg-4 col-sm-12">
                           <div className="box">
                               <div className="box-icon">
                                   <span>
                                       <i className="glyphicon glyphicon-user"></i>
                                   </span>
                               </div>
                               <div className="box-body">
                                   <CountUp className="counter" start={0} end={20} duration={1.5}/>
                                   <p className="number-title">Total Students</p>
                               </div>
                           </div>
                       </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon">
                                   <span>
                                       <i className="glyphicon glyphicon-info-sign"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={10} duration={1.5}/>
                                    <p className="number-title">Birthdays Today</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="box">
                                <div className="box-icon">
                                   <span>
                                       <i className="glyphicon glyphicon-calendar"></i>
                                   </span>
                                </div>
                                <div className="box-body">
                                    <CountUp className="counter" start={0} end={7} duration={1.5}/>
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
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Olorondu</td>
                                                <td>Chukwuemeka</td>
                                                <td>12 May</td>
                                                <td>08100766771</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            </section>
        );
    }
}

export default DashboardIndex;