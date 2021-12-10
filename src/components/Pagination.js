import React from "react";
import styles from "./Pagination.modules.css";

const Pagination = ({ titlesperPage, totalTitles, handlePageChange }) => {
  const totalPageNum = Math.ceil(totalTitles / titlesperPage);

  return (
    <nav>
      <ul className={styles.Pagination}>
        {Array(totalPageNum)
          .fill(null)
          .map((_, index) => (
            <li key={index} className={styles.PageItem}>
              <button
                onClick={() => {
                  handlePageChange(index + 1);
                }}
                className="pageLink"
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
