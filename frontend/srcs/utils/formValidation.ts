const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/; 

import api from '../api/posts'


const isFullNameValid = (fullName) => {
    return nameRegex.test(fullName);
};



async function validateEmail(email) {
    if (!emailRegex.test(email)) {
        return "Invalid email address.";
    }
    try {

     await api.post('/auth/checkemail', { email: email });
       return null;
    
        // not found
    } catch (error) {
        return "Email already exists.";
        // yes founded
    }
}




const isDateOfBirthValid = (dateOfBirth: string): string | null => {
    const yearOfBirth = parseInt(dateOfBirth.slice(0, 4));

    const currentYear = new Date().getFullYear();

    if (yearOfBirth > currentYear || yearOfBirth.toString().length !== 4){
        return "Invalid date of birth: Year cannot be in the future.";
    }

    const age = currentYear - yearOfBirth;

    console.log("currentYear: ", currentYear);
    console.log("yearOfBirth: ", yearOfBirth);
    console.log("age: ", age);
    
    if (age < 10) {
        return "Invalid date of birth: Age must be greater than 10 years.";
    }

    return null;
};


export { isFullNameValid, validateEmail, isDateOfBirthValid };
