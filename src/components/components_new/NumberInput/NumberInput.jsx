import React, { useEffect, useState } from "react";
import './NumberInput.scss'

export default function NumberInput({ value, min, max, onCommit, className }) {
  const [txt, setTxt] = useState(value);

  useEffect(() => setTxt(value), [value]);

  const apply = () => {
    let v = parseInt(txt, 10);
    if (isNaN(v)) v = value;
    v = Math.min(max, Math.max(min, v));
    onCommit(v);
  };

  return (
    <input
      type="text"
      className={className}
      inputMode="numeric"
      value={txt}
      onChange={(e) => setTxt(e.target.value.replace(/\D/g, ""))}
      onBlur={apply}
      onKeyDown={(e) => e.key === "Enter" && apply()}
      style={{
        border: "none",
        outline: "none",
        background: "transparent",
        width: "100%",
        fontSize: 28,
      }}
    />
  );
}
