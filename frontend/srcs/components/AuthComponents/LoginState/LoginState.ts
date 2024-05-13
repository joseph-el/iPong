export enum LoginState {
    UNK = 0,
    INVALID_PASSWORD = (1 << 0),
    INVALID_EMAIL = (1 << 1),
    LOGIN_SUCCESS = (1 << 2),

    INVALID_NAME = (1 << 3),
    INVALID_NAME_FORMAT = (1 << 10),

    INVALID_EMAIL_FORMAT = (1 << 4),
    INVALID_EMAIL_EXISTS = (1 << 5),
    
    INVALID_PASSWORD_FORMAT = (1 << 6),

    INVALID_DATE = (1 << 7),
    INVALID_DATE_RANGE = (1 << 8),
}
