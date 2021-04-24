import { UseQueryOptions } from 'react-query';

export const defaultQueryOptions = <T>(): UseQueryOptions<T, any, T> => ({
  refetchOnReconnect: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 10,
  staleTime: 1000 * 60 * 10,
});

export function mergeWithDefaultOptions<T = unknown>(
  options: UseQueryOptions<T, any, T> = {}
) {
  return {
    ...defaultQueryOptions<T>(),
    ...options,
  };
}
