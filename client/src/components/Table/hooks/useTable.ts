import { useEffect, useMemo, useRef, useState } from 'react';
import { Column } from '../Table';
import { toTableColumns, toTableRows } from './utils';

export interface TableRowData<D extends { [key: string]: any } = {}> {
    label: string;
    key: keyof D;
    value: any;
}

export interface TableRow<D extends { [key: string]: any } = {}> {
    id: any;
    data: { [key in keyof D]: TableRowData<D> };
}

export interface TableColumn<D extends { [key: string]: any } = {}> {
    title: string;
    key: keyof D;
    visible?: boolean;
    sortable?: boolean;
    sortDirection: SortDirection;
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
    NONE = 'NONE'
}

export const useTable = <D extends { [key: string]: any } = {}>(data: D[], columns: Column<D>[], idKey: keyof D) => {
    const initialTableColumns = useMemo(() => toTableColumns(columns), [columns]);
    const [tableColumns, setTableColumns] = useState<{ [key in keyof D]: TableColumn<D> }>(initialTableColumns);
    const [tableRows, setTableRows] = useState<TableRow<D>[]>(toTableRows(data, initialTableColumns, idKey));
    const currentSortedColumn = useRef<keyof D>();

    useEffect(() => {
        setTableRows(toTableRows(data, initialTableColumns, idKey));
    }, [data, idKey, initialTableColumns]);

    const sortFunction = (columnKey: keyof D, direction: SortDirection) => {
        return (a: D, b: D) => {
            const value1 = a[columnKey];
            const value2 = b[columnKey];

            if (!Number.isNaN(Number(value1)) && !Number.isNaN(Number(value2))) {
                const valueNumber1 = Number(value1);
                const valueNumber2 = Number(value2);
                return direction === SortDirection.ASC ? valueNumber1 - valueNumber2 : valueNumber2 - valueNumber1;
            }

            if (String(a[columnKey]).toLowerCase() < String(b[columnKey]).toLowerCase()) {
                return direction === SortDirection.ASC ? -1 : 1;
            }

            if (String(a[columnKey]).toLowerCase() > String(b[columnKey]).toLowerCase()) {
                return direction === SortDirection.ASC ? 1 : -1;
            }
            return 0;
        };
    };

    const sortColumn = (columnKey: keyof D, sortDirection: SortDirection) => {
        setTableColumns((prev) => {
            const newState = { ...prev };

            // set previous sorted column with no sorting direction
            if (currentSortedColumn.current) {
                newState[currentSortedColumn.current].sortDirection = SortDirection.NONE;
            }

            newState[columnKey].sortDirection = sortDirection;

            currentSortedColumn.current = columnKey;

            return newState;
        });

        if (sortDirection === SortDirection.NONE) {
            setTableRows(toTableRows(data, initialTableColumns, idKey));
            return;
        }

        const sortData = [...data];

        sortData.sort(sortFunction(columnKey, sortDirection));

        setTableRows(toTableRows(sortData, initialTableColumns, idKey));
    };

    return {
        rows: tableRows,
        columns: Object.values(tableColumns),
        sortColumn
    };
};
