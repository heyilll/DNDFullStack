import { isEmail } from 'validator';

const required = value => {
    if (!value) {
        return false;
    } else {
        return true;
    }
};

const validEmail = value => {
    if (!isEmail(value)) {
        return false;
    } else {
        return true;
    }
};

const validPassword = value => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (value.length < 8) {
        return false;
    } else if (value == value.toLowerCase()) {
        return false;
    } else if (!specialChars.test(value)) {
        return false;
    } else if (!/\d/.test(value)) {
        return false;
    } else {
        return true;
    }
}; 

const validationService = {
    required,
    validEmail, 
    validPassword,
};

export default validationService;