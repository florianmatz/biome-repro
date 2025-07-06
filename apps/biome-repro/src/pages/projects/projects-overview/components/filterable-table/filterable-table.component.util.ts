/**
 * Generates the filter options for the filterbar within the project list out
 * of the given base data.
 */
export const generateFilterOptions = (_baseData: unknown) => ({}) as any;

export const filterProjects = ({
  projects,
}: {
  projects?: any[];
  filterValues: any;
}) => projects?.filter((p) => p);

interface AddFavoriteStatusToProjectParams {
  /** The list of projects to maybe add the favorite status. */
  projects?: any[];

  /** A list of ids of the favorite projects. */
  favoriteProjectIds?: any[];

  /** Flag to indicate if the retrieval of the favorites is pending. */
  isPendingFavoriteProjects?: any;
}

export const addFavoriteStatusToProjects = ({
  projects,
  favoriteProjectIds,
  isPendingFavoriteProjects: isPendingFavorites,
}: AddFavoriteStatusToProjectParams) =>
  projects?.map((project) => ({
    ...project,
    isFavorite: isPendingFavorites
      ? 'isPending'
      : favoriteProjectIds?.includes(project.id),
  }));
