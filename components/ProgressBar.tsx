"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Configure NProgress styling & behavior
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 150,
      minimum: 0.1
    });
  }, []);

  // Complete progress animation whenever route changes
  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}

