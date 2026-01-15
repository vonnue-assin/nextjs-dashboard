import Link from "next/link";
import clsx from "clsx";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-sm text-gray-500">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {breadcrumb.active ? (
              <span className="font-medium text-gray-900">
                {breadcrumb.label}
              </span>
            ) : (
              <Link href={breadcrumb.href} className="hover:text-gray-700">
                {breadcrumb.label}
              </Link>
            )}

            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
