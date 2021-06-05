import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import { Order, HeadCell } from '../../types/tables';
import SortHeader from '../SortHeader';
import { getComparator, stableSort } from '../../util/arrayUtil';

type SortTableProps<T extends { [name: string]: number | string }> = {
  headCells: HeadCell<T>[];
  data: T[];
  defaultOrder: keyof T;
  tableLabel: string;
  tableCellClassName?: string;
};

const SortTable = <T extends { [name: string]: number | string }>({
  headCells,
  data,
  defaultOrder,
  tableLabel,
  tableCellClassName,
}: SortTableProps<T>) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrder);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table>
          <SortHeader
            onRequestSort={handleRequestSort}
            orderBy={orderBy}
            order={order}
            data={headCells}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row, i) => (
                <TableRow key={`${tableLabel}-row-${i}`}>
                  {Object.keys(row).map((key, idx) => {
                    if (!headCells.some((cell: HeadCell<T>) => cell.id === key))
                      return null;
                    const cell: HeadCell<T> | undefined = headCells.find(
                      (headCell: HeadCell<T>) => headCell.id === key
                    );
                    if (!cell) return null;
                    return (
                      <TableCell
                        key={`${row.name}-${key}`}
                        align={cell.numeric ? 'right' : 'left'}
                        padding={cell.disablePadding ? 'none' : 'default'}
                        className={tableCellClassName}
                      >
                        {row[key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell
                  colSpan={headCells.length}
                  className={tableCellClassName}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SortTable;
