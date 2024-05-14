function validateUsername(username: string): string | boolean {
    const minLength = 3;
    const maxLength = 20;
    const validCharsRegex = /^[a-zA-Z0-9_]+$/;

    const isValidLength = username.length >= minLength && username.length <= maxLength;
    const hasValidChars = validCharsRegex.test(username);

    if (!isValidLength) {
        return "Username must be between " + minLength + " and " + maxLength + " characters long.";
    }
    if (!hasValidChars) {
        return "Username can only contain letters, numbers, and underscores.";
    }

    return true;
}

export default validateUsername;