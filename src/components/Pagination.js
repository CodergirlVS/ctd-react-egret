import React from "react";
import styles from "./Pagination.module.css";
import className from "classnames";

const Pagination = ({
  titlesperPage,
  totalTitles,
  handlePageChange,
  activePg,
}) => {
  const totalPageNum = Math.ceil(totalTitles / titlesperPage);

  return (
    <nav aria-label="pagination">
      <ul className={styles.PaginationUl}>
        <li className={styles.PageItem}>
          <button
            className={styles.PageButton}
            value="Start"
            onClick={() => {
              handlePageChange(1);
            }}
            disabled={activePg === 1}
          >
            &laquo;
          </button>
        </li>
        {Array(totalPageNum)
          .fill(null)
          .map((_, index) => (
            <li key={index} className={styles.PageItem}>
              <button
                onClick={() => {
                  handlePageChange(index + 1);
                }}
                className={className(styles.PageButton, {
                  [styles.PageButtonActive]: activePg === index + 1,
                })}
              >
                {index + 1}
              </button>
            </li>
          ))}
        <li className={styles.PageItem}>
          <button
            value="End"
            onClick={() => {
              handlePageChange(totalPageNum);
            }}
            className={styles.PageButton}
            disabled={activePg === totalPageNum}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
