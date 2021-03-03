import { useState } from 'react';
import weatherAPI, { WeatherResponse } from '../apis/weather';
import { Weather } from '../interfaces/weather';
import { mapWeatherResponse } from '../utils/utils';

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
