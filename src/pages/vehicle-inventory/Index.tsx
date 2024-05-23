import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { AddWhiteIcon, DriverInventoryIcon, VehicleInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import { URLS } from '@/router/url';

interface DriverInventoryProps {
  birthDateAt: string;
  firstName: string;
  id: string;
  identificationNumber: string;
  lastName: string;
  phone: string;
}

export default function DriverInventory() {
  return (
    <FallbackPageWrapper>
      <DataTable
        url="vehicle"
        projectidSelect
        headerLeft={
          <>
            <VehicleInventoryIcon />
            <span className="text-lg font-semibold">Araç Envanteri</span>
          </>
        }
        headerRight={
          <Link to={URLS.VEHICLE_INVENTORY_EDIT('new')}>
            <Button className="flex gap-x-2">
              <AddWhiteIcon className="w-4" /> Araç Ekle
            </Button>
          </Link>
        }
        columns={[
          {
            title: 'Plaka',
            key: 'plate'
          },
          {
            title: 'Araç Tipi',
            key: 'vehicleType'
          },
          {
            title: 'Kasa Tipi',
            key: 'bodyType'
          },
          {
            title: 'Atanan Sürücü',
            key: 'drivers'
          },
          {
            title: 'Envanter',
            key: 'owner'
          },
          {
            title: 'Puan',
            key: 'point'
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
                      label: 'Düzenle',
                      key: '2'
                    },
                    {
                      label: 'Taşımalar',
                      key: '3'
                    },
                    {
                      label: 'Atamalar',
                      key: '4'
                    },
                    {
                      label: 'Sürüc Ata',
                      key: '5'
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
    </FallbackPageWrapper>
  );
}
