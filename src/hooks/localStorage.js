import { useState, useEffect } from "react";
const Prefix = "code-editor-";

const LocalStorage = ({ key, initialValue }) => {
  const prefixedKey = Prefix + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
};
export default LocalStorage;
