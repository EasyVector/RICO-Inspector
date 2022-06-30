import React from "react";
import { StyleSheet, css } from "aphrodite";

import HighlightQuery from "./HighlightQuery";
//
const itemLabel = (element, i, rootElement, parent) => {
  const childIsArray = Array.isArray(element);
  const childIsObjectLiteral =
    typeof element === "object" && !childIsArray && !rootElement;
  const numChildren = Object.keys(element).length;

  try {
    if (childIsArray) {
      return {
        text: parent || "array",
        decorator: `[${element.length}]`
      };
    } else if (childIsObjectLiteral) {
      return {
        text: parent || "object",
        decorator: `{${numChildren}}`
      };
    } else {
      return {
        text: `${i}` || "object",
        decorator: `{${numChildren}}`
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const ItemLabel = ({ element, i, rootElement, parent, query }) => {
  const { text, decorator } = itemLabel(element, i, rootElement, parent);
  // console.log(text);
  return (
    <span className={css(styles.gray)}>
      {text.includes(query) ? (
        <HighlightQuery query={query}>{text}</HighlightQuery>
      ) : (
        <>{text}</>
      )}{" "}
      {decorator}
    </span>
  );
};

export default React.memo(ItemLabel);

const styles = StyleSheet.create({
  gray: {
    color: "#495057"
  }
});

//
