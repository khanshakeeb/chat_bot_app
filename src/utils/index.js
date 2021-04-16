export const normalizePort = (val) => {
    const PORT = parseInt(val, 10);
    if (isNaN(PORT)) return val;
    if (PORT >= 0) return PORT;
    return false;
};