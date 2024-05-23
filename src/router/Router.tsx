import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Loader from '@/components/Loader';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ROUTES } from '@/router/url';
import { RootState } from '@/store/index';
import { AuthStatusEnum } from '@/types/auth/type';

const Index = lazy(() => import('@/pages/index/Index'));
const Login = lazy(() => import('@/pages/auth/login/Index'));

const Company = lazy(() => import('@/pages/company/Index'));
const CompanyEdit = lazy(() => import('@/pages/company/Edit'));

const DriverInventory = lazy(() => import('@/pages/driver-inventory/Index'));
const DriverInventoryEdit = lazy(() => import('@/pages/driver-inventory/Edit'));

const VehicleInventory = lazy(() => import('@/pages/vehicle-inventory/Index'));
const VehicleInventoryEdit = lazy(() => import('@/pages/vehicle-inventory/Edit'));
const VehicleInventoryDetail = lazy(() => import('@/pages/vehicle-inventory/Detail'));

const UserManagement = lazy(() => import('@/pages/user-management/Index'));

const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN.PATH,
        element: <Login />
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
        element: <Index />
      },
      {
        path: ROUTES.COMPANY.PATH,
        element: <Company />
      },
      {
        path: ROUTES.COMPANY.EDIT.PATH,
        element: <CompanyEdit />
      },
      {
        path: ROUTES.DRIVER_INVENTORY.PATH,
        element: <DriverInventory />
      },
      {
        path: ROUTES.DRIVER_INVENTORY.EDIT.PATH,
        element: <DriverInventoryEdit />
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.PATH,
        element: <VehicleInventory />
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.EDIT.PATH,
        element: <VehicleInventoryEdit />
      },
      {
        path: ROUTES.VEHICLE_INVENTORY.DETAIL.PATH,
        element: <VehicleInventoryDetail />
      },
      {
        path: ROUTES.USER_MANAGEMENT.PATH,
        element: <UserManagement />
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
    />
  );
}
