import React from "react";
import { StyleSheet, css } from "aphrodite";

const FilterInput = ({
  placeholder,
  showCodeView,
  isValidJson,
  setSearchValue
}) => {
  const disableInput = showCodeView || !isValidJson;

  const onChange = (e) => {
    const openQueryRegex = /^\{/;

    if (!openQueryRegex.test(e.target.value)) {
      setSearchValue(e.target.value);
    }
  };

  return (
    <input
      className={css(styles.input)}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      disabled={disableInput}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    border: "1px solid #aaaaaa",
    padding: "0.5em",
    margin: "0 1em",
    borderRadius: "0.5em",
    outline: "none"
  }
});

export default React.memo(FilterInput);

//
