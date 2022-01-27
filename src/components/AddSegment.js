import React from "react";

export const AddSegment = ({ copySegment }) => {
  return (
    <div>
      <button className="calculateButton" onClick={() => copySegment()}>
        Add Segment
      </button>
    </div>
  );
};

export default AddSegment;
