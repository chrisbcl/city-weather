import axios from 'axios';

export interface WeatherErrorResponse {
    message: string;
}

export interface WeatherResponse {
    city: string;
    countryCode: string;
    temperature: number;
    sunrise: string;
    sunset: string;
}

export default axios.create({
    baseURL: window._env_.WEATHER_API_URL
});
