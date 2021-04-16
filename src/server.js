import mongoose from 'mongoose';
import server from './app';
import { normalizePort } from './utils';

const PORT = normalizePort(process.env.PORT || '3002');
server.listen(PORT, () => {
    console.log(`Application is running on ${process.env.NODE_ENV} at PORT# ${PORT}`);
});
