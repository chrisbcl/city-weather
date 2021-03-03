import { SortDirection, TableColumn, TableRow, useTable } from './hooks/useTable';

export interface Column<D> {
    title: string;
    key: keyof D;
    sortable?: boolean;
    visible?: boolean;
}

interface TableProps<D extends { [key: string]: any } = {}> {
    columns: Column<D>[];
    data: D[];
    idKey: keyof D;
}

const DIRECTIONS: SortDirection[] = [SortDirection.ASC, SortDirection.DESC, SortDirection.NONE];

const renderColumn = <D extends { [key: string]: any } = {}>(
    { title, key, sortable, sortDirection, visible }: TableColumn<D>,
    sortColumn: (columnKey: keyof D, sortDirection: SortDirection) => void
) => {
    if (visible === false) {
        return null;
    }

    let direction = '';

    if (sortDirection === SortDirection.ASC) {
        direction = 'ascending';
    } else if (sortDirection === SortDirection.DESC) {
        direction = 'descending';
    }

    const onColumnClick = () => {
        if (!sortable) {
            return;
        }

        const directionIndex = DIRECTIONS.findIndex((dir) => dir === sortDirection);
        const directionsLen = DIRECTIONS.length;
        const nextSortDirection = DIRECTIONS[(((directionIndex + 1) % directionsLen) + directionsLen) % directionsLen];

        sortColumn(key, nextSortDirection);
    };

    return (
        <th key={title} onClick={onColumnClick} className={sortable ? `sorted ${direction}` : ''}>
            {title}
        </th>
    );
};

const renderRow = <D extends { [key: string]: any } = {}>({ data, id }: TableRow<D>, columnKeys: (keyof D)[]) => (
    <tr key={id}>
        {columnKeys.map((key) => (
            <td data-label={data[key].label}>{data[key].value}</td>
        ))}
    </tr>
);

const Table = <D extends { [key: string]: any } = {}>({ data, columns: columnsProps, idKey }: TableProps<D>) => {
    const { columns, rows, sortColumn } = useTable(data, columnsProps, idKey);

    return (
        <table className='ui sortable selectable celled table'>
            <thead>
                <tr>{columns.map((column) => renderColumn(column, sortColumn))}</tr>
            </thead>
            <tbody>
                {rows.map((row) =>
                    renderRow(
                        row,
                        columns.filter(({ visible }) => visible !== false).map(({ key }) => key)
                    )
                )}
            </tbody>
        </table>
    );
};

export default Table;
