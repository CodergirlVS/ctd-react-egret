import React from "react";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = ({ value, onChange, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

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
        value={value}
        onChange={onChange}
        className={styles.InputAdd}
      />
    </>
  );
};

export default InputWithLabel;
