export const normalizePort = (val) => {
    const PORT = parseInt(val, 10);
    if (isNaN(PORT)) return val;
    if (PORT >= 0) return PORT;
    return false;
};

export const STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400
};

export const APP_CONST = {
    MESSAGE_BY_HUMAN: 'User',
    MESSAGE_BY_BOT: 'Bot',
};