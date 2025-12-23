import { RxHamburgerMenu } from "react-icons/rx";
import { getItemFromLocalStorage } from "../utils/helper";
import { GoBell } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useSidebar } from "../Providers/SideBarContext";
import { Link } from "react-router-dom";
import ThemeToggle from "../Providers/ThemeToggle";
import Maglo from "../assets/maglo.svg";

export default function Navbar() {
  const { email } = getItemFromLocalStorage("auth") || {};
  const { open, setOpen } = useSidebar();

  return (
    <nav className="w-full text h-20! px-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-dark-blue">
      <div className="flex items-center gap-4">
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <RxHamburgerMenu size={24} />
        </div>

        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={Maglo}
                  alt="Logo"
                  width={28}
                  height={28}
                  className="bg-white rounded-lg"
                />
              </div>
              <p className="hidden md:block text-xl font-semibold">Maglo</p>
            </div>
          </div>

          <div className="md:hidden">
            <svg width="30" height="32" viewBox="0 0 30 32" fill="currentColor">
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15..." />
            </svg>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="px-2 py-1 rounded-lg items-center hidden md:flex border border-gray-200 dark:border-gray-600">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <MdOutlineAttachMoney size={25} />
          <p>50,000</p>
        </div>
        <GoBell
          className="border rounded-md p-1 border-gray-200 dark:border-gray-600"
          size={33}
        />
        <ThemeToggle />

        <div className="w-8 h-8 min-w-8 min-h-8 rounded-lg flex items-center justify-centerw">
          {email ? (
            <div className="w-full h-full bg-primary text-black flex items-center justify-center text-2xl font-bold rounded-full">
              {email?.charAt(0)?.toUpperCase() || "?"}
            </div>
          ) : (
            <div className="w-full h-full bg-primary text flex items-center justify-center text-2xl font-bold">
              ?
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
