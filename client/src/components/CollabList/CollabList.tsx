import React from "react";
import "./CollabList.css";

function CollabList({ children }) {
  return (
    <>
      <div className="collabList">{children}</div>
    </>
  );
}

export default CollabList;
