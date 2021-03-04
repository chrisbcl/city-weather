import { Weather, WeatherProvider } from '../../../providers/WeatherProvider';
import { GetWeatherDTO } from './GetWeatherDTO';

/**
 * Get weather use case implementation
 */
export class GetWeatherUseCase {
    constructor(private weatherProvider: WeatherProvider) {}

    async execute({ city, countryCode }: GetWeatherDTO): Promise<Weather> {
        const weather = await this.weatherProvider.getWeather(city, countryCode);
        return weather;
    }
}
