import React from "react";
import "../styles/pagination.scss";

const Pagination = props => {
  // Pagination click event
  let onPaginationClick = index => {
    props.updateSearchResults(index);
  };

  // Next 5 click event
  let onPaginationNextClick = () => {
    props.updatePaginationNext();
  };

  // Prev 5 click event
  let onPaginationPrevClick = () => {
    props.updatePaginationPrev();
  };

  return (
    <div className="pagination">
      {props.totalPages > 1 && props.rangeIndexes !== undefined && (
        <div className="pagination-page-wrap">
          {props.currentRange > 0 && (
            <span className="prev-btn" onClick={onPaginationPrevClick}>
              &#8592; Prev 5
            </span>
          )}
          <div className="pagination-pages">
            {props.rangeIndexes[props.currentRange].map((index, i) => {
              return (
                <span
                  key={i}
                  className={`${props.currentPage === index ? "active" : ""}`}
                  onClick={() => onPaginationClick(index)}
                >
                  {index}
                </span>
              );
            })}
          </div>
          {props.currentRange < props.rangeIndexes.length - 1 && (
            <span className="next-btn" onClick={onPaginationNextClick}>
              Next 5 &#8594;
            </span>
          )}
        </div>
      )}
      <div className="pagination-page-count">
        Page <span>{props.currentPage}</span> of <span>{props.totalPages}</span>
      </div>
    </div>
  );
  // }
};

export default Pagination;
