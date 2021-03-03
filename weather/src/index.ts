import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

import { app } from './app';

const port = process.env.PORT || 3001;

if (!process.env.OWM_API_KEY) {
    throw new Error('OWM_API_KEY must be defined');
}

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
