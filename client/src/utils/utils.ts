import { WeatherResponse } from '../apis/weather';
import { Weather } from '../interfaces/weather';

/**
 * Maps the Weather API response to the Weather interface
 * @param weather weather response from the API
 */
export const mapWeatherResponse = (weather: WeatherResponse): Weather => ({
    ...weather,
    id: `${weather.city}/${weather.countryCode}`
});
