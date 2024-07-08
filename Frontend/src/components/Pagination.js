import React from 'react';

const Pagination = ({ page, totalPages, handleNextPage, handlePrevPage }) => {

    return (
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={handleNextPage} 
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      );
//   <div>
//     <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
//     <span>Page {page} of {totalPages}</span>
//     <button onClick={handleNextPage} disabled={page >= totalPages}>Next</button>
//   </div>
};

export default Pagination;