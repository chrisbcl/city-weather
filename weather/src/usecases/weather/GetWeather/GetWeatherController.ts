import { Request, Response } from 'express';
import { BadRequestError } from '../../../errors/BadRequestError';
import { GetWeatherUseCase } from './GetWeatherUseCase';

interface GetWeatherRequestQueryParams {
    city: string;
    countryCode: string;
}

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
