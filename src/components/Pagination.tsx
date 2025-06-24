import React from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    pageCount : number,
    currentPage : number,
    onPageChange : (selectedPage: number) => void
}

const Pagination:React.FC<PaginationProps> = ({pageCount, currentPage, onPageChange}) => {
  return (
    <div>
        <ReactPaginate
            previousLabel="← Prev"
            nextLabel="Next →"
            breakLabel="..."
            breakClassName="page-item disabled"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            forcePage={currentPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(selected) => onPageChange(selected.selected)}
            containerClassName="pagination justify-content-center mt-3"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        />

    </div>
  )
}

export default Pagination