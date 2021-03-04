import { Weather } from '../../../interfaces/weather';
import { useMemo } from 'react';
import Table, { Column } from '../../Table/Table';

interface WeatherTableViewProps {
    // Weather information list
    weatherList: Weather[];
}

/**
 * Weather Table View component that displays a table with the weather information.
 * @param weatherTableViewProps
 */
const WeatherTableView = ({ weatherList }: WeatherTableViewProps) => {
    const columns = useMemo<Column<Weather>[]>(
        () => [
            {
                key: 'id',
                title: '',
                visible: false
            },
            {
                key: 'city',
                title: 'City',
                sortable: true
            },
            {
                key: 'countryCode',
                title: 'Country',
                sortable: true
            },
            {
                key: 'temperature',
                title: 'Temperature °C',
                sortable: true
            },
            {
                key: 'sunrise',
                title: 'Sunrise',
                sortable: true
            },
            {
                key: 'sunset',
                title: 'Sunset',
                sortable: true
            }
        ],
        []
    );

    return (
        <div>
            <Table data={weatherList} columns={columns} idKey='id' />
        </div>
    );
};

export default WeatherTableView;
