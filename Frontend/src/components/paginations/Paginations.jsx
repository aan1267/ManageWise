import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getWindowPages = (current, total, windowSize) => {
  let start = current;
  let end = start + windowSize - 1; // fixed window size 5 every time
//  The end value should never go beyond the total number of pages — only the start value shifts to slide the window.
 if (end > total) {  
    end = total; 
    start = Math.max(1, end - windowSize + 1);
  }
  // task -> array create 
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
};

export function PaginationDemo({ page, totalPages, onPageChange }) {
  const pages = getWindowPages(page, totalPages, 5);
  return (
    <Pagination>
      <PaginationContent>
        {/* previous button */}
        {page != 1 && (
          <PaginationPrevious
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          />
        )}
        {/*  number */}
        {pages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === page}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
        ))}

        {/* next */}
        <PaginationNext
          onClick={() => onPageChange(page + 1)}
          disabled={page == totalPages}
        />
      </PaginationContent>
    </Pagination>
  )
};
