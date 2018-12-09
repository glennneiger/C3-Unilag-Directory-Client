export let plainTextInput = (theLabel, theType) => {
    return  {
        elementType: 'input',
        elementConfig: {
            type: theType
        },
        validation: {
            required: true,
        },
        valid: false,
        wasTouched: false,
        value: '',
        label: theLabel
    }
};

export let configureDropdown = (label, options) => {
    return {
        elementType: 'select',
        elementConfig: {
            optionValues: options
        },
        label: label,
        validation: {
            required: true,
        },
        valid: false,
        value: ''
    }
};

export let email = {
    elementType: 'input',
    elementConfig: {
        type: 'email'
    },
    validation: {
        required: true,
        email: true
    },
    valid: false,
    wasTouched: false,
    value: '',
    label: 'Email'
};

export let password = {
    elementType: 'input',
    elementConfig: {
        type: 'password'
    },
    value: '',
    validation: {
        required: true,
        minLength: 4,
        maxLength: 6
    },
    valid: false,
    wasTouched: false,
    label: 'Password'
};

export let passwordConfirm = {
    elementType: 'input',
    elementConfig: {
        type: 'password'
    },
    value: '',
    validation: {
        required: true,
        minLength: 4,
        maxLength: 6,
        passwordMatcher: true
    },
    valid: false,
    wasTouched: false,
    label: 'Confirm Password'
};

export let phoneNo = {
    elementType: 'input',
    elementConfig: {
        type: 'text'
    },
    validation: {
        required: true,
        minLength: 11,
        maxLength: 11,
        phoneNo: true
    },
    valid: false,
    wasTouched: false,
    value: '',
    label: 'Phone Number',
    placeholder: 'e.g.  08012345678'
};



