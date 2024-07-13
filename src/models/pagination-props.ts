export interface PagiantionProps {
    currentPage: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
    pageSelect: (pageNum: number) => void;
}