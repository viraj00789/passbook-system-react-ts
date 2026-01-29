import { BsTrash3 } from "react-icons/bs";
import { Button } from "./Button";
import { useEffect, useRef, type ReactNode } from "react";
import { useEscapeKey } from "../../hooks/useEscapekey";

interface PopUpProps {
  setOpenModal: (open: boolean) => void;
  popupTitle: string;
  makeNode?: ReactNode;
  onConfirm?: () => void;
}

export default function PopUp({
  setOpenModal,
  popupTitle,
  makeNode,
  onConfirm,
}: PopUpProps) {
  useEscapeKey(() => setOpenModal(false), true);
  const outsideRef = useRef<HTMLDivElement>(null);
  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900/10 backdrop-blur-xs text">
      <div className="w-full flex items-center justify-center h-[calc(100vh-100px)] p-4 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div
          className="inline-block bg-white dark:bg-dark-blue rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle max-w-lg w-full"
          ref={outsideRef}
        >
          <div className="flex justify-center items-center mt-12 relative">
            <div className="absolute w-15 h-15 rounded-full border border-red-500/30 bg-red-200/10 dark:border-red-600/20  dark:bg-red-600/10"></div>
            <div className="absolute w-20 h-20 rounded-full border border-red-500/18 bg-red-200/10 dark:border-red-600/15  dark:bg-red-600/10"></div>
            <div className="absolute w-24 h-24 rounded-full border border-red-500/12 bg-red-200/10 dark:border-red-600/10  dark:bg-red-600/10"></div>

            <BsTrash3
              className="text-red-600 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              size={30}
            />
          </div>

          <div className="mt-10 space-y-2 p-3 lg:p-4">
            <h3 className="text-lg lg:text-xl leading-6 font-bold text-gray-900 text text-center">
              {popupTitle}
            </h3>
            <div className="text-center">
              <p className="text-sm leading-5 text-gray-400">{makeNode}</p>
            </div>
          </div>
          <div className="px-4 pb-4 lg:px-6 lg:pb-6 flex gap-2">
            <Button
              buttonType="button"
              className="inline-flex justify-center w-full rounded-lg text-md font-bold hover:bg-gray-200 dark:hover:bg-gray-600 sm:text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/40 focus:outline-none "
              title="Cancel"
              buttonPadding="px-1.5 py-1.5"
              onClick={() => setOpenModal(false)}
            />
            <Button
              buttonType="button"
              className="inline-flex justify-center w-full rounded-lg border border-transparent bg-red-500 text-white! text-md leading-6 font-bold hover:bg-red-700 focus:outline-none "
              title="Delete"
              buttonPadding="px-1.5 py-1.5"
              onClick={() => {
                onConfirm?.();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
