import Header from "./components/Header";
import Parameters from "./components/Parameters";
import Calculate from "./components/Calculate";

import "./App.css";
import { useState } from "react";
import { queries } from "@testing-library/react";
const axios = require("axios").default;

const App = () => {
  const [parameters, setParameters] = useState([
    {
      text: "Initial Flow Rate",
      symbol: "qi",
      units: "bbl/d",
      calculate: false,
      input: null,
    },

    {
      text: "Final Flow Rate",
      symbol: "qf",
      units: "bbl/d",
      calculate: false,
      input: null,
    },

    {
      text: "Decline Rate",
      symbol: "d",
      units: "%/yr",
      calculate: false,
      input: null,
    },

    {
      text: "Segment Duration",
      symbol: "t",
      units: "years",
      calculate: false,
      input: null,
    },

    {
      text: "Segment Reserves",
      symbol: "np",
      units: "mbbl",
      calculate: false,
      input: null,
    },
  ]);

  const exportParameters = () => {
    // let inputs = [];
    // parameters.map((parameter) => inputs.push(parameter));
    // let jsonInputs = { ...inputs };
    let jsonInputs = parameters[0];

    return jsonInputs;
  };

  const countUnknowns = () => {
    let knownsCount = 0;
    let unknownsCount = 0;

    parameters.map((parameter) =>
      parameter.calculate === true ? (knownsCount += 1) : (unknownsCount += 1)
    );

    console.log(
      `There are ${knownsCount} knowns and ${unknownsCount} unknowns`
    );

    return knownsCount, unknownsCount;
  };

  let data = exportParameters();
  data = JSON.stringify(data);
  console.log(data);
  console.log(typeof data);

  // Test connecting to back-end

  const sendJSON = async () => {
    let url = "http://localhost:8000/solve";

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(data);
    console.log(data);
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/solve",
      withCredentials: false,
    });

    console.log(response.data);
  };

  sendJSON();

  const toggleCalculate = (symbol) => {
    const newParameters = parameters.map((parameter) => {
      if (parameter.symbol === symbol) {
        const newCalculate = !parameter.calculate;
        if (newCalculate) {
          return { ...parameter, calculate: newCalculate };
        } else {
          return { ...parameter, calculate: newCalculate, input: null };
        }
      } else {
        return parameter;
      }
    });
    setParameters(newParameters);
  };

  const toggleChangeInput = (symbol, val) => {
    setParameters(
      parameters.map((parameter) =>
        parameter.symbol === symbol ? { ...parameter, input: val } : parameter
      )
    );
  };

  const clearInput = (symbol) => {
    const newParameters = parameters.map((parameter) =>
      parameter.symbol === symbol && !parameter.calculate
        ? { ...parameter, input: null }
        : parameter
    );
    console.log(newParameters);

    setParameters(newParameters);
  };

  return (
    <div className="container">
      <Header title="Decline Calculator" />
      <Parameters
        parameters={parameters}
        onToggle={toggleCalculate}
        changeInput={toggleChangeInput}
        clearInput={clearInput}
      />
      <Calculate countUnknowns={countUnknowns} />
    </div>
  );
};

export default App;
