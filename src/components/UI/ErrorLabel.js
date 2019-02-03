import React from 'react';

const errorLabel = (props) => {
    return (
        <div className="alert alert-danger theLabel">
            <div>
                <p>
                    <span className="fa fa-close" style={{ paddingRight: '8px'}}></span>
                    {props.message}
                </p>
                {/*<button type="button" className="close" data-dismiss="alert" aria-label="Close" style={{ width: '10%' }}>*/}
                    {/*<span aria-hidden="true">&times;</span>*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default errorLabel;