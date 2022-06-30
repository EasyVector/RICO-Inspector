const itemLabel = (element, i, rootElement, parent) => {
  try {
    if (Array.isArray(element)) {
      return `${parent || "array"} [${element.length}]`;
    } else if (
      typeof element === "object" &&
      !Array.isArray(element) &&
      !rootElement
    ) {
      return `${parent || "object"} {${Object.keys(element).length}}`;
    } else {
      return `${i} {${Object.keys(element).length}}`;
    }
  } catch (e) {
    console.error(e);
  }
};

export default itemLabel