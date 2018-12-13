import React from 'react';

const spinner = () => {
    return (
        <div className="lds-css ng-scope theLabel">
            <div style={{ width: '100%', height: '100%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} className="lds-rolling">
                <div></div>
            </div>
        </div>
    );
};

export default spinner;