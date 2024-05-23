import { PaginationRequest } from '../utils';
export interface CompanyPostFormDataRequest {
  name: string;
  companyCountryId: string;
  companyCityId: string;
  taxOfficeId: string;
  taxId: string;
  companyAddress: string;
  isInvoiceAddressSame: boolean;
  invoiceCountryId: string;
  invoiceCityId: string;
  invoiceAddress: string;
}

export interface CompanyInfoDataResponse {
  id: string;
  name: string;
  companyCountryId: string;
  companyCityId: string;
  taxOfficeId: string;
  taxId: string;
  companyAddress: string;
  isInvoiceAddressSame: boolean;
  invoiceAddress: string;
  invoiceCountryId: string;
  invoiceCityId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  companyCountry: {
    id: string;
    name: string;
  };
  companyCity: {
    id: string;
    name: string;
    countryId: string;
  };
  invoiceCountry: {
    id: string;
    name: string;
  };
  invoiceCity: {
    id: string;
    name: string;
    countryId: string;
  };
  taxOffice: {
    id: string;
    name: string;
    countryId: string;
    cityId: string;
  };
}
export interface ProjectListResponse {
  data: {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    country: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
      countryId: string;
    };
    address: string;
    addressDescription: string;
    userCount: number;
  }[];
}

export interface CompanyDriverAddRequestDto {
  bulk: Array<{
    phone: string;
    contractEndDate: string | null;
  }>;
}

export interface DataTableRequest extends PaginationRequest {
  url: string;
  projectid?: string;
}

export interface CompanyVehicleAddRequestDto {
  projectId?: string;
  plateNumber?: string;
  truckTypeId?: string;
  trailerId?: string;
  brandId?: string;
  year?: number | string;
  truckNetWeight?: number;
  truckMaxWeight?: number | null;
  truckInsuranceEndDate?: Date | string | null;
  trailerNetWeight?: number | null;
  trailerMaxWeight?: number | null;
  trailerInsuranceEndDate?: Date | string | null;
  ownershipType?: string;
  contractEndDate?: Date | string | null;
  truckRegistrationFile?: string | null;
  truckInsuranceFile?: string | null;
  trailerRegistrationFile?: string | null;
  trailerInsuranceFile?: string | null;
  rentalContractFile?: string | null;
}

export interface CompanyVehicByIdResponseDto {
  id: string;
  plateNumber: string;
  year: number;
  truckNetWeight: number;
  truckMaxWeight: number;
  truckInsuranceEndDate: Date | string | null;
  trailerNetWeight: number;
  projectId: string;
  trailerMaxWeight: number;
  trailerInsuranceEndDate: Date | string | null;
  ownershipType: string;
  contractEndDate: null | Date | string;
  truckRegistrationFile: null;
  truckInsuranceFile: null;
  trailerRegistrationFile: null;
  trailerInsuranceFile: null;
  rentalContractFile: null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  truckType: string;
  trailer: string;
  brand: string;
  driversOnVehicle: string[];
}
