import SearchBar from './components/SearchBar/SearchBar';
import WeatherView from './components/weather/WeatherView/WeatherView';
import { useWeather } from './hooks/useWeather';
import classes from './App.module.css';

/**
 * Application entry point
 */
const App = () => {
    const { weatherList, fetchWeather, resetWeatherList, isFetching, errorMessage } = useWeather();

    const onSearch = (input: string) => {
        const city = input.split(',')[0]?.trim();
        const countryCode = input.split(',')[1]?.trim();

        fetchWeather(city, countryCode);
    };

    return (
        <div className={classes.App}>
            <SearchBar
                onSearch={onSearch}
                placeholder='Format: <city>,<country code>'
                isLoading={isFetching}
                errorMessage={errorMessage}
            />
            <div className={classes.AppContent}>
                {weatherList.length !== 0 ? (
                    <button className='ui button secondary' onClick={() => resetWeatherList()}>
                        Reset Weather Searches
                    </button>
                ) : null}
                <WeatherView weatherList={weatherList} />
            </div>
        </div>
    );
};

export default App;
