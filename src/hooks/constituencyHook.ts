import { getConstituenciesByCounty } from '@/api/constituency'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetconstituenciesByCounty = (county: string) => {
  return useQuery({
    queryKey: ['constituencies', county],
    queryFn: ({ queryKey }) => {
      const [_key, countyName] = queryKey
      return getConstituenciesByCounty(countyName)
    },
    enabled: !!county,
  })
}

import { useMutation } from '@tanstack/react-query';
import { createConstituencies } from '../api/constituency';

export const useCreateConstituencies = ()=> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { county_id: string; constituencies: string[] }) =>
      createConstituencies(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }

  });
};