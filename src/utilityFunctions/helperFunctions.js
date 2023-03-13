import blocks from "../components/blocks/blocksData";
import { v4 as uuid } from "uuid";
import Header1 from "../components/blocks/Header1/Header1";
import Features2 from "../components/blocks/Features2/Features2";
import axios from "axios";
import { getUserData } from "./authFunctions";
import Header2 from "../components/blocks/Header2/Header2";
import Header3 from "../components/blocks/Header3/Header3";
import Features1 from "../components/blocks/Features1/Features1";
import Features3 from "../components/blocks/Features3/Features3";
import Faq1 from "../components/blocks/FAQ/Faq1";

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
export const changeBackgroundImage = (
  imageURL,
  idFromComponent,
  components
) => {
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
  updatedComponent.Data.data.img = imageURL;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
export const changeBackgroundColor = (color, idFromComponent, components) => {
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
  updatedComponent.Data.data.bgColor = color;

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
      case "Header2":
        block.Component = Header2;
        break;
      case "Header3":
        block.Component = Header3;
        break;
      case "Features1":
        block.Component = Features1;
        break;
      case "Features2":
        block.Component = Features2;
        break;
      case "Features3":
        block.Component = Features3;
        break;
      case "Faq1":
        block.Component = Faq1;
        break;
    }
    return block;
  });
};

export const unmapBlocks = (Blocks) => {
  return Blocks.map((block) => {
    const componentMap = {
      [Header1]: "Header1",
      [Header2]: "Header2",
      [Header3]: "Header3",
      [Features1]: "Features1",
      [Features2]: "Features2",
      [Features3]: "Features3",
      [Faq1]: "Faq1",
    };
    block.Component = componentMap[block.Component];
    return block;
  });
};

export const SavedTemplate = async (template) => {
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  if (template.pages?.HomePage?.blocks.length > 0) {
    console.log(template.type);
    const Blocks = unmapBlocks(template.pages.HomePage.blocks);
    console.log(Blocks);
    await axios
      .post("http://localhost:8800/api/blocks/saveBlocks", {
        blocks: Blocks,
      })
      .then((res) => {
        homepageBlockIds = res.data.savedBlockKeys;
        //save
      })
      .catch((err) => {
        console.error(err);
      });
  }
  switch (template.type) {
    case "blog":
      {
        if (template.pages.BlogsPage?.blocks.length > 0) {
          const Blocks = unmapBlocks(template.pages.BlogsPage.blocks);

          await axios
            .post("http://localhost:8800/api/blocks/saveBlocks", {
              blocks: Blocks,
            })
            .then((res) => {
              mainpageBlockIds = res.data.savedBlockKeys;
              console.log("mainpageBlockIds", mainpageBlockIds);
              //save
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (template.data?.blogs) {
          mainPageDataIds = template.data?.blogs;
        }
        const userData = await getUserData();
        console.log(userData);

        //save template in template schema
        console.log(homepageBlockIds, mainpageBlockIds, mainPageDataIds);
        axios
          .post("http://localhost:8800/api/templates/saveTemplate", {
            username: userData.username,
            template: {
              type: template.type,
              pages: {
                HomePage: {
                  blocks: homepageBlockIds,
                },
                BlogsPage: {
                  blocks: mainpageBlockIds,
                },
              },
              data: {
                blogs: mainPageDataIds,
              },
            },
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data.message);
              return Promise.resolve({ msg: res.data.message });
            } else if (res.status === 500) {
              console.error(res.data.message);
              return Promise.reject({ error: "err" });
            }
          })
          .catch((err) => {
            console.error(err);
            return Promise.reject({ error: "err" });
          });
      }
      break;
  }
};

export const UpdateTemplate = async (template, id) => {
  console.log("in update template");
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  if (template.pages?.HomePage?.blocks.length > 0) {
    console.log(template.type);
    const Blocks = unmapBlocks(template.pages.HomePage.blocks);
    console.log(Blocks);
    await axios
      .post("http://localhost:8800/api/blocks/updateBlocks", {
        blocks: Blocks,
      })
      .then((res) => {
        homepageBlockIds = res.data.updatedBlockKeys;
        //save
      })
      .catch((err) => {
        console.error(err);
      });
  }
  switch (template.type) {
    case "blog":
      {
        if (template.pages.BlogsPage?.blocks.length > 0) {
          const Blocks = unmapBlocks(template.pages.BlogsPage.blocks);

          await axios
            .post("http://localhost:8800/api/blocks/updateBlocks", {
              blocks: Blocks,
            })
            .then((res) => {
              mainpageBlockIds = res.data.updatedBlockKeys;
              //save
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (template.data?.blogs) {
          mainPageDataIds = template.data?.blogs;
        }
        const userData = await getUserData();
        console.log(userData);

        //save template in template schema
        console.log(homepageBlockIds, mainpageBlockIds, mainPageDataIds);
        axios
          .post("http://localhost:8800/api/templates/updateTemplate", {
            template: {
              id,
              type: template.type,
              pages: {
                HomePage: {
                  blocks: homepageBlockIds,
                },
                BlogsPage: {
                  blocks: mainpageBlockIds,
                },
              },
              data: {
                blogs: mainPageDataIds,
              },
            },
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data.message);
            } else if (res.status === 500) {
              console.log(res.data.message);
            }
          })
          .catch((err) => {
            console.log("this is the eror");
            console.log(err);
          });
      }
      break;
  }
};

// //blog template
// blocks - homepage;
// blocks - mainpage;
// blogs - mainpage;
// //eccomerce template
// blocks - homepage;
// blocks - mainpage;
// products - mainpage;
