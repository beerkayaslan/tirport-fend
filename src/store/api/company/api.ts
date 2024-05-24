import { companyApiService } from '@/store/api/company/service';
import {
  CompanyDriverAddRequestDto,
  CompanyInfoDataResponse,
  CompanyPostFormDataRequest,
  CompanyVehicByIdResponseDto,
  CompanyVehicleAddRequestDto,
  DataTableRequest,
  ProjectListResponse,
  UserInviteRequest
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
    companyDriverAdd: build.mutation<void, { body: CompanyDriverAddRequestDto; projectId: string }>({
      query: ({ body, projectId }) => ({
        url: '/company-driver',
        method: 'POST',
        body,
        headers: {
          projectid: projectId
        }
      })
    }),
    dataTable: build.query<void, DataTableRequest>({
      query: ({ take, skip, url, projectid }) => ({
        method: 'GET',
        url: `/${url}?take=${take}&skip=${skip}`,
        headers: {
          projectid
        }
      })
    }),
    companyVehicleAdd: build.mutation<void, { body: CompanyVehicleAddRequestDto; projectId: string }>({
      query: ({ body, projectId }) => ({
        url: '/vehicle',
        method: 'POST',
        body,
        headers: {
          projectid: projectId
        }
      })
    }),
    companyVehicleGetById: build.query<void, { id: string }>({
      query: ({ id }) => ({
        url: `/vehicle/${id}`,
        method: 'GET'
      })
    }),
    companyVehicleUpdateById: build.mutation<void, { body: CompanyVehicleAddRequestDto; id: string }>({
      query: ({ body, id }) => ({
        url: `/vehicle/${id}`,
        method: 'PUT',
        body,
        headers: {
          projectid: body.projectId,
          vehicleid: id
        }
      })
    }),
    getCompanyVehicById: build.query<CompanyVehicByIdResponseDto, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/vehicle/${id}`,
        method: 'GET'
      })
    }),
    companyInviteUser: build.mutation<void, UserInviteRequest>({
      query: (body) => ({
        url: `/company-user`,
        method: 'POST',
        body
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
  useDataTableQuery,
  useCompanyVehicleAddMutation,
  useLazyCompanyVehicleGetByIdQuery,
  useCompanyVehicleUpdateByIdMutation,
  useGetCompanyVehicByIdQuery,
  useCompanyInviteUserMutation
} = api;
