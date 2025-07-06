import { useQuery } from '@tanstack/react-query';

/** Fetches a list of projects for the current user. */
export const useBaseData = () => {
  const { data: baseData, ...rest } = useQuery({
    queryKey: ['projects', 'base-data'],
    queryFn: async () => ({}),
  });

  return {
    baseData,
    ...rest,
  };
};
