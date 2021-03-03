import { WeatherResponse } from '../apis/weather';
import { Weather } from '../interfaces/weather';

export const mapWeatherResponse = (weather: WeatherResponse): Weather => ({
    ...weather,
    id: `${weather.city}/${weather.countryCode}`
});
