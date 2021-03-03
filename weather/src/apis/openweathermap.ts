import axios from 'axios';

export interface OpenWeatherMapWeatherResponse {
    main: {
        temp: number; // temperature in fahrenheit
    };
    sys: {
        country: string; // country code
        sunrise: number; // date in seconds
        sunset: number; //date in seconds
    };
    name: string; // city name
    timezone: number; // offset in seconds
}

export default axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: process.env.OWM_API_KEY
    }
});
