const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERR: 500,
};

const ERR_MESSAGES = {
    [STATUS_CODES.SERVER_ERR]: 'Internal server error',
};

module.exports = {
    STATUS_CODES,
    ERR_MESSAGES,
};