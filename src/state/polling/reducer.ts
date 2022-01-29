import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => 'pokemon/bulbasaur',
    }),
    getPokemonById: builder.query({
      // eslint-disable-next-line no-console
      query: (name: string) => `/${name}`,
    }),
  }),
});

const initState: any = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assetCheckReducer(state = initState, action: any) {
  const { data } = action;
  // eslint-disable-next-line no-console
  console.log(action);
  if (action.type == 'WAIT_ON_DATA') {
    // eslint-disable-next-line no-console
    console.log(state);
    return [...state, data];
  }

  return state;
}

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetPokemonByIdQuery } = pokemonApi;
export default assetCheckReducer;
