import { Outlet, useNavigation } from 'react-router-dom';
import ProgressBar from 'react-topbar-progress-indicator';

import Header from '@/components/Header';
import SidebarMenu from '@/components/SidebarMenu';

ProgressBar.config({
  barColors: {
    '0': '#F4BC2F',
    '1.0': '#F4BC2F'
  },
  shadowBlur: 5,
  barThickness: 4
});

export default function DashboardLayout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== 'idle' && <ProgressBar />}
      <Header />
      <SidebarMenu />
      <div className="mb-10 ml-24 mr-12 mt-24">
        <Outlet />
      </div>
    </>
  );
}
