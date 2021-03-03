export interface Weather {
    // city name
    city: string;
    // country code
    countryCode: string;
    // temperature in celsius
    temperature: number;
    // sunrise time in 24h format (example: 08:12)
    sunrise: string;
    // sunset time in 24h format (example: 18:29)
    sunset: string;
}

export interface WeatherProvider {
    getWeather(city: string, countryCode?: string): Promise<Weather>;
}
