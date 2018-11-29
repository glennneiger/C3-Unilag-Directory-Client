import React, { Component } from 'react';

import Header from '../../components/UI/Home_Header';

class AdminLogin extends Component{
   render() {
       return (
           <section>
               <Header />
               <div className="register">
                   <div className="form-header">
                       <h1 style={{ marginBottom: '0px' }}>Login</h1>
                   </div>

                   {/*{errorMessage}*/}
                   <form onSubmit={this.submitForm}>
                       <label>Email</label>
                       <input type="text" name="email" onChange={this.handleChange} required/>

                       <label>Password</label>
                       <input type="password" name="password" onChange={this.handleChange} required/>

                       <input name="school" type="submit" value="Login as School Admin" />
                       <div className="divider-line">
                           <span>OR</span>
                       </div>
                       <input name="church" type="submit" value="Login as Church Admin"/>
                   </form>
                   
               </div>
           </section>
       );
   }
}

export default AdminLogin;