import blocks from "../components/blocks/blocksData";
import { v4 as uuid } from "uuid";

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
  textFromComponent,
  index,
  components,
  tag,
  clickedComponentId
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
  index == null
    ? (newData[tag].text = textFromComponent)
    : (newData[index][tag].text = textFromComponent);

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
  clickedCardIndex,
  tag
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

  if (clickedCardIndex === null) {
    newData[tag] = {
      ...newData[tag],
      ...stateFromTextEditor,
    };
  } else {
    newData[clickedCardIndex][tag] = {
      ...newData[clickedCardIndex][tag],
      ...stateFromTextEditor,
    };
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
