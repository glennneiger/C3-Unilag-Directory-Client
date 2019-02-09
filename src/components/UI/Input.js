import React from 'react';
import Wrapper from '../../hoc/Wrapper';

const input = (props) => {
    let inputElement = '';
    let smallClass = 'd-none';


    switch(props['input_type']){
        case 'input':
            let theClass = '';
             if (props.wasTouched){
                 theClass = props.isValid ? '' : 'invalid';
                 smallClass = `text-danger ${props.isValid ? 'd-none' : ''}`;
             }

            inputElement =
                <input
                    type={props.theConfig.type}
                    value={props.theValue}
                    onChange={props.changed}
                    className={theClass}
                    onBlur={props.handleBlur}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    required
                />;
            break;

        case 'select':
            let dropdownClass = 'custom-select';
            if (props.wasTouched){
                dropdownClass = props.isValid ? 'custom-select' : 'custom-select invalid';
                smallClass = `text-danger ${props.isValid ? 'd-none' : ''}`;
            }
            inputElement =
                <select
                    className={dropdownClass}
                    value={props.theValue}
                    onChange={props.changed}
                    required>
                        {props.theConfig.optionValues.map(optionValue => (
                            <option key={optionValue.value} value={optionValue.value}>{optionValue.displayValue}</option>
                        ))
                        }
                </select> ;
            break;

        default:
            inputElement = <input />

    }



   return (
        <div className="input-wrapper">
            <label> {props.label} <span className="text-danger"> <b>*</b> </span> </label>
            {inputElement}
            <small className={smallClass}>{props.validationMessage}</small>
        </div>
   );
};

export default input;