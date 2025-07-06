export const columns = [
  {
    field: 'A',
  },
];

/** A list of all columns names available. */
export const columnNames = ['A', 'B', 'C'];

/** Name of a column within the data table. */
export type ColumnName = (typeof columns)[number]['field'];
