import { useQuery, useMutation, QueryClient } from 'react-query';
import { authApiClient } from '../services/apiService';
import { mergeWithDefaultOptions } from '../util/queryUtil';

type NewMatchResponse = {
  match: {
    id: number;
    switchOneId: number;
    switchTwoId: number;
    completedDate?: string;
    switchOneWin?: boolean;
    uid: string;
  };
};

type MatchResultRequest = {
  switchOneWin: boolean;
};

async function getMatch() {
  const response = await authApiClient.get<NewMatchResponse>('/matches/new');
  return response.data.match;
}

async function postMatchResult(
  uid: string | undefined,
  matchId: number | undefined,
  requestData: MatchResultRequest
) {
  if (!uid || !matchId) return null;
  const response = await authApiClient.post(
    `/matches/${uid}/${matchId}`,
    requestData
  );
  return response.data;
}

export function useMatch() {
  return useQuery('match', getMatch, mergeWithDefaultOptions());
}

export function usePostMatchResult(
  uid: string | undefined,
  matchId: number | undefined,
  queryClient: QueryClient
) {
  return useMutation(
    (requestData: MatchResultRequest) =>
      postMatchResult(uid, matchId, requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('match');
        queryClient.invalidateQueries('switch');
        queryClient.invalidateQueries('all-switches');
      },
    }
  );
}
