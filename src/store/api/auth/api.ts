import { authApiService } from '@/store/api/auth/service';
import { LoginRequestDto, LoginResponseDto, User } from '@/types/auth/type';

const authApi = authApiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: `/user/login`,
        method: 'POST',
        body
      })
    }),
    me: build.query<User, void>({
      query: () => ({
        url: `/user/me`,
        method: 'GET'
      })
    })
  })
});

export const { useLoginMutation, useLazyMeQuery } = authApi;
