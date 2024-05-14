function validatePassword(password: string): string | boolean {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const isValidLength = password.length >= minLength && password.length <= maxLength;
    const hasValidChars = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password);

    if (!isValidLength) {
        return "Password must be between " + minLength + " and " + maxLength + " characters long.";
    }
    if (!hasUpperCase) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumbers) {
        return "Password must contain at least one number.";
    }
    if (!hasSpecialChars) {
        return "Password must contain at least one special character.";
    }
    if (!hasValidChars) {
        return "Password contains invalid characters.";
    }

    return true;
}


export default validatePassword;
