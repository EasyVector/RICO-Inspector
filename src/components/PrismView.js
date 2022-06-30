import React from "react";
import { StyleSheet, css } from "aphrodite";
import Highlight, { defaultProps } from "prism-react-renderer";

const PrismView = ({ code }) => {
  return (
    <Highlight {...defaultProps} code={code} language="json">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className={css(styles.prismView)} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const styles = StyleSheet.create({
  prismView: {
    padding: "2em",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    borderRadius: "1em"
  }
});

export default React.memo(PrismView);

//
