import React from "react";

const InputWithLabel = ({ value, onChange, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        type="text"
        id="todoTitle1"
        name="title"
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputWithLabel;
