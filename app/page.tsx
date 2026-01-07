import React from 'react';
import ServerSideFetching from "@/components/ServerSideFetching";

// This is a Server Component by default in the App Router.
// We are fetching data directly in the component body using `await`.
// 
// WHY SERVER SIDE FETCHING?
// 1. **SEO**: The data is rendered on the server, so search engines can crawl the full list of developers immediately.
// 2. **Performance**: Initial load contains meaningful content (the list of developers) rather than a blank shell.
// 3. **Reduced Client Bundle**: The fetching logic and full data set don't need to be shipped to the client.

export default function HomePage() {
  return (
    <ServerSideFetching />
  );
}