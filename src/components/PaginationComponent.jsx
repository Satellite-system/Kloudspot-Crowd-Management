import React from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Generates an array of page numbers to display, including ellipses.
 * This function implements the logic for "..." appearing in the middle.
 * * @param {number} totalPages - The total number of pages available.
 * @param {number} currentPage - The currently active page number (1-based index).
 * @param {number} siblingCount - How many pages to show immediately before and after the current page.
 * @returns {Array<number|string>} An array of page numbers and/or the string '...' (ellipsis).
 */
const usePaginationRange = (totalPages, currentPage, siblingCount = 1) => {
  const range = [];
  const startPage = 1;
  const endPage = totalPages;

  // Total items to show in the pagination bar (startPage + siblings + currentPage + siblings + endPage)
  // Plus two slots for the ellipses: 1 + siblingCount + 1 + siblingCount + 1 = 2*siblingCount + 3
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2; // Including two ellipses

  // Case 1: Total pages is less than the number of blocks we want to display.
  // Show all pages.
  if (totalPages <= totalBlocks) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  // Determine if we need to show the left ellipsis, right ellipsis, or both.
  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  // Case 2: No left ellipsis, only right ellipsis.
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount; // e.g., 1 2 3 4 5 ... 10
    for (let i = 1; i <= leftItemCount; i++) {
      range.push(i);
    }
    range.push("...");
    range.push(endPage);
    return range;
  }

  // Case 3: No right ellipsis, only left ellipsis.
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount; // e.g., 1 ... 6 7 8 9 10
    const start = totalPages - rightItemCount + 1;
    range.push(startPage);
    range.push("...");
    for (let i = start; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  // Case 4: Both left and right ellipses.
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    // e.g., 1 ... 4 5 6 ... 10
    const middleRange = [];
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      middleRange.push(i);
    }
    range.push(startPage);
    range.push("...");
    range.push(...middleRange);
    range.push("...");
    range.push(endPage);
    return range;
  }
};

/**
 * Main Pagination Component
 * * @param {number} currentPage - The currently active page (1-based index).
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - Callback function to call when a page is clicked.
 */
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = usePaginationRange(totalPages, currentPage);

  if (totalPages <= 1) return null; // Don't show if there's only one page

  return (
    <nav
      className="flex justify-center items-center my-8"
      aria-label="Pagination"
    >
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md
              ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black  hover:bg-gray-100 cursor-pointer"
              }
            `}
            aria-label="Go to previous page"
          >
            <FiChevronLeft />
          </button>
        </li>

        {/* Page Numbers and Ellipsis */}
        {pageRange.map((page, index) => {
          if (page === "...") {
            return (
              <li key={index}>
                <span className="px-3 py-1.5 text-sm text-gray-500 font-medium">
                  ...
                </span>
              </li>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={`
                  py-1.5 text-sm font-medium 
                  transition duration-150 ease-in-out
                  ${
                    isCurrent
                      ? "border-b-2 border-[#009490] font-semibold px-1" // Active state
                      : "text-gray-700 bg-white hover:bg-gray-100 border border-transparent px-4 cursor-pointer"
                  } // Inactive state
                `}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md
              ${
                currentPage === totalPages
                  ? "text-gray-400  cursor-not-allowed"
                  : "text-black  hover:bg-gray-100 cursor-pointer"
              }
            `}
            aria-label="Go to next page"
          >
            <FiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
