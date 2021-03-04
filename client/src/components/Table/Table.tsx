import { SortDirection, TableColumn, TableRow, useTable } from './hooks/useTable';

export interface Column<D> {
    // Title of the column
    title: string;
    // key of the column associated with the data
    key: keyof D;
    // Indicates if the column is sortable
    sortable?: boolean;
    // Indicates if the column is visible
    visible?: boolean;
}

interface TableProps<D extends { [key: string]: any } = {}> {
    /** Columns of the table */
    columns: Column<D>[];
    /** Data values of the table */
    data: D[];
    /** ID key to be used to uniquely identify each row */
    idKey: keyof D;
}

const DIRECTIONS: SortDirection[] = [SortDirection.ASC, SortDirection.DESC, SortDirection.NONE];

/**
 * Render the th element representing a table column. It changes the sort direction with each click
 * on the column header.
 * @param tableColumn
 * @param sortColumn sort function to be called when the user clicks on a sortable column header
 */
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

/**
 * Renders the tr element representing a table row.
 * @param tableRow
 * @param columnKeys
 */
const renderRow = <D extends { [key: string]: any } = {}>({ data, id }: TableRow<D>, columnKeys: (keyof D)[]) => (
    <tr key={id}>
        {columnKeys.map((key) => (
            <td data-label={data[key].label}>{data[key].value}</td>
        ))}
    </tr>
);

/**
 * Table component
 * @param tableProps
 */
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
