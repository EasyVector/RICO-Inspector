import React, { useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import ContentEditable from "react-contenteditable";

export const FilterInput = ({ onChange }) => {
  const text = useRef("");

  const handleChange = (e) => {
    text.current = e.target.value;
    onChange(text.current);
  };

  return (
    <ContentEditable
      className={css(styles.input)}
      html={text.current}
      onChange={handleChange}
    ></ContentEditable>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: "1em",
    border: "1px solid",
    padding: "0.5em",
    borderRadius: "0.5em",
    borderColor: "gray",
    color: "gray",
    display: "inline-block",
    minWidth: "10em",
    fontSize: "0.8em",
    outline: "none"
  }
});
