import React from 'react';

const successLabel = (props) => {
    console.log('leaderform props', props.leaderForm);
    let extraClass = props.leaderForm !== undefined  ? '' : 'theLabel';
    let mainClass = `alert alert-success alert-dismissible ${extraClass}`;

    return (
        <div className={mainClass} >
            <div>
                <p>
                    <span className="fa fa-check" style={{ paddingRight: '8px'}}></span>
                    {props.message}
                </p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" style={{ width: '10%' }}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
};

export default successLabel;

// TODO: fix the close button on the label (make it close)

