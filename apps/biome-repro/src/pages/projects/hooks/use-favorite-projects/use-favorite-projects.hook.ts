import { useQuery } from '@tanstack/react-query';

/** Fetches a list of projects for the current user. */
export const useFavoriteProjects = () => {
  const { data: favoriteProjectIds, ...rest } = useQuery({
    queryKey: ['list', 'favorite-projects'],
    queryFn: async () => ({}),
  });

  return {
    favoriteProjectIds: [],
    ...rest,
  };
};
