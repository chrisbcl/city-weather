import { WeatherProvider, Weather } from '../../../../providers/WeatherProvider';
import { GetWeatherController } from '../GetWeatherController';
import { GetWeatherUseCase } from '../GetWeatherUseCase';

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

const requestMock: any = {
    params: {
        city: 'Barcelos',
        countryCode: 'PT'
    }
};

const responseMock: any = {
    send: jest.fn()
};

describe('GetWeatherController', () => {
    it('throws a bad request error if the query parameters are invalid', async () => {
        const useCase = new GetWeatherUseCase(WeatherProviderMockError);
        const controller = new GetWeatherController(useCase);

        try {
            await controller.handle(requestMock, responseMock);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe('test error message');
        }
    });

    it('sends the correct weather information in the response', async () => {
        const useCase = new GetWeatherUseCase(WeatherProviderMockSuccess);
        const controller = new GetWeatherController(useCase);

        await controller.handle(requestMock, responseMock);

        expect(responseMock.send as jest.Mock).toBeCalledTimes(1);
        expect((responseMock.send as jest.Mock).mock.calls[0][0].city).toBe('Barcelos');
        expect((responseMock.send as jest.Mock).mock.calls[0][0].temperature).toBe(17.5);
        expect((responseMock.send as jest.Mock).mock.calls[0][0].sunrise).toBe('07:17');
        expect((responseMock.send as jest.Mock).mock.calls[0][0].sunset).toBe('18:29');
        expect((responseMock.send as jest.Mock).mock.calls[0][0].countryCode).toBe('PT');
    });
});
