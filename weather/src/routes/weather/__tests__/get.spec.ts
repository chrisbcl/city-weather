import request from 'supertest';
import { app } from '../../../app';

jest.mock('../../../usecases/weather/GetWeather');

describe('get weather route', () => {
    it('returns the weather response', async () => {
        const city = 'Barcelos';

        const response = await request(app).get('/api/weather').query({ city }).send().expect(200);

        expect(response.body.city).toEqual(city);
        expect(response.body.countryCode).toEqual('PT');
        expect(response.body.sunrise).toEqual('07:17');
        expect(response.body.sunset).toEqual('18:29');
        expect(response.body.temperature).toEqual(17.5);
    });
});
