const valueIsObject = (obj) => {
  return !Array.isArray(obj) && typeof obj === "object" && obj !== null;
};

// function getKeyByValue(object, value) {
//   return Object.keys(object).find((key) => object[key] === value);
// }

export const filterObjectByKey = (query, obj) => {
  const q = query.toLowerCase().trim();

  if (valueIsObject(obj)) {
    let buffer = {};
    for (let key in obj) {
      if (key.toLowerCase().includes(q) || valueIsObject(obj[key])) {
        if (valueIsObject(obj[key])) {
          let filteredValueObject = filterObjectByKey(q, obj[key]);
          if (Object.keys(filteredValueObject).length !== 0) {
            buffer[key] = filteredValueObject;
          }
        }

        if (key.toLowerCase().includes(q)) {
          buffer[key] = obj[key];
        }
      }
    }
    return buffer;
  } else if (Array.isArray(obj)) {
    return obj.map((n) => filterObjectByKey(q, n));
  }
};

// export const filterObjectByQuery = (query, obj) => {
//   const [parent, child] = query.replace("{", "").replace("}", "").split(".");
//   return obj.map((n) => {
//     let key = getKeyByValue(n[parent]);
//     console.log({
//       [key]: {
//         [n[parent]]: [n[child]]
//       }
//     });
//   });
// };
