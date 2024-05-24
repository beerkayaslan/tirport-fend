import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { DotsIcon } from '@/assets/icons';
import { AddWhiteIcon, CopyIcon, UsersIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/Index';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { URLS } from '@/router/url';
import { UserManagementListResponse } from '@/types/company/type';

export function Component() {
  const [copy] = useCopyToClipboard();

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
      customRenderOverlayClassname="grid grid-cols-2 gap-6"
      customRender={(data: UserManagementListResponse) => {
        const items: MenuProps['items'] = [
          {
            label: 'İncele',
            key: '0'
          },
          {
            label: 'Proje Ata',
            key: '1'
          },
          {
            label: 'Kullanıcıyı Sil',
            key: '12'
          }
        ];

        return (
          <div key={data.id} className="flex justify-between rounded p-4 shadow">
            <div className="flex items-center gap-x-5">
              <Avatar size={76} className="uppercase">
                {data.name.slice(0, 2)}
              </Avatar>
              <div className="flex flex-col gap-y-2">
                <b className="text-base">{data.name}</b>
                <p className="flex items-center">
                  <span className="w-8 cursor-pointer" onClick={() => copy(data.email)}>
                    <Tooltip title="Kopyala">
                      <CopyIcon />
                    </Tooltip>
                  </span>
                  {data.email}
                </p>
                <p className="flex items-center">
                  <UserOutlined className="w-8 text-xl" /> Şef Yönetici
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow className="cursor-pointer p-1">
                <DotsIcon />
              </Dropdown>
              <div className="text-primary-light">{data.status && 'Aktif'}</div>
            </div>
          </div>
        );
      }}
    />
  );
}
