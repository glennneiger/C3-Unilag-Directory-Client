import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

 class DismissModal extends Component{

   render() {
       const theStyles = {
           modal: {
               minWidth: '300px'
           },
           closeIcon: {
               position: 'absolute',
               right: '0'
           }
       };


       return (
           <div style={{ textAlign: 'center' }}>
               <Modal open={this.props.showModal} onClose={this.props.dismissAction} center styles={theStyles}>
                   <h2 style={{ borderBottom: '1px solid #222', marginBottom: '10px', paddingBottom: '10px', fontWeight: 'bold' }}>
                       {this.props.modalTitle}
                   </h2>
                   <p style={{ fontSize: '1.13rem' }}>
                       {this.props.modalMessage}
                       
                   </p>
               </Modal>
           </div>

       );
   }
}

export default DismissModal;