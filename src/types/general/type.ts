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

export interface CountryRequest extends PaginationRequest {}
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
