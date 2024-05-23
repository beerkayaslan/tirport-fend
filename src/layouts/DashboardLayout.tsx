import { Outlet } from 'react-router-dom';

import { FallbackProvider } from '@/components/Fallback/FallbackProvider';
import Header from '@/components/Header';
import SidebarMenu from '@/components/SidebarMenu';

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <SidebarMenu />
      <div className="mb-10 ml-24 mr-12 mt-24">
        <FallbackProvider>
          <Outlet />
        </FallbackProvider>
      </div>
    </>
  );
}
