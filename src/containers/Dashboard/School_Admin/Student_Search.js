import React, { Component } from 'react';

import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner';

class Student_Search extends Component{
    state = {
       surname: '',
        searchResult: [],
        isEmpty: true,
        showTable: false,
        spinner: ''
    };

    handleChange = (event) => {
        let theValue =  event.target.value.toLowerCase().trim();
        let empty = theValue === '';

        this.setState({ surname:  theValue, isEmpty: empty });
    };

    submitForm = (event) => {
        event.preventDefault();
        const theSpinner = <Spinner/>;

        this.setState({ spinner: theSpinner, showTable: false });

        axios.post('/admin/student_search', { surname: this.state.surname })
            .then(result => {


               this.setState({
                   searchResult: result.data.searchResult,
                   showTable: true,
                   spinner: ''
               });

            }) // end then
            .catch(error => {
                console.log('error')
            });

    };

   render() {
       let tableBody = (
           <tr>
               <td colSpan={4} style={{ textAlign: 'center' }}>No student found</td>
           </tr>
        );

       if (this.state.searchResult.length > 0){
           tableBody = this.state.searchResult.map((student, index) => {
              return (
                  <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{student.surname}</td>
                      <td>{student.firstName}</td>
                      <td>{student.phoneNo}</td>
                  </tr>
              ); 
           })
       }

       let showTable = this.state.showTable ? '' : 'd-none';
       let tableClass = `table table-bordered ${showTable}`;



       return (
           <section className="dashindex" >
               <div className="container">
                   {/*Start row*/}
                   <div className="row">
                       <div className="col-12">
                           <div className="big-box"  id="student_search">
                               <div className="big-box-header form-header">
                                   <h3>Search for a student</h3>
                               </div>
                               <div className="big-box-body" style={{ paddingBottom: '15px', paddingTop: '10px' }}>
                                   <div style={{ width: '90%', margin: '0px auto'}}>
                                       <form onSubmit={this.submitForm} style={{ marginTop: '5px' }}>
                                           <label>Surname</label>
                                           <input type="text" placeholder="Enter surname" onChange={this.handleChange} required/>

                                           <input type="submit" value="Search"  disabled={this.state.isEmpty}/>
                                       </form>


                                   </div>
                               </div>
                           </div>
                       </div>
                   </div> {/* End row */}

                   {this.state.spinner}

                   <div className="row">
                       <div className="col-12 table-responsive">
                           <table className={tableClass} style={{ background: '#fff', marginTop: '40px' }}>
                               <thead>
                                   <tr>
                                       <th scope="col" style={{ background: '#d8d8d8' }}>#</th>
                                       <th scope="col">Surname</th>
                                       <th scope="col">First Name</th>
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
           </section>
       );
   }
}

export default Student_Search;