import { Suspense } from "react";

import { fetchInvoicesPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "../../ui/invoices/table";

export default async function Invoice(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices.." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

//Pagination allows users to navigate between pages of invoices.

// Server-side-rendering: URL parameters can be directly consumed on the server to render the initial state,making it easier to handle server rendering.
// Analytics and tracking : Having search queries and filters in the URL makes it easier to track user behaviour without requiring additional client-side logic
// Here search is a Client Component,so you used the useSerachParams() hook to access the params from the client.
// Table is a server Component that fetches its own data,so you can pass the searchParams prop from the page to the component.As a general rule if we want to read the params from the client,use the useSearchParams() hook as this avoids having to go back to the server.
