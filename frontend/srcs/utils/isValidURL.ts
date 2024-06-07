function isValidLinkedInURL(url: string): boolean {
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    return linkedInRegex.test(url);
}

function isValidGitHubURL(url: string): boolean {
    const gitHubRegex = /^https:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?$/;
    return gitHubRegex.test(url);
}


export function isValidURL(url: string, type): boolean {
    if (type === "linkedin") {
        return isValidLinkedInURL(url);
    } else if (type === "github") {
        return isValidGitHubURL(url);
    }
    return false;
}