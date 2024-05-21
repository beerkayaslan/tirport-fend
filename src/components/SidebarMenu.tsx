import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  BillManagementIcon,
  CompanyManagementIcon,
  CompletedTransportationIcon,
  InventoryIcon,
  PinLogoIcon,
  RampManagementIcon,
  ReportsIcon,
  SpotMarketIcon,
  TirboardIcon,
  TransportMethodIcon,
  UserManagementIcon
} from '@/assets/icons';
import logo from '@/assets/imgs/logo.png';
import { URLS } from '@/router/url';

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <TirboardIcon className="size-[21px]" />,
    label: <Link to={URLS.INDEX}>Tırboard</Link>
  },
  {
    key: '2',
    label: 'Taşıma Yönetimi',
    icon: <TransportMethodIcon className="size-[21px]" />
  },
  {
    key: '3',
    label: 'Rampa Yönetimi',
    icon: <RampManagementIcon className="size-[21px]" />
  },
  {
    key: '4',
    label: 'Şirket Yönetimi',
    icon: <CompanyManagementIcon className="size-[21px]" />,
    children: [
      { key: '5', label: 'Şirket Bilgileri' },
      { key: '6', label: 'Projeler' },
      { key: '7', label: 'Tedarikçiler' },
      { key: '8', label: 'Müşteriler' },
      { key: '9', label: 'Adresler' }
    ]
  },
  {
    key: '10',
    label: 'Kullanıcı Yönetimi',
    icon: <UserManagementIcon className="size-[21px]" />
  },
  {
    key: '11',
    label: 'Envanter',
    icon: <InventoryIcon className="size-[21px]" />,
    children: [
      { key: '12', label: 'Sürücü Envanteri' },
      { key: '13', label: 'Araç Envanteri' }
    ]
  },
  {
    key: '14',
    label: 'Spot Market',
    icon: <SpotMarketIcon className="size-[21px]" />
  },
  {
    key: '15',
    label: 'Fatura Yönetimi ',
    icon: <BillManagementIcon className="size-[21px]" />
  },
  {
    key: '16',
    label: 'Tamamlanmış Taşımalar',
    icon: <CompletedTransportationIcon className="size-[21px]" />
  },
  {
    key: '17',
    label: 'Raporlar',
    icon: <ReportsIcon className="size-[21px]" />
  }
];

export default function SidebarMenu() {
  const [openKeys, setOpenKeys] = useState<string[] | undefined>([]);

  const leaveHandler = () => setOpenKeys([]);

  return (
    <div
      className="group fixed left-0 top-0 h-screen w-14 overflow-hidden bg-primary shadow transition-[width] hover:w-60"
      onMouseLeave={leaveHandler}
    >
      <Link to={URLS.INDEX} className="mx-3.5 my-8 block h-14">
        <PinLogoIcon className="group-hover:hidden" />
        <img src={logo} alt="logo" className="hidden  !w-48 max-w-48 group-hover:block" />
      </Link>
      <Menu
        openKeys={openKeys}
        onOpenChange={(keys) => {
          setOpenKeys(keys[keys.length - 1] ? [keys[keys.length - 1]] : []);
        }}
        style={{ width: 240 }}
        className="sidebar-menu"
        mode="inline"
        items={items}
      />
    </div>
  );
}
