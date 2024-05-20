import * as React from "react";

import {
  FallbackContext,
  FallbackType,
} from "@/components/Fallback/FallbackProvider";

export const usePageRoute = () => {
  const { updateFallback } = React.useContext(FallbackContext);

  const onLoad = React.useCallback(
    (component: FallbackType | undefined) => {
      if (component === undefined) {
        component = null;
      }
      updateFallback(component);
    },
    [updateFallback],
  );

  return { onLoad };
};

export default usePageRoute;
