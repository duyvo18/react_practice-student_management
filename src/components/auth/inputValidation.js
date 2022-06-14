export const emailValidError = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(email) ? '' : 'The input does not look like an email.';
}

export const passwordValidError = (password) => {
    return password.length >= 6 ? '' : 'Password must be longer than 6 character.';
}

export const confirmPasswordValidError = (confirmPassword, password) => {
    return password === confirmPassword ? '' : 'Password does not match.';
}

export const firstnameValidError = (firstname) => {
    return firstname ? '' : 'Firstname must not be empty.';
}

export const lastnameValidError = (lastname) => {
    return lastname ? '' : 'Lastname must not be empty.';
}

export const idValidError = (sid) => {
    const sidRegex = /^[0-9]{7,10}/;

    return sidRegex.test(sid) ? '' : 'Student ID must be between 7 and 10 digits.';
}

export const startingYearValidError = (year) => {
    if ((/^[0-9]+/).test(year)) {
        return (year > 1995 && year <= (new Date()).getFullYear()) ?
            '' :
            'Starting year must be between 1995 and current year.';
    }
}