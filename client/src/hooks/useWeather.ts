import { useState } from 'react';
import weatherAPI, { WeatherResponse } from '../apis/weather';
import { Weather } from '../interfaces/weather';
import { mapWeatherResponse } from '../utils/utils';

/**
 * Hook that fetches the weather information by city and country code.
 * Makes available:
 *  - weatherList: the weather list state variable
 *  - fetchWeather: function to fetch the weather information
 *  - resetWeatherList: resets the weather list.
 *  - isFetching: state variable that represents the fetching status
 *  - errorMessage: the error message if any is returned
 */
export const useWeather = () => {
    const [weatherList, setWeatherList] = useState<Weather[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const addWeatherToList = (weather: Weather) => {
        setWeatherList((prev) => [...prev, weather]);
    };

    const fetchWeather = async (city: string, countryCode?: string): Promise<void> => {
        setIsFetching(true);

        try {
            const { data } = await weatherAPI.get<WeatherResponse>('/api/weather', { params: { city, countryCode } });
            const weather = mapWeatherResponse(data);

            addWeatherToList(weather);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.response?.data?.error?.message || error.message);
        }
        setIsFetching(false);
    };

    const resetWeatherList = () => {
        setWeatherList([]);
        setErrorMessage(null);
    };

    return {
        weatherList,
        fetchWeather,
        resetWeatherList,
        isFetching,
        errorMessage
    };
};
