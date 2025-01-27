

interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination = ({
  prevPage,
  nextPage,
  totalPages,
  goToPage,
  currentPage,
}: UsePaginationResult) => {


  const maxVisiblePages = 5;

  // Функция для расчета отображаемых страниц
  const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const visiblePages: number[] = [];
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
      if(endPage - startPage < maxVisiblePages - 1){
           startPage = Math.max(0, endPage - maxVisiblePages + 1);
      }

    for(let i = startPage; i<= endPage; i++){
         visiblePages.push(i)
    }
      
    
     return visiblePages
  };

  const visiblePages = getVisiblePages();
  

  return (
    <div className="flex justify-between items-center my-[60px] gap-6">
      <button onClick={prevPage} className="cursor-pointer">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 7L7 1"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex gap-[30px] items-center">
        {visiblePages.map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => goToPage(pageIndex)}
            className={`rounded-full  cursor-pointer min-w-[6px] min-h-[6px] ${
              currentPage === pageIndex
                ? 'bg-[#121214] min-w-[10px] min-h-[10px]'
                : 'bg-[#121214]/70'
            }`}
          ></button>
        ))}
      </div>
      <button onClick={nextPage} className="cursor-pointer">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path
            d="M7 13L1 7L7 1"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
