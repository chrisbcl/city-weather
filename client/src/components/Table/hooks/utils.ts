import { Column } from '../Table';
import { TableColumn, TableRow, SortDirection, TableRowData } from './useTable';

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

export const toTableColumns = <D extends { [key: string]: any } = {}>(
    columns: Column<D>[]
): { [key in keyof D]: TableColumn<D> } =>
    columns.reduce((acc, column) => {
        acc[column.key] = { ...column, sortDirection: SortDirection.NONE };
        return acc;
    }, {} as { [key in keyof D]: TableColumn<D> });
