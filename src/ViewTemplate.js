import { useLocalStorageState } from "ahooks";
import React from "react";
import axios from "axios";

const ViewTemplate = () => {
  const viewBlocks = async () => {
    let template = localStorage.getItem("template");

    template = await JSON.parse(template);
    console.log("template here: ", template);
  };

  return (
    <div>
      <button onClick={viewBlocks}>View Blocks</button>
    </div>
  );
};

export default ViewTemplate;
