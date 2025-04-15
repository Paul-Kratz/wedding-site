import { useEffect } from "react";

export const useBootstrap = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      void import("bootstrap/dist/js/bootstrap.bundle.min.js" as string);
    }
  }, []);
};
