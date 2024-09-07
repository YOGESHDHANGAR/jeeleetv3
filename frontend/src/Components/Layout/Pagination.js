import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  // Function to generate page numbers with ellipses
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const range = 2; // Number of pages to show before and after current page
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(totalPages, currentPage + range);

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, some pages around the current page, and last page
      if (currentPage > 4) pageNumbers.push(1); // Show first page
      if (currentPage > 5) pageNumbers.push("...");

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 4) pageNumbers.push("..."); // Show last page
      if (currentPage < totalPages - 3) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        First
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>

      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`pagination-button ${
            typeof page === "number" && currentPage === page ? "active" : ""
          }`}
          disabled={page === "..." || page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
