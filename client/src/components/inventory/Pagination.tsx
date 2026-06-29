"use client";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const firstIndex =
    (currentPage - 1) * itemsPerPage + 1;

  const lastIndex = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const totalPages = Math.ceil(
    totalItems / itemsPerPage
  );

  return (
    <>
      {/* Showing Entries */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {firstIndex} to {lastIndex} of {totalItems} entries
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center gap-2">

        <button
          className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          {"<"}
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() =>
                onPageChange(index + 1)
              }
              className={
                currentPage === index + 1
                  ? "rounded-md bg-blue-600 px-3 py-1 text-white"
                  : "rounded-md border px-3 py-1 hover:bg-gray-100"
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          {">"}
        </button>

      </div>
    </>
  );
}