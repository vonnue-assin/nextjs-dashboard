"use client";

import { useDebouncedCallback } from "use-debounce";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching...${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

//URLSearchParams is a web API that provides utility methods for manipulating the URL query parameters.Instead of creating a complex string literal,you can use it to get the params string like ?page = 1&query = a

//Debouncing is a programming practice that limits the rate at which a function can fire.In our case,you only want to query the database when the user has stopped typing.Trigger Event When a event that should be debounced occurs,a timer starts.We can implement debouncing in many ways including manually creating our own debounce function.

//Mutating Data: In the previous chapter you implemented search and pagination using URL search Params and Next.js APIs.

//SERVER ACTIONS : Allows us to asynchronous code directly on the server.They eliminate the need to create API endpoints to mutate your data.Instead you write asynchrous functions that execute on the server and can be invoked from your client components.An advantage of invoking a Server Action within a Server component is progressive enhancement forms work even if JavaScript has not yet loaded on the client.

