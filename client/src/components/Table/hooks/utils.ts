import { Column } from '../Table';
import { TableColumn, TableRow, SortDirection, TableRowData } from './useTable';

/**
 * Converts the data passed to the table to the table row format
 * @param data data values
 * @param columns column configuration
 * @param idKey id key
 */
export const toTableRows = <D extends { [key: string]: any } = {}>(
    data: D[],
    columns: { [key in keyof D]: TableColumn<D> },
    idKey: keyof D
): TableRow<D>[] => {
    return data.map((d) => ({
        id: d[idKey],
        data: Object.keys(d).reduce((acc, key) => {
            acc[columns[key].key] = {
                key,
                label: columns[key].title,
                value: d[key]
            };
            return acc;
        }, {} as { [key in keyof D]: TableRowData<D> })
    }));
};

/**
 * Converts the column configuration passed to the table to the table column format
 * @param columns column configuration
 */
export const toTableColumns = <D extends { [key: string]: any } = {}>(
    columns: Column<D>[]
): { [key in keyof D]: TableColumn<D> } =>
    columns.reduce((acc, column) => {
        acc[column.key] = { ...column, sortDirection: SortDirection.NONE };
        return acc;
    }, {} as { [key in keyof D]: TableColumn<D> });
