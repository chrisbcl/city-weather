import { Weather } from '../../../interfaces/weather';
import { useMemo } from 'react';
import Table, { Column } from '../../Table/Table';

interface WeatherTableViewProps {
    weatherList: Weather[];
}

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
                title: 'Temperature',
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
