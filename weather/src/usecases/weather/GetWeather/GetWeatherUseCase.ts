import { Weather, WeatherProvider } from '../../../providers/WeatherProvider';
import { GetWeatherDTO } from './GetWeatherDTO';

export class GetWeatherUseCase {
    constructor(private weatherProvider: WeatherProvider) {}

    async execute({ city, countryCode }: GetWeatherDTO): Promise<Weather> {
        const weather = await this.weatherProvider.getWeather(city, countryCode);
        return weather;
    }
}
