import api from '../api/posts'

async function validateUsername(username: string) {
    const minLength = 3;
    const maxLength = 20;
    const validCharsRegex = /^[a-zA-Z-0-9_]+$/;

    const isValidLength = username.length >= minLength && username.length <= maxLength;
    const hasValidChars = validCharsRegex.test(username);

    if (!isValidLength) {
        return "Username must be between " + minLength + " and " + maxLength + " characters long.";
    }
    if (!hasValidChars) {
        return "Username can only contain letters, numbers, and underscores.";
    }

    try {
        await api.post('/auth/checkusername', { username: username });
          return null;
    } catch (error) {
           return "Username is already taken. Please choose another.";
    }
}

export default validateUsername;