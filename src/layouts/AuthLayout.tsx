import { Outlet } from 'react-router-dom';

import { FallbackProvider } from '@/components/Fallback/FallbackProvider';

export default function AuthLayout() {
  return (
    <FallbackProvider>
      <Outlet />
    </FallbackProvider>
  );
}
