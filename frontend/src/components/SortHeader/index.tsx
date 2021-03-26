import React from 'react';
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Order, HeadCell } from '../../types/tables';

type SortHeaderProps<T extends { [name: string]: number | string }> = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  data: HeadCell<T>[];
  orderBy: keyof T;
  order: Order;
};

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const SortHeader = <T extends { [name: string]: string | number }>({
  onRequestSort,
  data,
  orderBy,
  order,
}: SortHeaderProps<T>) => {
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {data.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SortHeader;
