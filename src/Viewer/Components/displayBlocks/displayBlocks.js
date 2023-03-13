import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const displayBlocks = (props) => {
  const [components, setComponents] = useState(null);

  useEffect(() => {
    const alteredBlocks = props.data.blocks.map((block) => {
      return {
        ...block,
        key: uuid(),
      };
    });

    setComponents(alteredBlocks);
  }, [props.data]);
  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <div>
        {components &&
          components.map(({ key, Component, Data }) => {
            return <Component id={key} Data={Data} />;
          })}
      </div>
    </div>
  );
};

export default displayBlocks;
