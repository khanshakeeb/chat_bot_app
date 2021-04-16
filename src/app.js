import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('combined'));
app.use(cors());
routes(app);

export default app;

/**
 * {
    "botId": "5f74865056d7bb000fcd39ff",
    "message": "Payment options",
    "conversationId": "60742d187d80d3902bf72253"
}
 */