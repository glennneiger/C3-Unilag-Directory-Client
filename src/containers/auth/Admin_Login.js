import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-instance';

import Header from '../../components/UI/Home_Header';
import ErrorLabel from '../../components/UI/ErrorLabel';
import Spinner from '../../components/UI/Spinner';
import errorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';
import DismissModal from "../../components/UI/DismissModal";

class AdminLogin extends Component{
   state = {
      loginForm: {
          email: '',
          password: ''
      },
       admin: 'school',
      loading: false,
       loginMessage: '',
       hasError: false,
       errorMsg: null
   };

   handleChange = (event) => {
      let formClone = {...this.state.loginForm};
      formClone[event.target.name] = event.target.value;

      // update the state immutably with the new login form
       this.setState({ loginForm: formClone });
   };

   handleDropdowwnChange = (event) => {
       this.setState({ admin: event.target.value });
   };

    dismissModal = () => {
        this.setState({
            hasError: false,
            errorMsg: null
        });
    };

   submitForm = (event) => {
      event.preventDefault();

       // scroll to the top of screen
       document.body.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
       });

      let theSpinner = <Spinner />;
      this.setState({ loading: true, loginMessage: theSpinner, hasError: false, errorMsg: null });

       axios.post(`/admin/login?admin=${this.state.admin}`, this.state.loginForm)
           .then(result => {
              if (result.data.authorized){
                  // store token and user details in the local storage
                  window.localStorage.setItem('token', result.data.token);
                  window.localStorage.setItem('user', JSON.stringify(result.data.user) );

                  // save user details in the redux store


                  // redirect to the appropriate dashboard
                  this.props.history.replace(`/${this.state.admin}_admin/dashboard`);
              }
              else{
                  let errorMsg = <ErrorLabel message={result.data.message}/>;
                  this.setState({ loginMessage: errorMsg, loading: false })
              }
           })
           .catch(error => {
               this.setState({ hasError: true, errorMsg: error.message, loginMessage: '', loading: false });
           });


   };

   render() {

       // check for register message
       let tempClass = this.state.loginMessage !== '' ? 'register registerMsg' : 'register';

       return (
           <section className="login">
               <DismissModal showModal={this.state.hasError} modalTitle="Error" modalMessage={this.state.errorMsg} dismissAction={this.dismissModal}/>

               <Header />
               {this.state.loginMessage}
               <div className={tempClass} id="login">
                   <div className="form-header">
                       <h1 style={{ marginBottom: '0px' }}>Login</h1>
                   </div>

                   {/*{errorMessage}*/}
                   <form>
                       <div className="login-dropdown">
                           <label>Login As: </label>
                           <select className="custom-select" value={this.state.admin} onChange={this.handleDropdowwnChange} required>
                               <option value="school">School Admin</option>
                               <option value="church">Church Admin</option>
                           </select>
                       </div>

                       <div className="input-wrapper">
                           <label>Email</label>
                           <input type="text" name="email" onChange={this.handleChange} required/>
                       </div>

                        <div className="input-wrapper">
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handleChange} required/>
                        </div>

                       {/*Button Area*/}

                       <button type="submit"  onClick={this.submitForm} disabled={this.state.loading}>
                           <span style={{ marginRight: '10px' }}><i className="glyphicon glyphicon-send"></i></span>
                           Login 
                       </button>

                   </form>
                   
               </div>
           </section>
       );
   }
}



const mapDispatchToProps = dispatch => {
    return {
       loadSchoolAdmin: (theAdmin) => dispatch(actions.loadSchoolAdmin(theAdmin)),
        loadChurchAdmin: (theAdmin) => dispatch(actions.loadChurchAdmin(theAdmin))
    }
};

export default connect(null, mapDispatchToProps)( errorHandler(AdminLogin) );