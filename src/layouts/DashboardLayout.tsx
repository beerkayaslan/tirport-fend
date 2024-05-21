import Header from '@/components/Header';
import SidebarMenu from '@/components/SidebarMenu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarMenu />
      {children}
    </>
  );
}
