import { Divider, Paper, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useBaseData } from '../../../hooks/use-base-data/use-base-data.hook';
import { useFavoriteProjects } from '../../../hooks/use-favorite-projects/use-favorite-projects.hook';
import { useProjects } from '../../../hooks/use-projects/use-projects.hook';
import { usePersistedStates } from '../../hooks/use-persisted-states.hook';
import type { FilterValuesOrOptions } from '../../models/filter.model';
import { DataTable } from '../data-table/data-table.component';
import { columnNames } from '../data-table/data-table.component.config';
import { DataToolbar } from '../data-toolbar/data-toolbar.component';
import { NoProjectsMessage } from '../no-projects-message/no-projects-message.component';
import {
  addFavoriteStatusToProjects,
  filterProjects,
  generateFilterOptions,
} from './filterable-table.component.util';

/** Provides a filterable table within the project overview. */
export const FilterableTable = () => {
  const {
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
  } = usePersistedStates();

  const {
    projects,
    isPending: isPendingProjects,
    error: errorProjects,
    refetch: refetchProjects,
  } = useProjects();

  const { favoriteProjectIds, isPending: isPendingFavoriteProjects } =
    useFavoriteProjects();

  const {
    baseData,
    isPending: isPendingBaseData,
    error: errorBaseData,
    refetch: refetchBaseData,
  } = useBaseData();

  const projectsWithFavorites = useMemo(
    () =>
      addFavoriteStatusToProjects({
        projects,
        favoriteProjectIds,
        isPendingFavoriteProjects,
      }),
    [favoriteProjectIds, projects, isPendingFavoriteProjects],
  );

  const filterOptions = useMemo(
    () => generateFilterOptions(baseData),
    [baseData],
  );

  const filteredProjects = useMemo(
    () =>
      filterProjects({
        projects: projectsWithFavorites,
        filterValues,
      }),
    [projectsWithFavorites, filterValues],
  );

  return (
    <Paper component={Stack} padding={3} gap={3}>
      <DataToolbar
        isLoadingStateShown={isPendingBaseData}
        error={errorBaseData}
        onRetryLoadFilterOptions={() => refetchBaseData()}
        searchPhrase={searchPhrase}
        onSearchPhraseChange={(searchPhrase: any) => {
          setSearchPhrase(searchPhrase);
        }}
        filterOptions={filterOptions}
        filterValues={filterValues}
        onFilterValuesChange={(value: Partial<FilterValuesOrOptions>) => {
          setFilterValues((prev) => ({ ...prev, ...value }));
        }}
        visibleColumnOptions={columnNames}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={setVisibleColumns}
      />

      <Divider
        sx={{
          marginLeft: -3,
          width: ({ spacing }) => `calc(100% + ${spacing(6)})`,
        }}
      />

      {projects?.length === 0 ? (
        <NoProjectsMessage />
      ) : (
        <DataTable
          error={errorProjects}
          isLoadingStateShown={isPendingProjects}
          columnSorting={columnSorting}
          onColumnSortingChange={setColumnSorting}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onRetryLoadProjectList={refetchProjects}
          projects={baseData ? filteredProjects : projectsWithFavorites}
          searchPhrase={searchPhrase}
          visibleColumns={visibleColumns}
        />
      )}
    </Paper>
  );
};
