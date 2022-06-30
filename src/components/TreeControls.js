import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";
import {
  faCode,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

import ReactTooltip from "react-tooltip";

export const TreeControls = (props) => {
  const [loadUrl, setLoadUrl] = useState("");

  const handleLoadUrl = () => {
    if (loadUrl) {
      let url;
      try {
        url = new URL(loadUrl);
      } catch (e) {
        console.error("Please enter a valid URL");
      }

      if (url) {
        props.setIsLoadingJson(true);
        console.log(`loading URL: ${url.href}`);
        props.loadJsonFromURL(url.href);
      }
    }
  };

  const handleBlur = (e) => {
    setLoadUrl(e.target.value);
  };

  const disableInput = props.showCodeView || !props.isValidJson;

  const inputProps = {
    className: css(styles.input),
    type: "text",
    placeholder: "filter",
    onChange: props.handleChange,
    disabled: disableInput
  };

  const expandAllButtonProps = {
    onClick: props.toggleExpandAll,
    disabled: disableInput
  };

  const codeViewButtonStyles = props.showCodeView
    ? css(styles.codeButton, styles.active)
    : css(styles.codeButton);

  const showCodeViewButtonProps = {
    className: codeViewButtonStyles,
    onClick: props.toggleCodeView,
    disabled: !props.isValidJson
  };

  const validIconClass = () => {
    if (props.isValidJson === undefined) {
      return css(styles.iconGray);
    } else if (props.isValidJson) {
      return css(styles.iconValid);
    } else {
      return css(styles.iconInvalid);
    }
  };

  return (
    <div className={css(styles.controls)}>
      <button {...expandAllButtonProps}>
        {props.expandAll ? (
          <FontAwesomeIcon icon={faMinusSquare} fixedWidth />
        ) : (
          <FontAwesomeIcon icon={faPlusSquare} fixedWidth />
        )}
      </button>
      <input {...inputProps} />
      <button data-tip data-for="toggleCodeView" {...showCodeViewButtonProps}>
        <FontAwesomeIcon icon={faCode} fixedWidth />
      </button>
      <ReactTooltip id="toggleCodeView" effect="solid" place="bottom">
        <span>View Raw</span>
      </ReactTooltip>
      {props.isLoadingJson ? (
        <FontAwesomeIcon icon={faSpinner} pulse fixedWidth color="#aaa" />
      ) : (
        <>
          <FontAwesomeIcon
            className={validIconClass()}
            icon={props.isValidJson ? faCheckCircle : faTimesCircle}
            data-tip
            data-for="validationIcon"
          />
          <ReactTooltip
            id="validationIcon"
            type={props.isValidJson ? "success" : "error"}
            effect="solid"
            place="bottom"
          >
            {props.isValidJson ? (
              <span>Valid JSON</span>
            ) : (
              <span>Invalid JSON</span>
            )}
          </ReactTooltip>
        </>
      )}
      <div className={css(styles.addJsonSection)}>
        <input
          type="text"
          className={css(styles.input)}
          placeholder="Load URL"
          onBlur={handleBlur}
        />
        {props.isLoadingJson ? (
          <FontAwesomeIcon icon={faSpinner} pulse fixedWidth color="#aaa" />
        ) : (
          <>
            <button
              data-tip
              data-for="addJson"
              className={css(styles.plusButton)}
              onClick={handleLoadUrl}
            >
              <FontAwesomeIcon icon={faPlus} fixedWidth />
            </button>
            <ReactTooltip id="addJson" effect="solid" place="bottom">
              <span>Add JSON</span>
            </ReactTooltip>
          </>
        )}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginBottom: "1em"
  },
  input: {
    border: "1px solid #aaaaaa",
    padding: "0.5em",
    margin: "0 1em",
    borderRadius: "0.5em",
    outline: "none"
  },
  codeButton: {
    color: "#aaaaaa",
    ":hover": {
      color: "black"
    },
    margin: "0 1em 0 0"
  },
  addJsonSection: {
    float: "right"
  },
  plusButton: {
    color: "#C75FD9"
  },
  iconGray: {
    color: "#aaaaaa"
  },
  expandSection: {
    backgroundColor: "pink",
    padding: "1em",
    margin: "1em 0"
  },
  active: {
    color: "black"
  },
  iconValid: {
    color: "#3A9830"
  },
  iconInvalid: {
    color: "#C84730"
  }
});
