import { companyApiService } from '@/store/api/company/service';
import {
  CompanyDriverAddRequestDto,
  CompanyInfoDataResponse,
  CompanyPostFormDataRequest,
  DataTableRequest,
  ProjectListResponse
} from '@/types/company/type';
import { PaginationRequest, Response } from '@/types/utils';

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
    }),
    projectsGet: build.query<ProjectListResponse, PaginationRequest>({
      query: ({ skip, take }) => ({
        url: `/project?take=${take}&skip=${skip}`,
        method: 'GET'
      })
    }),
    companyDriverAdd: build.mutation<void, { body: CompanyDriverAddRequestDto; projectId: string }>(
      {
        query: ({ body, projectId }) => ({
          url: '/company-driver',
          method: 'POST',
          body,
          headers: {
            projectid: projectId
          }
        })
      }
    ),
    dataTable: build.query<void, DataTableRequest>({
      query: ({ take, skip, url, projectid }) => ({
        method: 'GET',
        url: `/${url}?take=${take}&skip=${skip}`,
        headers: {
          projectid
        }
      })
    })
  })
});

export const {
  useCompanyInformationPostMutation,
  useCompanyInformationQuery,
  useCompanyInformationUpdateMutation,
  useProjectsGetQuery,
  useCompanyDriverAddMutation,
  useDataTableQuery
} = api;
