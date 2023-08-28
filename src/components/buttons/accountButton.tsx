import { UserIco } from "@/svgExports";
import { TCookieUser } from "@/types";
import Link from "next/link";

export default function AccountButton({
  user,
}: {
  user: TCookieUser | undefined;
}) {
  const defaultClassName =
    "bg-gradient-to-tr from-[var(--bg-200)] to-[var(--bg-300)] text-[var(--text-200)] py-2 px-2 rounded-full";
  const activeClassName =
    "bg-gradient-to-tr from-green-600 to-green-400 text-[var(--bg-100)] py-2 px-2 rounded-full";
  return (
    <Link
      href={"/account"}
      className={
        (user ? activeClassName : defaultClassName) +
        " flex gap-2 max-w-max mt-8 md:mt-0 ms-auto me-4 md:me-0 py-4 px-6"
      }
    >
      Mi Cuenta{" "}
      <span className="text-[var(--accent-100)]">
        <UserIco />
      </span>
    </Link>
  );
}
