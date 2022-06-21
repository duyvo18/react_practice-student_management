export const emailValidError = (email) => {
    if (!email) return 'Email must not be empty.'

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email) ? '' : 'The input does not look like a valid email.';
}

export const passwordValidError = (password) => {
    if (password) {
        return password.length >= 6 ? '' : 'Password must be longer than 6 character.';
    } else {
        return 'Password must not be empty.'
    }
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
    if (!sid) return 'Student ID must not be empty.'

    const sidRegex = /^[0-9]{7,10}$/;
    return sidRegex.test(sid) ? '' : 'Student ID must be between 7 and 10 digits.';
}

export const startingYearValidError = (year) => {
    if (!year) return 'Starting year must not be empty.'

    if ((/^[0-9]+$/).test(year)) {
        return (year > 1995 && year <= (new Date()).getFullYear()) ?
            '' :
            'Starting year must be between 1995 and current year.';
    } else {
        return 'The input does not look like a valid year.'
    }
}