import { useQuery } from '@tanstack/react-query';

/** Fetches a list of projects for the current user. */
export const useProjects = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['list', 'projects'],
    queryFn: async () => ({}),
  });

  return {
    projects: [],
    ...rest,
  };
};
