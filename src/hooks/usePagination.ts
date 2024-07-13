import { useState } from "react"

export const usePagination = (totalItems: number, itemsPerPage: number, ) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Navigate to prev page
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage -1);
    };

    // Navigate to next page
    const goToNextPage = () => {
        if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    };

    // Set actual page
    const setPage = (pageNum: number) => {
        if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum)
    };

    return {
        currentPage,
        totalPages,
        goToPrevPage,
        goToNextPage,
        setPage,
        firstIndex: (currentPage - 1) * itemsPerPage,
        lastIndex: currentPage * itemsPerPage,
    };
};