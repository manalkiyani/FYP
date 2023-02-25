import blocks from "../components/blocks/blocksData";
import { v4 as uuid } from "uuid";
import Header1 from "../components/blocks/Header1/Header1";
import Features2 from "../components/blocks/Features2/Features2";
import axios from "axios";

export const handleLayout = (numberOfCards, idFromComponent, components) => {
  let position = 0;
  let componentsList = [...components];

  //get the cliked components position and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);
  //update component data
  const updatedComponent = {
    ...component,
  };
  updatedComponent["Data"]["layout"] = numberOfCards;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
  // //update the state
  // this.setState({
  //   components: componentsList,
  // });
};

export const deleteCard = (index, idFromComponent, components) => {
  let position = 0;
  let componentsList = [...components];

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);
  // update components data

  let newData = JSON.parse(JSON.stringify(component.Data.data));
  let refinedData = {};

  Object.getOwnPropertyNames(newData).map((val) => {
    if (val !== index) {
      refinedData[val] = newData[val];
    }
  });

  let count = 0;
  let revisedData = {};
  //to revise numbering so cards not numbered randomly , they are in sequence
  Object.getOwnPropertyNames(refinedData).map((val) => {
    count++;
    revisedData[count] = refinedData[val];
  });

  const updatedComponent = {
    ...component,
  };
  updatedComponent["Data"]["data"] = revisedData;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};

export const deleteBlock = (idFromComponent, components) => {
  let componentsList = [...components];
  const position = componentsList.findIndex(
    (ele) => ele.key === idFromComponent
  );

  //delete component from components list
  componentsList.splice(position, 1);
  //update the state

  return componentsList;
};
export const handleAddCard = (idFromComponent, components) => {
  let position = 0;
  const componentsList = [...components];

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = JSON.parse(JSON.stringify(component.Data.data));
  let count = 0;
  Object.getOwnPropertyNames(newData).forEach(() => count++);
  count = count + 1;
  const cards = blocks.find((ele) => ele.Component === component.Component);
  const i = Math.floor(Math.random() * 3) + 1;
  newData[count] = cards.Data.data[i];
  const updatedComponent = {
    ...component,
  };
  updatedComponent["Data"]["data"] = newData;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};

export const handleSocialIcons = (socialIcons, idFromComponent, components) => {
  let position = 0;
  let componentsList = [...components];

  //get the cliked components position and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);
  //update component data
  const updatedComponent = {
    ...component,
  };
  updatedComponent["Data"]["socialIcons"] = socialIcons;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};

export const changeComponentText = (
  components,
  textFromComponent,
  index,
  tag,
  id,
  type
) => {
  let position = 0;

  const componentsList = [...components];

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === id;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = JSON.parse(JSON.stringify(component.Data.data));

  if (type === "header1" || type === "header2" || type === "header3") {
    newData[tag].text = textFromComponent;
  } else if (
    type === "features1" ||
    type === "features2" ||
    type === "features3"
  ) {
    newData[index][tag].text = textFromComponent;
  } else if (type === "faq1") {
    if (tag === "heading") {
      newData[tag].text = textFromComponent;
    } else {
      newData.faqList[index][tag] = textFromComponent;
    }
  }
  const updatedComponent = { ...component };
  updatedComponent["Data"]["data"] = newData;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
export const dragStartHandler = (event) => {
  event.dataTransfer.setData("key", event.target.id);
};
export const dropHandler = (event, components) => {
  event.preventDefault();
  const droppedComponentId = event.dataTransfer.getData("key");
  const droppedComponent = blocks.filter(
    (item) => item.type === droppedComponentId
  );

  const requiredComponent = droppedComponent.map((item) => {
    return { key: uuid(), ...item };
  });

  //adding newly Dropped component to list of components

  const updatedComponents = [...components, ...requiredComponent];
  // window.scrollTo(0, document.body.scrollHeight);
  return updatedComponents;

  //
};
export const updateComponentData = (
  stateFromTextEditor,
  components,
  clickedComponentId,
  index,
  tag,
  type
) => {
  let position = 0;
  const componentsList = [...components];

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === clickedComponentId;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = JSON.parse(JSON.stringify(component.Data.data));
  if (type === "header1" || type === "header2" || type === "header3") {
    newData[tag] = {
      ...newData[tag],
      ...stateFromTextEditor,
    };
  } else if (
    type === "features1" ||
    type === "features2" ||
    type === "features3"
  ) {
    newData[index][tag] = {
      ...newData[index][tag],
      ...stateFromTextEditor,
    };
  } else if (type === "faq1") {
    if (tag === "heading") {
      newData[tag] = {
        ...newData[tag],
        ...stateFromTextEditor,
      };
    } else {
      newData.style[tag] = {
        ...newData.style[tag],
        ...stateFromTextEditor,
      };
      console.log(newData);
    }
  }

  const updatedComponent = { ...component };
  updatedComponent["Data"]["data"] = newData;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};

export const dragEndHandler = (result, components) => {
  if (!result.destination) return;

  const items = [...components];
  //delete component from prev location
  const [reorderedItem] = items.splice(result.source.index, 1);
  //add component to new location
  items.splice(result.destination.index, 0, reorderedItem);

  return items;
};
export const dragOverHandler = (event) => {
  event.preventDefault();
  return false;
};

export const mapBlocks = (Blocks) => {
  return Blocks.map((block) => {
    switch (block.Component) {
      case "Header1":
        block.Component = Header1;
        break;
      case "Features2":
        block.Component = Features2;
    }
    return block;
  });
};
export const SavedTemplate = (template) => {
  //first send blocks of homepage
  //send blocks to backend to save

  if (template.pages.HomePage?.blocks.length > 0) {
    const Blocks = mapBlocks(template.pages.HomePage.blocks);

    axios
      .post("http://localhost:8800/api/blocks/saveBlocks", {
        blocks: Blocks,
      })
      .then((res) => {
        const blockIds = res.data.savedBlockIds;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
