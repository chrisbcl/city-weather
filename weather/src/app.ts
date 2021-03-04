import express from 'express';
import cors from 'cors';
import fs from 'fs';
import morgan from 'morgan';
import 'express-async-errors';
import { NotFoundError } from './errors/NotFoundError';
import { errorHandler } from './middlewares/error-handler';
import { getWeatherRouter } from './routes/weather/get';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream('/log/server-logs/access.log', { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(getWeatherRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
