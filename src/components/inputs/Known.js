import React from "react";
import { useState } from "react";

export const Known = ({ parameter, segmentNumber, changeInput }) => {
  const [param, setParam] = useState("");
  const [paramError, setParamError] = useState("false");

  const validateParam = (val) => {
    if (isNaN(val)) {
      setParamError("true");
    } else {
      setParamError("false");
    }

    console.log(paramError);
  };

  return (
    <div className={`${paramError === "true" ? "inputErr" : "input"}`}>
      <form>
        <input
          type="text"
          value={param}
          onChange={(e) => {
            validateParam(e.target.value);
            setParam(e.target.value);
            changeInput(parameter.symbol, e.target.value, segmentNumber);
          }}
        />
      </form>
    </div>
  );
};

export default Known;
