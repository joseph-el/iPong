function validatePassword(password: string): boolean {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const isValidLength = password.length >= minLength && password.length <= maxLength;
    const hasValidChars = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password);

    return (
        isValidLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars &&
        hasValidChars
    );
}

export default validatePassword;
