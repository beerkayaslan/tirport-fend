import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0'
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: '3rd menu item',
    key: '3'
  }
];

export default function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-full items-center justify-end bg-white pr-10 shadow">
      <Dropdown menu={{ items }} trigger={['click']}>
        <div className="flex items-center">
          <div className="mr-3 flex flex-col items-end">
            <div className="font-semibold">Furkan Yılmaz</div>
            <small>furkanyilmaz@gmail.com</small>
          </div>
          <Avatar className="size-10 rounded-lg border border-primary">U</Avatar>
        </div>
      </Dropdown>
    </div>
  );
}
