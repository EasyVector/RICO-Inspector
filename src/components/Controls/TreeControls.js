import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { ExpandAllButton, ToggleCodeViewButton } from "./Buttons";
import ValidJsonIndicator from "./Indicators";
import AddJsonForm from "./AddJsonForm";
import FilterInput from "./FilterInput";

export const TreeControls = (props) => {
  const [loadUrl, setLoadUrl] = useState("");

  const handleLoadUrl = () => {
    console.log(loadUrl);
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

  const disableInput = props.showCodeView || !props.isValidJson;

  const inputProps = {
    placeholder: "filter",
    showCodeView: props.showCodeView,
    isValidJson: props.isValidJson,
    setSearchValue: props.setSearchValue
  };

  const toggleCodeViewButtonProps = {
    onClick: props.toggleCodeView,
    disabled: !props.isValidJson
  };

  const expandAllButtonProps = {
    onClick: props.toggleExpandAll,
    expandAll: props.expandAll,
    showCodeView: props.showCodeView,
    isValidJson: props.isValidJson,
    disableInput
  };

  const validJsonIndicatorProps = {
    isValidJson: props.isValidJson,
    isLoadingJson: props.isLoadingJson
  };

  const addJsonFormProps = {
    isLoadingJson: props.isLoadingJson,
    handleLoadUrl,
    setLoadUrl
  };

  return (
    <div className={css(styles.controls)}>
      <ExpandAllButton {...expandAllButtonProps} />
      <FilterInput {...inputProps} />
      <ToggleCodeViewButton {...toggleCodeViewButtonProps} />
      <ValidJsonIndicator {...validJsonIndicatorProps} />
      <AddJsonForm {...addJsonFormProps} />
    </div>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginBottom: "1em"
  }
});

//
