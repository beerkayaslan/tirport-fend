import { generalApiService } from '@/store/api/general/service';
import { CityRequest, CityResponse, CountryRequest, CountryResponse } from '@/types/general/type';

const api = generalApiService.injectEndpoints({
  endpoints: (build) => ({
    contryGet: build.query<CountryResponse, CountryRequest>({
      query: ({ take, skip }) => ({
        method: 'GET',
        url: `/localization/country?take=${take}&skip=${skip}`
      })
    }),
    cityGet: build.query<CityResponse, CityRequest>({
      query: ({ country, take, skip }) => ({
        method: 'GET',
        url: `/localization/country/${country}/cities?take=${take}&skip=${skip}`
      })
    })
  })
});

export const { useContryGetQuery, useCityGetQuery, useLazyCityGetQuery } = api;
