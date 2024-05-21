import Header from '@/components/Header';
import SidebarMenu from '@/components/SidebarMenu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarMenu />
      <div className="mb-5 ml-20 mr-5 mt-20">{children}</div>
    </>
  );
}
