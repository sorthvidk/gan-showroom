// rm keys with value null from obj
export const removeNull = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== null) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};
