import { GetWeatherUseCase } from '../GetWeatherUseCase';
import { Weather, WeatherProvider } from '../../../../providers/WeatherProvider';

const WeatherProviderMockSuccess: WeatherProvider = {
    getWeather: jest.fn<Promise<Weather>, any[]>().mockResolvedValue({
        city: 'Barcelos',
        countryCode: 'PT',
        sunrise: '07:17',
        sunset: '18:29',
        temperature: 17.5
    })
};

const WeatherProviderMockError: WeatherProvider = {
    getWeather: jest.fn<Promise<Weather>, any[]>().mockRejectedValue(new Error('test error message'))
};

describe('GetWeatherUseCase', () => {
    it('returns a Weather Object with the correct information when API request is successful', async () => {
        const getWeatherUseCase = new GetWeatherUseCase(WeatherProviderMockSuccess);
        const result = await getWeatherUseCase.execute({ city: 'Barcelos', countryCode: 'PT' });

        expect(result.city).toBe('Barcelos');
        expect(result.countryCode).toBe('PT');
        expect(result.sunrise).toBe('07:17');
        expect(result.sunset).toBe('18:29');
        expect(result.temperature).toBe(17.5);
    });

    it('throws an error if the API request fails', async () => {
        const getWeatherUseCase = new GetWeatherUseCase(WeatherProviderMockError);

        try {
            await getWeatherUseCase.execute({ city: 'Barcelos', countryCode: 'PT' });
        } catch (error) {
            expect(error.message).toBe('test error message');
        }
    });
});
