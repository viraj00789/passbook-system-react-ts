import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";
import { useSidebar } from "../providers/SideBarContext";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";

const navItems = [
  { label: "Dashboard", icon: HiOutlineHome, href: "/" },
  {
    label: "Transactions",
    icon: HiOutlineCurrencyDollar,
    href: "/transactions",
  },
  { label: "Accounts", icon: HiOutlineCreditCard, href: "/accounts" },
  { label: "Clients", icon: HiOutlineUsers, href: "/clients" },
  { label: "Employees", icon: HiOutlineUserGroup, href: "/employees" },
  { label: "Expenses", icon: HiOutlineCurrencyDollar, href: "/expenses" },
  { label: "Invoices", icon: HiOutlineDocumentText, href: "/invoices" },
];

export default function Sidebar() {
  const { open, setOpen, toggle } = useSidebar();
  const { pathname } = useLocation();
  const windowSize = useWindowSize();

  useEffect(() => {
    setOpen(windowSize > 1023);
  }, [windowSize]);
  return (
    <>
      {/* Mobile Overlay */}
      {/* {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )} */}

      <aside
        className={`
          fixed lg:relative z-50 transition-all duration-300
          ${
            open
              ? "w-full! max-w-64! translate-x-0  "
              : "w-full! max-w-16! -translate-x-full lg:translate-x-0  "
          }
        `}
      >
        {/* Navigation */}
        <div
          className="bg-white dark:bg-dark-blue w-full h-screen max-h-[calc(100vh-70px)] border-r border-gray-200 dark:border-gray-600
           flex flex-col justify-between text"
        >
          <nav
            className={`space-y-3 transition-none ${
              open ? "p-4" : "px-2 py-4"
            }`}
          >
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={label}
                  to={href}
                  className={`
                      flex items-center gap-3 p-3 rounded-md font-semibold
                      hover:bg-primary-300 hover:text-black
                      ${isActive ? "bg-primary-500 text-black" : ""}
                      `}
                  onClick={() => {
                    if (window.innerWidth < 768) setOpen(false);
                  }}
                >
                  <Icon size={24} />
                  {open && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Toggle Button */}
          <button
            onClick={toggle}
            className="p-5 md:flex hidden items-center gap-2 border-t border-gray-200 dark:border-gray-600 cursor-pointer text"
          >
            {open ? <FiChevronLeft /> : <FiChevronRight />}
            {open && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
