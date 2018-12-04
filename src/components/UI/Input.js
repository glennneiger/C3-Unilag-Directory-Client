import React from 'react';
import Wrapper from '../../hoc/Wrapper';

const input = (props) => {
    let inputElement = '';

    switch(props['input_type']){
        case 'input':
            let theClass = '';
             if (props.wasTouched){
                 theClass = props.isValid ? '' : 'invalid';
             }

            inputElement =
                <input
                    type={props.theConfig.type}
                    value={props.theValue}
                    onChange={props.changed}
                    className={theClass}
                    onBlur={props.handleBlur}
                    required
                />;
            break;

        case 'select':
            inputElement =
                <select
                    className="custom-select"
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
        <Wrapper>
            <label> {props.label} <span className="text-danger"> <b>*</b> </span> </label>
            {inputElement}
        </Wrapper>
   );
};

export default input;