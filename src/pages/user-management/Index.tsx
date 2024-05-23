import { Link } from 'react-router-dom';

import { AddWhiteIcon, UsersIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/Index';
import { URLS } from '@/router/url';

export function Component() {
  return (
    <DataTable
      url="project-user"
      projectidSelect
      headerLeft={
        <>
          <UsersIcon className="w-12" />
          <span className="text-lg font-semibold">Kullanıcılıar</span>
        </>
      }
      headerRight={
        <Link to={URLS.USER_MANAGEMENT_EDIT('new')}>
          <Button className="flex gap-x-2">
            <AddWhiteIcon className="w-4" /> Kullanıcı Ekle
          </Button>
        </Link>
      }
      customRenderOverlayClassname="grid grid-cols-2 gap-x-4 gap-y-2"
      customRender={(data) => {
        return (
          <div key={data.id}>
            <div>{data.name}</div>
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.role}</div>
          </div>
        );
      }}
    />
  );
}
