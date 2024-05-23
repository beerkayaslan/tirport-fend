import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProgressBar from 'react-topbar-progress-indicator';

import Loader from '@/components/Loader';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ROUTES } from '@/router/url';
import { RootState } from '@/store/index';
import { AuthStatusEnum } from '@/types/auth/type';

const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN.PATH,
        lazy: () => import('@/pages/auth/login/Index')
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.LOGIN.PATH} />
      }
    ]
  }
]);

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.INDEX.PATH,
        lazy: () => import('@/pages/index/Index')
      },
      {
        path: ROUTES.COMPANY.PATH,
        lazy: () => import('@/pages/company/Index')
      },
      {
        path: ROUTES.COMPANY.EDIT.PATH,
        lazy: () => import('@/pages/company/Edit')
      },
      {
        path: ROUTES.DRIVER_INVENTORY.PATH,
        lazy: () => import('@/pages/driver-inventory/Index')
      },
      {
        path: ROUTES.DRIVER_INVENTORY.EDIT.PATH,
        lazy: () => import('@/pages/driver-inventory/Edit')
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.PATH,
        lazy: () => import('@/pages/vehicle-inventory/Index')
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.EDIT.PATH,
        lazy: () => import('@/pages/vehicle-inventory/Edit')
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.DETAIL.PATH,
        lazy: () => import('@/pages/vehicle-inventory/Detail')
      },
      {
        path: ROUTES.USER_MANAGEMENT.PATH,
        lazy: () => import('@/pages/user-management/Index')
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.INDEX.PATH} />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.INDEX.PATH} />
  }
]);

export default function Router() {
  const AUTH_STATUS = useSelector((state: RootState) => state.auth.AUTH_STATUS);

  if (AUTH_STATUS === AuthStatusEnum.LOADING) {
    return <Loader />;
  }

  return (
    <RouterProvider
      router={AUTH_STATUS === AuthStatusEnum.LOGGED_IN ? privateRouter : publicRouter}
      fallbackElement={<Loader />}
    />
  );
}
