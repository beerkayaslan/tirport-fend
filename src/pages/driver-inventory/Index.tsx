import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { AddWhiteIcon, DriverInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/Index';
import { URLS } from '@/router/url';

interface DriverInventoryProps {
  birthDateAt: string;
  firstName: string;
  id: string;
  identificationNumber: string;
  lastName: string;
  phone: string;
}

export function Component() {
  return (
    <>
      <DataTable
        url="project-driver"
        projectidSelect
        headerLeft={
          <>
            <DriverInventoryIcon />
            <span className="text-lg font-semibold">Sürücü Envanteri</span>
          </>
        }
        headerRight={
          <Link to={URLS.DRIVER_INVENTORY_EDIT('new')}>
            <Button className="flex gap-x-2">
              <AddWhiteIcon className="w-4" /> Sürücü Ekle
            </Button>
          </Link>
        }
        columns={[
          {
            title: 'Sürücü',
            render: (data: DriverInventoryProps) => `${data.firstName} ${data.lastName}`
          },
          {
            title: 'Telefon Numarası',
            key: 'phone'
          },
          {
            title: 'Son Konum',
            render: () => '----------'
          },
          {
            title: 'Son Konum Tarihi',
            render: () => '----------'
          },
          {
            title: 'Durum',
            render: () => '----------'
          },
          {
            title: 'İşlemler',
            render: (data: DriverInventoryProps) => (
              <Dropdown
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="w-40"
                arrow
                menu={{
                  items: [
                    {
                      label: 'İncele',
                      key: '1',
                      onClick: () => alert(data.id)
                    },
                    {
                      label: 'Belgeler',
                      key: '2'
                    },
                    {
                      label: 'Atamalar',
                      key: '3'
                    },
                    {
                      label: 'Araç Ata',
                      key: '4'
                    },
                    {
                      label: 'Sil',
                      key: '5'
                    }
                  ]
                }}
              >
                <EllipsisOutlined className="cursor-pointer select-none text-4xl  text-secondary" />
              </Dropdown>
            )
          }
        ]}
      />
    </>
  );
}
