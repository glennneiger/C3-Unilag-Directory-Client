export let plainTextInput = (theLabel) => {
    return  {
        elementType: 'input',
        elementConfig: {
            type: 'text'
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

