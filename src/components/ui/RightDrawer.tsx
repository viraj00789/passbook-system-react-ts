import { useEffect } from "react";
import { Button } from "./Button";
import { IoCloseCircle } from "react-icons/io5";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function RightDrawer({
  isOpen,
  onClose,
  title,
  children,
}: RightDrawerProps) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-60
          transition-opacity duration-300 h-screen
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          text fixed top-0 right-0 h-full w-full max-w-120 dark:bg-dark-blue bg-white z-70 shadow-lg
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h2 className="text-lg 2xl:text-2xl font-bold">{title}</h2>
          <Button
            title={<IoCloseCircle size={25} />}
            buttonType="button"
            buttonPadding="px-1.5 py-1.5"
            onClick={onClose}
            aria-label="Close drawer"
            className="text hover:text-primary! transition"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
