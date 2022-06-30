import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import TreeKeyValue from "./TreeKeyValue";
import ItemLabel from "./ItemLabel";

const TreeChild = ({ parent, rootElement, element, i, expand, query }) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  const handleExpandElement = () => {
    setExpanded((expanded) => !expanded);
  };

  const itemLabelProps = {
    element,
    i,
    rootElement,
    parent,
    query
  };

  return (
    <div className={css(styles.tree)}>
      <div className={css(styles.element)}>
        <button onClick={handleExpandElement}>
          <FontAwesomeIcon
            fixedWidth
            color="#495057"
            icon={expanded ? faChevronDown : faChevronRight}
            size="xs"
          />
        </button>
        <span className={css(styles.gray)}>
          <ItemLabel {...itemLabelProps} />
          {/* {itemLabel(element, i, rootElement, parent)} */}
        </span>
      </div>
      {element &&
        Object.keys(element).map((subel, i) => {
          return (
            <div
              key={i}
              className={
                !expanded
                  ? css(styles.minimize, styles.element)
                  : css(styles.element)
              }
            >
              <div className={css(styles.indent)}>
                {typeof element[subel] !== "object" ||
                element[subel] == null ? (
                  <TreeKeyValue
                    query={query}
                    objectKey={subel}
                    value={element[subel]}
                  />
                ) : (
                  <TreeChild
                    title="List"
                    query={query}
                    index={i}
                    parent={subel}
                    element={element[subel]}
                    expand={expand}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(TreeChild);

const styles = StyleSheet.create({
  minimize: {
    display: "none"
  },
  element: {
    margin: "0.2em 0 0.2em -0.5em"
    // padding: "0.2em 0"
    // marginLeft: "-1em"
  },
  indent: {
    marginLeft: "3em"
  },
  tree: {
    fontFamily: "monospace",
    borderLeft: "1px dotted #E6D6EB"
  },
  gray: {
    color: "#495057"
  }
});

//
