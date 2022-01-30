import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://9e8b-2603-7000-4500-8400-f84d-3e27-adfe-7776.ngrok.io/status?',
  }),
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: (params: string[]) => ({
        url: `address=${params[0]}&hash=${params[2]}&assetId=${params[1]}`,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

const initState: any = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assetCheckReducer(state = initState, action: any) {
  const { data } = action;
  if (action.type == 'WAIT_ON_DATA') {
    return [...state, data];
  }

  return state;
}

// Export hooks for usage in functional components
export const { useGetStatusQuery } = statusApi;
export default assetCheckReducer;
