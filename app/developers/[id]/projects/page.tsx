"use client";

import React, { use } from "react";
import ClientSideFetching from "@/components/ClientSideFetching";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectsPage({ params }: Props) {
  // Unwrap params using React.use() or await if it were a server component,
  // but since this is a client component, we receive the promise.
  // Actually, in Next.js 15+, params is a promise.
  // Let's use `use` to unwrap it, or just await it if we were async (but client components can't be async).
  // Standard pattern for Client Components receiving params in Next 15:
  const { id } = use(params);

  return (
    <div>
      <ClientSideFetching developerId={id} />
    </div>
  );
}
