import React, { Component } from 'react';

 class DismissModal extends Component{
//     state = {
//        showModal: this.props.showModal
//     };

    // componentWillReceiveProps(nextProps){
    //     if (this.props.showModal !== nextProps.showModal){
    //         this.setState({ showModal: nextProps.showModal })
    //     }
    // }

   render() {
       // if showModal is true, show modal
       if (this.props.showModal){
           window.$('#dismissModal').modal('show');
       }
       else{
           // hde modal
           window.$('#dismissModal').modal('hide');
       }

       return (
           <div className="modal" id="dismissModal" tabIndex="-1" role="dialog">
               <div className="modal-dialog" role="document">
                   <div className="modal-content" style={{ top: '50px'}}>
                       <div className="modal-header">
                           <h5 className="modal-title">{this.props.modalTitle}</h5>
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ width: '10%' }}>
                               <span aria-hidden="true">&times;</span>
                           </button>
                       </div>
                       <div className="modal-body">
                           <p>{this.props.modalMessage}</p>
                       </div>
                       <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.dismissAction}>Close</button>
                       </div>
                   </div>
               </div>
           </div>
       );
   }
}

export default DismissModal;