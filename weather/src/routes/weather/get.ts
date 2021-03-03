import express from 'express';
import { getWeatherController } from '../../usecases/weather/GetWeather';

interface GetWeatherParams {
    city: string;
    countryCode: string;
}

const router = express.Router();

router.get<{}, any, any, GetWeatherParams>('/api/weather', async (req, res) => {
    return getWeatherController.handle(req, res);
});

export { router as getWeatherRouter };
