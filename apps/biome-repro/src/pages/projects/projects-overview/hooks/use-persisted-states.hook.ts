import { useLocalStorage } from 'usehooks-ts';

const config = {
  storageKeys: {
    searchPhrase: 'projects-overview-search-phrase',
    filterValues: 'projects-overview-filter-values',
    visibleColumns: 'projects-overview-visible-columns',
    pageSize: 'projects-overview-page-size',
    columnSorting: 'projects-overview-column-sorting',
  },
  defaultSearchPhrase: '',
  defaultFilterOptionsOrValues: {
    types: [],
    phases: [],
    status: [],
  },
  defaultColumnSorting: { field: '', sort: '' },
};

const columnNames = ['A', 'B', 'C'] as const;

/**
 * Provides the setter and getter for the persisted states of the
 * project overview.
 */
export const usePersistedStates = () => {
  const [searchPhrase, setSearchPhrase] = useLocalStorage<string>(
    config.storageKeys.searchPhrase,
    config.defaultSearchPhrase,
  );

  const [filterValues, setFilterValues] = useLocalStorage(
    config.storageKeys.filterValues,
    config.defaultFilterOptionsOrValues,
  );

  const [visibleColumns, setVisibleColumns] = useLocalStorage(
    config.storageKeys.visibleColumns,
    columnNames,
  );

  const [pageSize, setPageSize] = useLocalStorage<number>(
    config.storageKeys.pageSize,
    10,
  );

  const [columnSorting, setColumnSorting] = useLocalStorage(
    config.storageKeys.columnSorting,
    config.defaultColumnSorting,
  );

  return {
    searchPhrase,
    setSearchPhrase,
    filterValues,
    setFilterValues,
    visibleColumns,
    setVisibleColumns,
    pageSize,
    setPageSize,
    columnSorting,
    setColumnSorting,
  };
};
