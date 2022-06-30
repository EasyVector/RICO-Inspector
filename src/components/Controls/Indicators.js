import React from "react";
import { StyleSheet, css } from "aphrodite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import {
  faCheckCircle,
  faTimesCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

const ValidJsonIndicator = ({ isValidJson, isLoadingJson }) => {
  const validIconClass = () => {
    if (isValidJson === undefined) {
      return css(styles.iconGray);
    } else if (isValidJson) {
      return css(styles.iconValid);
    } else {
      return css(styles.iconInvalid);
    }
  };

  return (
    <>
      {isLoadingJson ? (
        <FontAwesomeIcon icon={faSpinner} pulse fixedWidth color="#aaa" />
      ) : (
        <>
          <FontAwesomeIcon
            className={validIconClass()}
            icon={isValidJson ? faCheckCircle : faTimesCircle}
            data-tip
            data-for="validationIcon"
          />
          <ReactTooltip
            id="validationIcon"
            type={isValidJson ? "success" : "error"}
            effect="solid"
            place="bottom"
          >
            {isValidJson ? <span>Valid JSON</span> : <span>Invalid JSON</span>}
          </ReactTooltip>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconGray: {
    color: "#aaaaaa"
  },
  iconValid: {
    color: "#3A9830"
  },
  iconInvalid: {
    color: "#C84730"
  }
});

export default React.memo(ValidJsonIndicator);

//
