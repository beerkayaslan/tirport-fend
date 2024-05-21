import { companyApiService } from '@/store/api/company/service';
import { CompanyInfoDataResponse, CompanyPostFormDataRequest } from '@/types/company/type';
import { Response } from '@/types/utils';

const api = companyApiService.injectEndpoints({
  endpoints: (build) => ({
    companyInformationUpdate: build.mutation<Response, CompanyPostFormDataRequest>({
      query: (body) => ({
        url: `/company`,
        method: 'PUT',
        body
      })
    }),
    companyInformationPost: build.mutation<Response, CompanyPostFormDataRequest>({
      query: (body) => ({
        url: `/company`,
        method: 'POST',
        body
      })
    }),
    companyInformation: build.query<CompanyInfoDataResponse, void>({
      query: () => ({
        url: `/company`,
        method: 'GET'
      })
    })
  })
});

export const {
  useCompanyInformationPostMutation,
  useCompanyInformationQuery,
  useCompanyInformationUpdateMutation
} = api;
