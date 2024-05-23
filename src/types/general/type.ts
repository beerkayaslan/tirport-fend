import { PaginationRequest } from '../utils';

export interface CountryResponse {
  data: [
    {
      id: string;
      name: string;
    }
  ];
  totalCount: number;
}

export interface CityRequest extends PaginationRequest {
  country: string;
}

export interface CityResponse {
  data: [
    {
      id: string;
      name: string;
      countryId: string;
    }
  ];
  totalCount: number;
}

export interface TaxOfficeResponse {
  [key: string]: {
    id: string;
    name: string;
    cityId: string;
    countryId: string;
  };
}

export interface TaxOfficeRequest extends PaginationRequest {
  country: string;
  city: string;
}

export interface TaxonomyTruckTypesResponse {
  id: string;
  name: string;
}

export interface TaxonomyTruckTrailersAndBrands {
  trailers: {
    id: string;
    name: string;
  }[];
  brands: {
    id: string;
    name: string;
  }[];
}

export interface TaxonomyTruckTypeRequest {
  truckTypeId: string;
}
