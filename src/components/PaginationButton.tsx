import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { FC } from "react";
import { Button } from "./ui/Button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-0.5 text">
      {/* Prev */}
      <Button
        buttonType="button"
        title={<FaChevronLeft size={20} />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="text-sm px-0! py-0!
          disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Next */}
      <Button
        buttonType="button"
        title={<FaChevronRight size={20} />}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="text-sm px-2! py-1!
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default PaginationControls;
