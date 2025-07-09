"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState
} from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
};

export function ReactQueryProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
