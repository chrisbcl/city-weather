import { WeatherProvider, Weather } from '../../../../providers/WeatherProvider';
import { GetWeatherController } from '../GetWeatherController';
import { GetWeatherUseCase } from '../GetWeatherUseCase';

const WeatherProviderMock: WeatherProvider = {
    getWeather: jest.fn<Promise<Weather>, any[]>().mockResolvedValue({
        city: 'Barcelos',
        countryCode: 'PT',
        sunrise: '07:17',
        sunset: '18:29',
        temperature: 17.5
    })
};
const getWeatherUseCase = new GetWeatherUseCase(WeatherProviderMock);

const getWeatherController = new GetWeatherController(getWeatherUseCase);

export { getWeatherController };
