import React from "react";
import key from "weak-key";
import TreeChild from "./TreeChild";

const Tree = (props) => {
  return (
    <div style={props.style}>
      {Object.keys(props.data).length !== 0 &&
        (Array.isArray(props.data) ? (
          props.data.map((el, i) => {
            return (
              <TreeChild
                rootElement
                query={props.query}
                key={key(el)}
                element={el}
                i={i}
                expand={props.expandAll}
              />
            );
          })
        ) : (
          <TreeChild
            query={props.query}
            element={props.data}
            expand={props.expandAll}
          />
        ))}
    </div>
  );
};

export default React.memo(Tree);

//
