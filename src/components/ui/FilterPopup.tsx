import { Button } from "./Button";
import type { ReactNode } from "react";

interface PopUpProps {
  setOpenModal: (open: boolean) => void;
  popupTitle: string;
  makeNode?: ReactNode;
  bothbuttons?: boolean;
}

export default function FilterPopUp({
  setOpenModal,
  popupTitle,
  makeNode,
  bothbuttons = false,
}: PopUpProps) {
  return (
    <div className="relative z-50">
      <div className="absolute right-1 top-7 text-center sm:block sm:p-0 bg-white dark:bg-dark-blue rounded-xl shadow-2xl border border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-between w-full border-b border-gray-300 dark:border-gray-600 p-3 lg:p-4">
          <h3 className="text-md lg:text-lg leading-6 font-bold text">
            {popupTitle}
          </h3>
          <div className="flex gap-3">
            <Button
              title="Reset"
              buttonType="button"
              className="text text-red-400! hover:text-red-600 text-sm"
              buttonPadding="p-0"
              onClick={() => setOpenModal(false)}
            />

            <Button
              title="Apply"
              buttonType="button"
              className="text text-sm text-primary-600! hover:text-primary"
              buttonPadding="p-0"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-dark-blue rounded-lg text-left shadow-xl w-70 max-h-[calc(100vh-600px)] overflow-auto">
          <div className="p-4">
            <p className="text-sm leading-5 text-gray-400">{makeNode}</p>
          </div>
          {bothbuttons && (
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
          )}
        </div>
      </div>
    </div>
  );
}
