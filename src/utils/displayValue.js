const displayValue = (value) => {
  if (value === null) {
    return "null";
  } else if (value === "") {
    return '""';
  } else {
    return value.toString();
  }
};

export default displayValue;
