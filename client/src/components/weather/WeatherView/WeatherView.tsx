import { Weather } from '../../../interfaces/weather';
import WeatherGraphView from '../WeatherGraphView/WeatherGraphView';
import WeatherTableView from '../WeatherTableView/WeatherTableView';
import classes from './WeatherView.module.css';

interface WeatherViewProps {
    // Weather information list
    weatherList: Weather[];
}

/**
 * Weather View component that displays the available views to displays the weather
 * information.
 * @param weatherViewProps
 */
const WeatherView = ({ weatherList }: WeatherViewProps) => {
    const AddData = () => (
        <div className={classes.AddData}>
            <h2>Search some cities</h2>
        </div>
    );

    return (
        <div className={classes.WeatherView}>
            {weatherList.length === 0 ? (
                <AddData />
            ) : (
                <>
                    <WeatherGraphView weatherList={weatherList} />
                    <WeatherTableView weatherList={weatherList} />
                </>
            )}
        </div>
    );
};

export default WeatherView;
