import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { FallbackProvider } from '@/components/Fallback/FallbackProvider';
import Loader from '@/components/Loader';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ROUTES } from '@/router/url';
import { RootState } from '@/store/index';
import { AuthStatusEnum } from '@/types/auth/type';

const Index = lazy(() => import('@/pages/index/Index'));
const Login = lazy(() => import('@/pages/auth/login/Index'));

export default function Router() {
  const AUTH_STATUS = useSelector((state: RootState) => state.auth.AUTH_STATUS) as AuthStatusEnum;

  if (AUTH_STATUS === AuthStatusEnum.LOADING) {
    return <Loader />;
  }

  if (AUTH_STATUS === AuthStatusEnum.LOGGED_IN) {
    return (
      <DashboardLayout>
        <FallbackProvider>
          <Routes>
            <Route path={ROUTES.INDEX.PATH} Component={Index} />
            <Route path="*" element={<Navigate to={ROUTES.INDEX.PATH} />} />
          </Routes>
        </FallbackProvider>
      </DashboardLayout>
    );
  }

  return (
    <AuthLayout>
      <FallbackProvider>
        <Routes>
          <Route path={ROUTES.LOGIN.PATH} Component={Login} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN.PATH} />} />
        </Routes>
      </FallbackProvider>
    </AuthLayout>
  );
}
