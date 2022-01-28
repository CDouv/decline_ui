import Header from "./components/Header";
import Parameters from "./components/Parameters";
import Calculate from "./components/Calculate";
import AddSegment from "./components/AddSegment";
import DeleteSegment from "./components/DeleteSegment";

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
      forecastType: "exponential",
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
          units: "nominal %/yr",
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

  const updateInputs = (arr) => {
    setSegments(
      segments.map((parameter, index) => ({
        ...parameter,
        input: arr[index],
      }))
    );
  };

  const toggleChangeInput = (symbol, val, segmentNumber) => {
    //Determine parameters to reference
    let params = segments[segmentNumber - 1].parameters;
    //Copy parameter, change inputs
    let newParameters = params.map((parameter) => {
      if (parameter.symbol === symbol) {
        //check if value is a number

        if (isNaN(val.trim()) || val.trim().length === 0) {
          return { ...parameter, input: val };
        } else {
          return { ...parameter, input: parseInt(val) };
        }
      } else {
        return parameter;
      }
    });

    //Copy segments, add in new parameters
    let newSegments = segments.map((seg) => {
      return { ...seg };
    });
    newSegments[segmentNumber - 1].parameters = newParameters;

    return setSegments(newSegments);
  };

  const toggleCalculate = (symbol, segmentNumber) => {
    //Determine parameters to reference
    let params = segments[segmentNumber - 1].parameters;
    //Copy parameter, change calculate field
    let newParameters = params.map((parameter) => {
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
    let newSegments = segments.map((seg) => {
      return { ...seg };
    });
    newSegments[segmentNumber - 1].parameters = newParameters;

    return setSegments(newSegments);
  };

  const toggleUnits = (symbol, segmentNumber) => {
    //Determine parameters to reference
    let params = segments[segmentNumber - 1].parameters;
    //Copy parameter, change units and convert value
    let newParameters = params.map((parameter) => {
      if (parameter.symbol === symbol) {
        if (parameter.symbol === "d") {
          if (typeof parameter.input === "number") {
            switch (parameter.units) {
              case "nominal %/yr":
                return { ...parameter, units: "secant effective %/yr" };
              case "secant effective %/yr":
                return { ...parameter, units: "nominal %/yr" };
            }
          } else {
            switch (parameter.units) {
              case "nominal %/yr":
                return { ...parameter, units: "secant effective %/yr" };
              case "secant effective %/yr":
                return { ...parameter, units: "nominal %/yr" };
            }
          }
        }

        //symbol == duration
        if (parameter.symbol === "t") {
          if (typeof parameter.input === "number") {
            switch (parameter.units) {
              case "years":
                let newDaysInput = parameter.input * 365;
                console.log("new days", newDaysInput);
                return { ...parameter, units: "days", input: newDaysInput };
              case "days":
                let newYearsInput = parameter.input / 365;
                return { ...parameter, units: "years", input: newYearsInput };
            }
          } else {
            switch (parameter.units) {
              case "years":
                console.log("this one");
                console.log(typeof parameter.input);
                return { ...parameter, units: "days" };
              case "days":
                return { ...parameter, units: "years" };
            }
          }
        }
        return parameter;
      } else {
        return parameter;
      }
    });

    //Copy segments, add in new parameters
    let newSegments = segments.map((seg) => {
      return { ...seg };
    });
    newSegments[segmentNumber - 1].parameters = newParameters;

    return setSegments(newSegments);
  };

  const copySegment = () => {
    //Copy original segments
    let segmentsCopy = segments.map((seg) => {
      return { ...seg };
    });

    //Copy the last object in the array
    let newSegment = { ...segments[segments.length - 1] };

    //Define new parameters, zero out the inputs
    let newParameters = newSegment.parameters.map((parameter) => {
      return { ...parameter, input: undefined };
    });
    //Set segmentNumber = prev obj segmentNumber + 1
    newSegment.segmentNumber = segments[segments.length - 1].segmentNumber + 1;

    //add new parameters to new segment
    newSegment.parameters = newParameters;

    segmentsCopy.push(newSegment);

    setSegments(segmentsCopy);
  };

  const deleteSegment = () => {
    //Copy original segments
    let segmentsCopy = segments.map((seg) => {
      return { ...seg };
    });

    if (segmentsCopy.length == 1) {
      return;
    } else {
      segmentsCopy.pop();
    }

    setSegments(segmentsCopy);
  };

  const exportParameters = () => {
    let jsonInputs = segments[0];

    return jsonInputs;
  };

  console.log(JSON.stringify(exportParameters()));

  const countUnknowns = (segmentNumber) => {
    let knownsCount = 0;
    let unknownsCount = 0;

    //Determine parameters to reference
    let params = segments[segmentNumber - 1].parameters;

    params.map((parameter) =>
      parameter.calculate === true ? (knownsCount += 1) : (unknownsCount += 1)
    );

    console.log(
      `There are ${knownsCount} knowns and ${unknownsCount} unknowns`
    );

    return knownsCount, unknownsCount;
  };

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
      <div className="forecast">
        {segments.map((segment, index) => (
          <div className="segment">
            <Parameters
              parameters={segments[index].parameters}
              changeInput={toggleChangeInput}
              onToggle={toggleCalculate}
              segmentNumber={segments[index].segmentNumber}
              toggleUnits={toggleUnits}
            />
          </div>
        ))}
      </div>
      <AddSegment copySegment={copySegment} />
      <DeleteSegment deleteSegment={deleteSegment} />
      <Calculate
        countUnknowns={countUnknowns}
        exportParameters={exportParameters}
        sendJSON={sendJSON}
      />
    </div>
  );
};

export default App;
