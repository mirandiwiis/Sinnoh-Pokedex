import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { PagiantionProps } from "../../models/pagination-props"

export const Pagination = (props: PagiantionProps) => {
    const { currentPage, totalPages, prevPage, nextPage, pageSelect} = props;

    // Obtaining array of pages numbers
    const pageNumbers= [...Array(totalPages).keys()].slice(1);

    return (
        <div className="pagination">
                    <div className="page-item icon">
                        <FaAngleLeft onClick={prevPage}/>
                    </div>
                    <div className="page-numbers">
                    {pageNumbers.map(pageNum => (
                        <div key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                            <a  onClick={() => pageSelect(pageNum)}>
                                {pageNum}
                            </a>
                        </div>
                    ))}
                    </div>
                    <div className="page-item icon">
                        <FaAngleRight onClick={nextPage} />
                    </div>
        </div>
    )
}