import { Weather } from '../../../interfaces/weather';
import { useMemo } from 'react';
import { Bar, ChartData } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import classes from './WeatherGraphView.module.css';

interface WeatherGraphViewProps {
    weatherList: Weather[];
}

const options: ChartOptions = {
    legend: { display: true },
    tooltips: { enabled: true },
    scales: {
        yAxes: [
            {
                display: true,
                ticks: {
                    stepSize: 5
                }
            }
        ]
    },
    elements: {
        rectangle: {
            backgroundColor: '#0F58D6',
            borderColor: '#003366',
            borderWidth: 2
        }
    }
};

const WeatherGraphView = ({ weatherList }: WeatherGraphViewProps) => {
    const cities = useMemo(() => weatherList.map(({ city, countryCode }) => `${city}, ${countryCode}`), [weatherList]);
    const temperatures = useMemo(() => weatherList.map(({ temperature }) => temperature), [weatherList]);

    const weatherData: ChartData<Chart.ChartData> = {
        labels: cities,
        datasets: [
            {
                label: 'Temperature',
                data: temperatures,
                maxBarThickness: 30,
                minBarLength: 20
            }
        ]
    };

    return (
        <div className={classes.WeatherGraphView}>
            <Bar data={weatherData} options={options} />
        </div>
    );
};

export default WeatherGraphView;
