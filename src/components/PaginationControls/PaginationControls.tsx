import ActionButton from "../ActionButton/ActionButton";

interface IPaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: IPaginationControlsProps) {
  return (
    <div className="py-4 flex justify-center gap-2 items-center">
      <ActionButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        focusKey="pagination-prev"
      >
        Previous
      </ActionButton>
      <div className="px-4">
        <span>
          Page {page} of {totalPages}
        </span>
      </div>
      <ActionButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        focusKey="pagination-next"
      >
        Next
      </ActionButton>
    </div>
  );
}
