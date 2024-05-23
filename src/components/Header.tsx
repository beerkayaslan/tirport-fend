import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DownAngleIcon } from '@/assets/icons';
import { RootState } from '@/store/index';
import { LOGGED_OUT } from '@/store/reducer/authSlice';

export default function Header() {
  const USER = useSelector((state: RootState) => state.auth.USER);
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [
    {
      label: 'Oturumu Kapat',
      key: '1',
      onClick: () => {
        dispatch(LOGGED_OUT());
      }
    }
  ];

  return (
    <div className="fixed left-0 top-0 z-10 flex h-14 w-full items-center justify-end bg-white pr-10 shadow-md">
      <div className="mx-8 h-8 border-r border-r-primary bg-red-500"></div>
      <Dropdown menu={{ items }} trigger={['click']} className="cursor-pointer select-none">
        <div className="flex items-center">
          <div className="mr-3 flex flex-col items-end">
            <div className="font-semibold">{USER?.identity.name}</div>
            <small>{USER?.identity.email}</small>
          </div>
          <Avatar
            src={
              <img
                className="size-10"
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="avatar"
              />
            }
            className="size-10 rounded-lg border border-primary"
          />
          <DownAngleIcon width={10} className="ml-2" />
        </div>
      </Dropdown>
    </div>
  );
}
