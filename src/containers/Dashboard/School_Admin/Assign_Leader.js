import React, { Component } from 'react';

class Assign_Leader extends Component{
    constructor(props){
        super(props);

        const user = JSON.parse(window.localStorage.getItem('user'));

        // initialize state
        this.state = {
            user: user
        };

        // if the user is not the transport unit leader, redirect to school_admin dashboard
        if ( !(user.leader) ){
            this.props.history.replace('/school_admin/dashboard');
            return;
        }

        console.log('leader constructor');

    }

    componentDidMount(){
        if ( !(this.state.user.leader) ){
            console.log('assign leader mounted');
        }
    }

    render() {


        return (
           <section className="dashindex">
              <h1>Assign leader</h1>
           </section>
        );
    }
}

export default Assign_Leader;