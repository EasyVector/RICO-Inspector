import React from "react";
import { StyleSheet, css } from "aphrodite";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";

export const ExpandAllButton = ({ onClick, expandAll, disableInput }) => {
  return (
    <button onClick={onClick} disabled={disableInput}>
      {expandAll ? (
        <FontAwesomeIcon icon={faMinusSquare} fixedWidth />
      ) : (
        <FontAwesomeIcon icon={faPlusSquare} fixedWidth />
      )}
    </button>
  );
};

export const ToggleCodeViewButton = ({ onClick, showCodeView }) => {
  const codeViewButtonStyles = showCodeView
    ? css(styles.codeButton, styles.active)
    : css(styles.codeButton);

  return (
    <>
      <button
        data-tip
        data-for="toggleCodeView"
        className={codeViewButtonStyles}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faCode} fixedWidth />
      </button>
      <ReactTooltip id="toggleCodeView" effect="solid" place="bottom">
        <span>View Raw</span>
      </ReactTooltip>
    </>
  );
};

const styles = StyleSheet.create({
  codeButton: {
    color: "#aaaaaa",
    ":hover": {
      color: "#4590B5"
    },
    margin: "0 1em 0 0"
  },
  active: {
    color: "#4590B5"
  }
});

////
