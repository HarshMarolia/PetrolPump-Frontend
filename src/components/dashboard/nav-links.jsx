import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserGroupIcon, HomeIcon, CogIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const NavLinks = () => {
  const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Users", href: "/dashboard/users", icon: UserGroupIcon },
    { name: "OPS", href: "/dashboard/operations", icon: CogIcon },
  ];

  const location = useLocation();

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive = location.pathname === link.href;
        return (
          <Link
            key={index}
            to={link.href}
            className={clsx(
              "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "hover:bg-sky-100 hover:text-slate-600": true,
                "!text-blue-600 bg-sky-100": isActive,
                "text-white bg-[#171717]": !isActive,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
