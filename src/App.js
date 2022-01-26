import Header from "./components/Header";
import Parameters from "./components/Parameters";
import Calculate from "./components/Calculate";

import "./App.css";
import { useState } from "react";
import { queries } from "@testing-library/react";
import { isCompositeComponent } from "react-dom/test-utils";
const axios = require("axios").default;

const App = () => {
  const [segments, setSegments] = useState([
    {
      product: "oil",
      segmentNumber: 1,
      parameters: [
        {
          text: "Initial Flow Rate",
          symbol: "qi",
          units: "bbl/d",
          calculate: false,
          input: undefined,
        },

        {
          text: "Final Flow Rate",
          symbol: "qf",
          units: "bbl/d",
          calculate: false,
          input: undefined,
        },

        {
          text: "Decline Rate",
          symbol: "d",
          units: "%/yr",
          calculate: false,
          input: undefined,
        },

        {
          text: "Segment Duration",
          symbol: "t",
          units: "years",
          calculate: false,
          input: undefined,
        },

        {
          text: "Segment Reserves",
          symbol: "np",
          units: "mbbl",
          calculate: false,
          input: undefined,
        },
      ],
    },
  ]);

  const toggleChangeInput = (symbol, val) => {
    setSegments(
      segments.map((parameter) =>
        parameter.symbol === symbol ? { ...parameter, input: val } : parameter
      )
    );
  };

  const updateInputs = (arr) => {
    setSegments(
      segments.map((parameter, index) => ({
        ...parameter,
        input: arr[index],
      }))
    );
  };

  const exportParameters = () => {
    let jsonInputs = segments;

    return jsonInputs;
  };

  const countUnknowns = () => {
    let knownsCount = 0;
    let unknownsCount = 0;
    let segmentNumber = 1;
    //Determine parameters to reference
    let params = [segments[segmentNumber - 1].parameters];

    params.map((parameter) =>
      parameter.calculate === true ? (knownsCount += 1) : (unknownsCount += 1)
    );

    console.log(
      `There are ${knownsCount} knowns and ${unknownsCount} unknowns`
    );

    return knownsCount, unknownsCount;
  };

  const toggleCalculate = (symbol) => {
    let segmentNumber = 1;
    //Determine parameters to reference
    let params = segments[segmentNumber - 1].parameters;
    //Copy parameter, change calculate field
    let newParameters = params.map((parameter) => {
      console.log("parameter", parameter);
      if (parameter.symbol === symbol) {
        const newCalculate = !parameter.calculate;
        if (newCalculate) {
          return { ...parameter, calculate: newCalculate, input: undefined };
        } else {
          return { ...parameter, calculate: newCalculate, input: undefined };
        }
      } else {
        return parameter;
      }
    });

    //Copy segments, add in new parameters
    let newSegments = [{ ...segments }];
    newSegments[segmentNumber - 1].parameters = newParameters;

    //testing cloning

    setSegments(newSegments);
  };

  // const copySegment = () => {
  //   let currentSegment = segments[parameters.length - 1];

  //   let addlSegment = _.cloneDeep(currentSegment);
  //   addlSegment.segmentNumber = currentSegment.segmentNumber + 1;

  //   //Loop through addlSegment, clear input values

  //   addlSegment.parameters.map((parameter) => ({
  //     ...parameter,
  //     input: undefined,
  //     calculate: false,
  //   }));

  //Add addlSegment to state

  // setSegments((parameters) => [...parameters, addlSegment]);
  // };

  // copySegment();

  // Test connecting to back-end

  const sendJSON = async () => {
    let url = "http://localhost:8000/solve";
    let data = exportParameters();
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(data);
    data = JSON.stringify(data);

    try {
      const resp = await axios.post(url, data, config);
      console.log(resp.data);

      updateInputs(resp.data.parameters);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Header title="Decline Calculator" />
      <Parameters
        parameters={segments[0].parameters}
        changeInput={toggleChangeInput}
        onToggle={toggleCalculate}
        segmentNumber={segments[0].segmentNumber}
      />

      <Calculate
        countUnknowns={countUnknowns}
        exportParameters={exportParameters}
        sendJSON={sendJSON}
      />
    </div>
  );
};

export default App;
