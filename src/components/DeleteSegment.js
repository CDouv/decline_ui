import React from "react";

export const DeleteSegment = ({ deleteSegment }) => {
  return (
    <div>
      <button className="calculateButton" onClick={() => deleteSegment()}>
        Delete Segment
      </button>
    </div>
  );
};

export default DeleteSegment;
