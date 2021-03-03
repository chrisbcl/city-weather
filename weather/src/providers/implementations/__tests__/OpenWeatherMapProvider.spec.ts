import { OpenWeatherMapProvider } from '../OpenWeatherMapProvider';
import { formatTime, kelvinToCelsius } from '../../../utils/utils';

jest.mock('../../../apis/openweathermap', () => ({
    get: jest.fn().mockResolvedValue({
        data: {
            main: {
                temp: 286
            },
            name: 'Barcelos',
            timezone: -25200,
            sys: {
                country: 'PT',
                sunrise: 1614582554,
                sunset: 1614623080
            }
        }
    })
}));

describe('OpenWeatherMapProvider', () => {
    it('given a response from the API, returns a Weather Object with the correct format', async () => {
        const owmProvider = new OpenWeatherMapProvider();

        const result = await owmProvider.getWeather('Barcelos', 'PT');

        expect(result.city).toBe('Barcelos');
        expect(result.countryCode).toBe('PT');
        expect(result.temperature).toBe(kelvinToCelsius(286));
        expect(result.sunrise).toBe(formatTime(1614582554, -25200));
        expect(result.sunset).toBe(formatTime(1614623080, -25200));
    });
});
