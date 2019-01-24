import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-instance';

import Header from '../../components/UI/Home_Header';
import ErrorLabel from '../../components/UI/ErrorLabel';
import Spinner from '../../components/UI/Spinner';
import errorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';

class AdminLogin extends Component{
   state = {
      loginForm: {
          email: '',
          password: ''
      },
      loading: false,
       loginMessage: ''
   };

   handleChange = (event) => {
      let formClone = {...this.state.loginForm};
      formClone[event.target.name] = event.target.value;

      // update the state immutably with the new login form
       this.setState({ loginForm: formClone });
   };

   submitForm = (event) => {
      event.preventDefault();
      // scroll to the top position
       window.scrollTo(0, 0);

      let theSpinner = <Spinner />;
      let targetName = event.target.name;
      this.setState({ loading: true, loginMessage: theSpinner });

       axios.post(`/admin/login?admin=${targetName}`, this.state.loginForm)
           .then(result => {
              if (result.data.authorized){
                  // store token and user details in the local storage
                  window.localStorage.setItem('token', result.data.token);
                  window.localStorage.setItem('user', JSON.stringify(result.data.user) );

                  // save user details in the redux store
                  if (targetName === 'school'){
                      this.props.loadSchoolAdmin(result.data.user);
                  }

                  else{
                      this.props.loadChurchAdmin(result.data.user);
                  }

                  // redirect to the appropriate dashboard
                  this.props.history.replace(`/${targetName}_admin/dashboard`);
              }
              else{
                  let errorMsg = <ErrorLabel message={result.data.message}/>;
                  this.setState({ loginMessage: errorMsg, loading: false })
              }
           })
           .catch(error => {

           });
      console.log('the login state', this.state.loginForm);

      // console.
   };

   render() {

       // check for register message
       let tempClass = this.state.loginMessage !== '' ? 'register registerMsg' : 'register';

       return (
           <section>
               <Header />
               {this.state.loginMessage}
               <div className={tempClass}>
                   <div className="form-header">
                       <h1 style={{ marginBottom: '0px' }}>Login</h1>
                   </div>

                   {/*{errorMessage}*/}
                   <form>
                       <label>Email</label>
                       <input type="text" name="email" onChange={this.handleChange} required/>

                       <label>Password</label>
                       <input type="password" name="password" onChange={this.handleChange} required/>

                       {/*Button Area*/}

                       <button type="submit" name="school"  onClick={this.submitForm} disabled={this.state.loading}>
                           Login as School Admin
                       </button>
                       <div className="divider-line">
                           <span>OR</span>
                       </div>
                       <button type="submit" name="church"  onClick={this.submitForm} disabled={this.state.loading}>
                           Login as Church Admin
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