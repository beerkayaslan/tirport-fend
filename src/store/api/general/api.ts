import { generalApiService } from '@/store/api/general/service';
import {
  CityRequest,
  CityResponse,
  CountryResponse,
  TaxOfficeRequest,
  TaxOfficeResponse
} from '@/types/general/type';
import { PaginationRequest } from '@/types/utils';

const api = generalApiService.injectEndpoints({
  endpoints: (build) => ({
    contryGet: build.query<CountryResponse, PaginationRequest>({
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
    }),
    taxOfficeGet: build.query<TaxOfficeResponse, TaxOfficeRequest>({
      query: ({ city, country, take, skip }) => ({
        method: 'GET',
        url: `/localization/country/${country}/city/${city}/tax-office?take=${take}&skip=${skip}`
      })
    })
  })
});

export const { useContryGetQuery, useCityGetQuery, useTaxOfficeGetQuery } = api;
