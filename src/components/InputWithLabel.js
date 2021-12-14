import React from "react";
import PropTypes from "prop-types";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = ({ todoTitle, handleTitleChange }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {/* <label htmlFor="todoTitle" className={styles.Title}>
        {children}
      </label> */}
      <input
        type="text"
        id="todoTitle1"
        name="title"
        placeholder="Enter a new list item..."
        ref={inputRef}
        value={todoTitle}
        onChange={handleTitleChange}
        className={styles.InputAdd}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
export default InputWithLabel;
