import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const now = new Date();

  const fullDate = now.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
  const shortDate = now.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Top Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        {/* Logo */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm sm:h-10 sm:w-10">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={24}
              height={24}
              priority
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </div>

          <div className="min-w-0 leading-tight">
            <h1 className="truncate text-base font-extrabold text-gray-900 sm:text-lg">
              বাজার দর
            </h1>
            <p className="truncate text-[10px] text-gray-500 sm:text-[11px]">
              <span className="sm:hidden">{shortDate}</span>
              <span className="hidden sm:inline">{fullDate}</span>
            </p>
          </div>
        </div>

        {/* Auth */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button className="btn btn-ghost btn-xs font-semibold text-gray-800 hover:bg-gray-100 sm:btn-sm">
            সাইন ইন
          </button>

          <button className="btn btn-xs rounded-lg border-none bg-green-600 px-3 font-semibold text-white shadow-md shadow-green-600/30 hover:bg-green-700 sm:btn-sm sm:px-5">
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Navigation (NavLinks scrolls by itself) */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;