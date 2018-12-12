import React from 'react';

const successLabel = (props) => {
    return (
        <div className="alert alert-success alert-dismissible theLabel" >
            <div>
                <p>
                    <span className="fa fa-check" style={{ paddingRight: '8px'}}></span>
                    {props.message}
                </p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
};

export default successLabel;