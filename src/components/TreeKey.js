import React from "react";
import { StyleSheet, css } from "aphrodite";

import HighlightQuery from "./HighlightQuery";

const TreeKey = ({ query, text }) => {
  return (
    <span className={css(styles.spacing)}>
      {text.toLowerCase().includes(query.toLowerCase()) && query !== "" ? (
        <>
          <HighlightQuery query={query}>{text}</HighlightQuery>:&nbsp;
        </>
      ) : (
        <>{text}:&nbsp;</>
      )}
    </span>
  );
};

export default React.memo(TreeKey);

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    backgroundColor: "#FEF9B8",
    borderRadius: "0.2em"
  },
  spacing: {
    // padding: "0.2em 0"
  }
});

//
