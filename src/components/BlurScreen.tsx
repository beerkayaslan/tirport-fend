import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function BlurScreen() {
  return (
    <div className="fixed left-0 top-0 z-[5] flex h-screen w-screen items-center justify-center backdrop-blur">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 62 }} spin />} />
    </div>
  );
}
