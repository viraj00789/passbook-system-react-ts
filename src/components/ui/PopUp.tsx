import { RxCrossCircled } from "react-icons/rx";
import { Button } from "./Button";
import type { ReactNode } from "react";

interface PopUpProps {
  setOpenModal: (open: boolean) => void;
  popupTitle: string;
  makeNode?: ReactNode;
}

export default function PopUp({
  setOpenModal,
  popupTitle,
  makeNode,
}: PopUpProps) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900/40 backdrop-blur-xs">
      <div className="w-full flex items-center justify-center h-[calc(100vh-100px)] p-4 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div className="inline-block bg-white dark:bg-dark-blue rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle max-w-lg w-full">
          <div className="flex items-center justify-between w-full py-4 lg:py-6 border-b border-gray-500 px-4 lg:px-6">
            <h3 className="text-lg lg:text-2xl leading-6 font-bold text-gray-900 text">
              {popupTitle}
            </h3>

            <RxCrossCircled
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className="p-4 lg:p-6">
            <p className="text-sm leading-5 text-gray-400">{makeNode}</p>
          </div>
          <div className="px-4 pb-4 lg:px-6 lg:pb-6 flex gap-2">
            <Button
              buttonType="button"
              className="inline-flex justify-center w-full rounded-lg border-none text-basefont-medium text-gray-100 shadow-sm hover:bg-gray-500 sm:text-sm border border-gray-200 dark:border-gray-600 bg-gray-500 dark:bg-gray-700 focus:outline-none "
              title="Cancel"
              buttonPadding="px-1.5 py-1.5"
              onClick={() => setOpenModal(false)}
            />
            <Button
              buttonType="button"
              className="inline-flex justify-center w-full rounded-lg border border-transparent bg-primary-600 text-base leading-6 font-medium text-black shadow-sm hover:bg-primary-800 focus:outline-none "
              title="Apply Filter(s)"
              buttonPadding="px-1.5 py-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
