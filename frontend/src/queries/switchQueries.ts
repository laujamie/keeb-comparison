import { useQuery, useMutation, QueryClient } from 'react-query';
import { authApiClient, apiClient } from '../services/apiService';
import { mergeWithDefaultOptions } from '../util/queryUtil';

export type FullSwitch = {
  description: string;
  elo: number;
  id: number;
  isVerified: boolean;
  numMatches: number;
  type: string;
  name: string;
};

type SwitchResponse = {
  switchRes: FullSwitch;
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
  const response = await authApiClient.get<SwitchesResponse>(
    '/switches/pending'
  );
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
    onSettled: () => {
      queryClient.invalidateQueries('all-switches');
      queryClient.invalidateQueries('pending-switches');
    },
  });
}

export async function postApproveSwitch(switchId: string | number) {
  const response = await authApiClient.post(`/switches/${switchId}/verify`, {
    isVerified: true,
  });
  return response.data;
}

export function usePostApproveSwitch(queryClient: QueryClient) {
  return useMutation(
    (switchId: string | number) => postApproveSwitch(switchId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-switches');
        queryClient.invalidateQueries('pending-switches');
      },
    }
  );
}

export async function deleteSwitch(switchId: string | number) {
  const response = await authApiClient.delete(`/switches/${switchId}`);
  return response.data;
}

export function useDeleteSwitch(queryClient: QueryClient) {
  return useMutation((switchId: string | number) => deleteSwitch(switchId), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('all-switches');
      queryClient.invalidateQueries('pending-switches');
      queryClient.invalidateQueries(['switch', variables]);
    },
  });
}
