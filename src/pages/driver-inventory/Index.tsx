import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AddWhiteIcon, DriverInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import ProjectSelect from '@/components/ProjectSelect/Index';
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
  const [selectProjectId, setSelectProjectId] = useState<string>();

  return (
    <FallbackPageWrapper>
      <div className="flex items-center justify-between">
        <div className="mb-8 flex items-center gap-x-2.5">
          <DriverInventoryIcon />
          <span className="text-lg font-semibold">Sürücü Envanteri</span>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Link to={URLS.DRIVER_INVENTORY_EDIT('new')}>
            <Button className="flex gap-x-2">
              <AddWhiteIcon className="w-4" /> Sürücü Ekle
            </Button>
          </Link>
          <ProjectSelect
            onChange={(value) => setSelectProjectId(value)}
            selectedDefault
            className="w-96"
            selectClassName="h-11"
          />
        </div>
      </div>

      {selectProjectId && (
        <DataTable
          url="project-driver"
          projectid={selectProjectId}
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
                <Link to={URLS.DRIVER_INVENTORY_DETAIL(data.id)} className="w-20">
                  Detay
                </Link>
              )
            }
          ]}
        />
      )}
    </FallbackPageWrapper>
  );
}
