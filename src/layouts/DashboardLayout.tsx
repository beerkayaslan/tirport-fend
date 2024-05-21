import Header from '@/components/Header';
import SidebarMenu from '@/components/SidebarMenu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarMenu />
      <div className="mb-10 ml-24 mr-12 mt-24">{children}</div>
    </>
  );
}
