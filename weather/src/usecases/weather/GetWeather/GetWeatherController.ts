import { Request, Response } from 'express';
import { BadRequestError } from '../../../errors/BadRequestError';
import { GetWeatherUseCase } from './GetWeatherUseCase';

interface GetWeatherRequestQueryParams {
    // city name
    city: string;
    // country code
    countryCode: string;
}

/**
 * Controller for the get weather route
 */
export class GetWeatherController {
    constructor(private getWeatherUseCase: GetWeatherUseCase) {}

    async handle(request: Request<{}, any, any, GetWeatherRequestQueryParams>, response: Response): Promise<Response> {
        const { city, countryCode } = request.query;

        try {
            const weather = await this.getWeatherUseCase.execute({ city, countryCode });
            return response.send(weather);
        } catch (error) {
            throw new BadRequestError('City not found');
        }
    }
}
