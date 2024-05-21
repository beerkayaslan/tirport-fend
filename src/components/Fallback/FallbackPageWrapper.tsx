import * as React from 'react';

import { usePageRoute } from '@/components/Fallback/usePageRoute';

interface PageWrapperProps {
  children?:
    | React.ReactNode
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode[]
    | string
    | number
    | null
    | undefined;
}

export const FallbackPageWrapper: React.FC<PageWrapperProps> = ({ children }: PageWrapperProps) => {
  const { onLoad } = usePageRoute();

  const render = React.useMemo(() => children, [children]);

  React.useEffect(() => {
    onLoad(render);
    // window.scrollTo(0, 0);
  }, [onLoad, render]);

  return render;
};

export default FallbackPageWrapper;
