import { useQuery, useMutation, QueryClient } from 'react-query';
import { authApiClient, apiClient } from '../services/apiService';
import { mergeWithDefaultOptions } from '../util/queryUtil';

type SwitchResponse = {
  switchRes: {
    description: string;
    elo: number;
    id: number;
    isVerified: boolean;
    numMatches: number;
    type: string;
    name: string;
  };
};

type NewSwitchRequest = {
  name: string;
  description: string;
  type: string;
};

export interface Switch {
  name: string;
  type: string;
  elo: number;
  numMatches: number;
  [name: string]: string | number;
}

type SwitchesResponse = {
  switches: Switch[];
};

export async function getSwitch(id: number | undefined) {
  if (!id) return null;
  const response = await apiClient.get<SwitchResponse>(`/switches/${id}`);
  return response.data.switchRes;
}

export function useSwitch(id: number | undefined) {
  return useQuery(
    ['switch', { switchId: id }],
    () => getSwitch(id),
    mergeWithDefaultOptions({
      enabled: !!id,
    })
  );
}

export async function getSwitches() {
  const response = await apiClient.get<SwitchesResponse>('/switches');
  return response.data.switches;
}

export async function getPendingSwitches() {
  const response = await apiClient.get<SwitchesResponse>('/switches/pending');
  return response.data.switches;
}

export function useSwitches() {
  return useQuery('all-switches', getSwitches, mergeWithDefaultOptions());
}

export function usePendingSwitches() {
  return useQuery(
    'pending-switches',
    getPendingSwitches,
    mergeWithDefaultOptions()
  );
}

export async function postNewSwitch(req: NewSwitchRequest) {
  const response = await authApiClient.post('/switches/new', req);
  return response.data;
}

export function usePostNewSwitch(queryClient: QueryClient) {
  return useMutation((req: NewSwitchRequest) => postNewSwitch(req), {
    onSuccess: () => {
      queryClient.invalidateQueries('all-switches');
    },
  });
}
