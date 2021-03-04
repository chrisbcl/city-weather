import owmAPI, { OpenWeatherMapWeatherResponse } from '../../apis/openweathermap';
import { kelvinToCelsius, formatTime } from '../../utils/utils';
import { Weather, WeatherProvider } from '../WeatherProvider';

/**
 * Implementation of the Open Weather Map Provider
 */
export class OpenWeatherMapProvider implements WeatherProvider {
    async getWeather(city: string, countryCode?: string): Promise<Weather> {
        const query = `${city},${countryCode || ''}`;

        const { data } = await owmAPI.get<OpenWeatherMapWeatherResponse>('/weather', {
            params: {
                q: query
            }
        });

        return this.mapWeatherResponse(data);
    }

    private mapWeatherResponse({
        main: { temp },
        name: city,
        sys: { country: countryCode, sunrise: rSunrise, sunset: rSunset },
        timezone
    }: OpenWeatherMapWeatherResponse): Weather {
        // convert fahrenheit to celsius
        const temperature = kelvinToCelsius(temp);
        const sunrise = formatTime(rSunrise, timezone);
        const sunset = formatTime(rSunset, timezone);

        return {
            temperature,
            city,
            countryCode,
            sunrise,
            sunset
        };
    }
}
