import { generalApiService } from '@/store/api/general/service';
import {
  CityRequest,
  CityResponse,
  CountryResponse,
  FileUploadRequest,
  FileUploadResponse,
  TaxOfficeRequest,
  TaxOfficeResponse,
  TaxonomyTruckTrailersAndBrands,
  TaxonomyTruckTypeRequest,
  TaxonomyTruckTypesResponse
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
    }),
    taxonomyTruckTypes: build.query<TaxonomyTruckTypesResponse[], void>({
      query: () => ({
        url: `/taxonomy/truck-types`,
        method: 'GET'
      })
    }),
    taxonomyTrailerAndBrands: build.query<TaxonomyTruckTrailersAndBrands, TaxonomyTruckTypeRequest>(
      {
        query: ({ truckTypeId }) => ({
          url: `/taxonomy/truck-types/${truckTypeId}/trailers-and-brands`,
          method: 'GET'
        })
      }
    ),
    storagePresignedUrl: build.mutation<FileUploadResponse, FileUploadRequest>({
      query: ({ name }) => ({
        url: `/storage/presigned-url`,
        method: 'POST',
        body: {
          fileName: name
        }
      })
    })
  })
});

export const {
  useContryGetQuery,
  useCityGetQuery,
  useTaxOfficeGetQuery,
  useLazyTaxonomyTrailerAndBrandsQuery,
  useTaxonomyTruckTypesQuery,
  useStoragePresignedUrlMutation
} = api;
