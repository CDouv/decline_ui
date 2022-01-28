import Parameter from "./Parameter";

export const Parameters = ({
  parameters,
  onToggle,
  changeInput,
  clearInput,
  segmentNumber,
  toggleUnits,
}) => {
  return (
    <>
      {parameters.map((parameter) => (
        <Parameter
          parameter={parameter}
          key={parameter.symbol}
          onToggle={onToggle}
          changeInput={changeInput}
          clearInput={clearInput}
          segmentNumber={segmentNumber}
          toggleUnits={toggleUnits}
        />
      ))}
    </>
  );
};

export default Parameters;
