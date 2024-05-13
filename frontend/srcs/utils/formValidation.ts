const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/; 

const isFullNameValid = (fullName) => {
    return nameRegex.test(fullName);
};

const isEmailValid = (email) => {
    return emailRegex.test(email);
};

const isDateOfBirthValid = (dateOfBirth: string): boolean => {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const ageLimit = 10;

    const match = dateOfBirth.match(/^(\d{2})-(\d{2})-(\d{2})$/);
    if (!match) {
        return false;
    }

    const year = parseInt(match[1], 10) + 2000;
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    if (year < minYear || year > currentYear - ageLimit) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    const age = currentYear - year - (new Date(currentYear, month - 1, day) > new Date() ? 1 : 0);
    return age >= ageLimit;
};


export { isFullNameValid, isEmailValid, isDateOfBirthValid };
