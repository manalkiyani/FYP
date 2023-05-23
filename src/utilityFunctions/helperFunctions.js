import blocks from "../components/blocks/blocksData";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { getUserData } from "./authFunctions";
import cloneDeep from "lodash/cloneDeep";

import Header1 from "../components/blocks/Header1/Header1";
import Header2 from "../components/blocks/Header2/Header2";
import Header3 from "../components/blocks/Header3/Header3";
import Features1 from "../components/blocks/Features1/Features1";
import Features2 from "../components/blocks/Features2/Features2";
import Features3 from "../components/blocks/Features3/Features3";
import { Features4 } from "../components/blocks/Features4/Features4";
import Faq1 from "../components/blocks/FAQ/Faq1";
import Gallery1 from "../components/blocks/Gallery1/Gallery1";
import Gallery2 from "../components/blocks/Gallery2/Gallery2";
import People1 from "../components/blocks/People/People1";
import People2 from "../components/blocks/People/People2";
import About1 from "../components/blocks/About1/About1";

import ViewerFaq1 from "../Viewer/Components/blocks/viewerFaq1";
import ViewerFeatures1 from "../Viewer/Components/blocks/viewerFeatures1";
import ViewerFeatures2 from "../Viewer/Components/blocks/viewerFeatures2";
import ViewerFeatures3 from "../Viewer/Components/blocks/viewerFeatures3";
import ViewerHeader1 from "../Viewer/Components/blocks/viewerHeader1";
import ViewerHeader2 from "../Viewer/Components/blocks/viewerHeader2";
import ViewerHeader3 from "../Viewer/Components/blocks/viewerHeader3";
import ViewerGallery1 from "../Viewer/Components/blocks/viewerGallery1";
import ViewerGallery2 from "../Viewer/Components/blocks/viewerGallery2";
import ViewerAbout1 from "../Viewer/Components/blocks/viewerAbout1";
import { ViewerFeatures4 } from "../Viewer/Components/blocks/viewerFeatures4";
import ViewerPeople1 from "../Viewer/Components/blocks/viewerPeople1";
import ViewerPeople2 from "../Viewer/Components/blocks/viewerPeople2";

const helperFunction = (components, idFromComponent) => {
  let position = 0;
  const componentsList = cloneDeep(components);

  //get the cliked components position and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);
  //update component data
  const updatedComponent = cloneDeep(component);

  return { position, updatedComponent, componentsList };
};
export const linkCardButton = (object,index,idFromComponent,components
) => {
  const { position, updatedComponent, componentsList } = helperFunction(components, idFromComponent);
  updatedComponent["Data"]["data"][index].btn.link = object;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
export const linkButton = (object, idFromComponent, components) => {
  const { position, updatedComponent, componentsList } = helperFunction(
    components,
    idFromComponent
  );
  updatedComponent.Data.data.btn.link = object;
  console.log(updatedComponent);
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};
export const handleLayout = (numberOfCards, idFromComponent, components) => {
  const { position, updatedComponent, componentsList } = helperFunction(components, idFromComponent);
  updatedComponent["Data"]["layout"] = numberOfCards;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};
export const deleteCard = (index, idFromComponent, components) => {
  let position = 0;
  const componentsList = cloneDeep(components);

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

  const updatedComponent = cloneDeep(component);
  updatedComponent["Data"]["data"] = revisedData;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};
export const deleteBlock = (idFromComponent, components) => {
  const componentsList = cloneDeep(components);
  const position = componentsList.findIndex(
    (ele) => ele.key === idFromComponent
  );

  //delete component from components list
  componentsList.splice(position, 1);
  //update the state

  return componentsList;
};
export const handleAddCard = (idFromComponent, components) => {
  console.log("handleAddCard called", idFromComponent);

  let position = 0;
  const componentsList = cloneDeep(components);

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = cloneDeep(component.Data.data);
  let count = 0;
  Object.getOwnPropertyNames(newData).forEach(() => count++);
  count = count + 1;
  const cards = blocks.find((ele) => ele.Component === component.Component);
  const i = Math.floor(Math.random() * 2) + 1;
  newData[count] = cards.Data.data[i];
  const updatedComponent = cloneDeep(component);
  updatedComponent["Data"]["data"] = newData;
  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  console.log("handleAddCard called", componentsList);

  return componentsList;
};
export const handleSocialIcons = (socialIcons, idFromComponent, components) => {
  let position = 0;
  const componentsList = cloneDeep(components);

  //get the cliked components position and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === idFromComponent;
  });

  //delete component from components list
  componentsList.splice(position, 1);
  //update component data
  const updatedComponent = cloneDeep(component);
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
  const { position, updatedComponent, componentsList } = helperFunction(
    components,
    idFromComponent
  );
  updatedComponent.Data.data.img = imageURL;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
export const changeBackgroundColor = (color, idFromComponent, components) => {
  const { position, updatedComponent, componentsList } = helperFunction(
    components,
    idFromComponent
  );
  updatedComponent.Data.data.bgColor = color;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
//change color of btn
export const changeBtnColor = (color, idFromComponent, components) => {
  const { position, updatedComponent, componentsList } = helperFunction(
    components,
    idFromComponent
  );
  updatedComponent.Data.data.btn.bgColor = color;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
//change image of a card
export const changeCardImage = (
  imageURL,

  index,
  idFromComponent,
  components
) => {
  const { position, updatedComponent, componentsList } = helperFunction(components, idFromComponent);
  updatedComponent["Data"]["data"][index].bg.picture = imageURL;

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

  const componentsList = cloneDeep(components);

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === id;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = JSON.parse(JSON.stringify(component.Data.data));

  if (
    type === "header1" ||
    type === "header2" ||
    type === "header3" ||
    type === "about1"
  ) {
    newData[tag].text = textFromComponent;
  } else if (
    type === "features1" ||
    type === "features2" ||
    type === "features3" ||
    type === "features4" ||
    type === "gallery1" ||
    type === "gallery2"
  ) {
    console.log("type", type);
    console.log(newData[index][tag].text);
    newData[index][tag].text = textFromComponent;
  } else if (type === "faq1") {
    if (tag === "heading") {
      newData[tag].text = textFromComponent;
    } else {
      newData.faqList[index][tag] = textFromComponent;
    }
  }
  const updatedComponent = cloneDeep(component);
  updatedComponent["Data"]["data"] = newData;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  //update the state
  return componentsList;
};
export const dragStartHandler = (event) => {
  console.log("drag start", event.target.id);
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
  console.log("components",components)
  let position = 0;
  const componentsList = cloneDeep(components);

  //get the cliked components key and component
  const component = componentsList.find((ele, index) => {
    position = index;

    return ele.key === clickedComponentId;
  });

  //delete component from components list
  componentsList.splice(position, 1);

  // update components data

  const newData = JSON.parse(JSON.stringify(component.Data.data));
  if (
    type === "header1" ||
    type === "header2" ||
    type === "header3" ||
    type === "about1"
  ) {
    newData[tag] = {
      ...newData[tag],
      ...stateFromTextEditor,
    };
  } else if (
    type === "features1" ||
    type === "features2" ||
     type === "features4" ||  
    type === "features3" ||
    type === "gallery1" ||
    type === "gallery2" ||
     type === "people1" ||
    type === "people2" 
  ) {
    console.log("type", type);
    console.log("data", newData[index][tag]);
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

  const updatedComponent = cloneDeep(component);
  updatedComponent["Data"]["data"] = newData;

  //add component to the same position again
  componentsList.splice(position, 0, updatedComponent);

  return componentsList;
};
export const dragEndHandler = (result, components) => {
  if (!result.destination) return;
  const items = cloneDeep(components);

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
export const mapAdminBlocks = (Blocks) => {
  return Blocks?.map((block) => {
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
         case "Features4":
        block.Component = Features4;
        break;
       case "People1":
        block.Component = People1;
        break;
      case "People2":
        block.Component = People2;
        break;
      case "Faq1":
        block.Component = Faq1;
        break;

      case "Gallery1":
        block.Component = Gallery1;
        break;
      case "Gallery2":
        block.Component = Gallery2;
        break;
      case "About1":
        block.Component = About1;
        break;
      default:
        break;
    }
    return block;
  });
};
export const mapViewerBlocks = (Blocks) => {
  return Blocks.map((block) => {
    switch (block.Component) {
      case "Header1":
        block.Component = ViewerHeader1;
        break;
      case "Header2":
        block.Component = ViewerHeader2;
        break;
      case "Header3":
        block.Component = ViewerHeader3;
        break;
      case "Features1":
        block.Component = ViewerFeatures1;
        break;
      case "Features2":
        block.Component = ViewerFeatures2;
        break;
      case "Features3":
        block.Component = ViewerFeatures3;
      case "Features4":
        block.Component = ViewerFeatures4;
        break;
      case "People1":
        block.Component = ViewerPeople1;
        break;
      case "People2":
        block.Component = ViewerPeople2;
        break;
      case "Faq1":
        block.Component = ViewerFaq1;
        break;
      case "Gallery1":
        block.Component = ViewerGallery1;
        break;
      case "Gallery2":
        block.Component = ViewerGallery2;
        break;
      case "About1":
        block.Component = ViewerAbout1;
        break;
      default:
        break;
    }
    return block;
  });
};
export const unmapBlocks = (Blocks) => {
  return Blocks.map((block) => {
    const componentMap = {
      [Gallery1]: "Gallery1",
      [Gallery2]: "Gallery2",
      [Header1]: "Header1",
      [Header2]: "Header2",
      [Header3]: "Header3",
      [Features1]: "Features1",
      [Features2]: "Features2",
      [Features3]: "Features3",
       [Features4]: "Features4",
      [Faq1]: "Faq1",
      [About1]: "About1",
      [People1]: "People1",
      [People2]: "People2",
    };
    block.Component = componentMap[block.Component];
    return block;
  });
};
const saveBlocks = async (Blocks) => {
  // const Blocks = unmapBlocks(blocks);

  try {
    const res = await axios.post(
      "http://localhost:8800/api/blocks/saveBlocks",
      { blocks: Blocks }
    );
    return res.data.savedBlockKeys;
  } catch (error) {
    console.error(error);
  }
};
const updateBlocks = async (Blocks) => {
  // const Blocks = unmapBlocks(blocks);
  console.log("Blocks in update Blocks", Blocks);

  try {
    const res = await axios.post(
      "http://localhost:8800/api/blocks/updateBlocks",
      { blocks: Blocks }
    );
    console.log("res in update Blocks", res);
    const keys = res.data.updatedBlockKeys;
    return res.data.updatedBlockKeys;
  } catch (error) {
    console.error(error);
  }
};
const saveMyTemplate = async (
  type,
  homepage,
  homepageBlockIds,
  mainPage,
  mainpageBlockIds,
  dataType,
  mainPageDataIds,
  title
) => {
  const userData = await getUserData();
  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/saveTemplate",
      {
        username: userData.username,
        template: {
          name: title,
          type: type,
          pages: {
            [homepage]: {
              blocks: homepageBlockIds,
            },
            [mainPage]: {
              blocks: mainpageBlockIds,
            },
          },
          data: {
            [dataType]: mainPageDataIds,
          },
        },
      }
    );
    if (res.status === 201) {
      console.log("in here");
      const response = { status: "201", msg: res.data.message };
      return response;
    } else if (res.status === 500) {
      console.log(res.data.message);
      const response = { status: "500", msg: res.data.message };
      return response;
    }
  } catch (err) {
    console.log(err);
    return { status: "500", msg: err };
  }
};
const updateTemplate = async (
  id,
  adminId,
  type,
  homepage,
  homepageBlockIds,
  mainPage,
  mainpageBlockIds,
  dataType,
  mainPageDataIds
) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/updateTemplate",
      {
        template: {
          id,
          type: type,
          pages: {
            [homepage]: {
              blocks: homepageBlockIds,
            },
            [mainPage]: {
              blocks: mainpageBlockIds,
            },
          },
          data: {
            [dataType]: mainPageDataIds,
          },
        },
        adminId
      }
    );
    console.log("res in updateTemplate", res);
    return res;
  } catch (err) {
    return { status: "500" };
  }
};
// template, "BlogHomePage", "BlogsPage", "blogs", name;
export const SavedTemplate = async (
  template,
  HomePage,
  MainPage,
  data,
  title
) => {
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  if (template.pages?.[HomePage]?.blocks.length > 0) {
    homepageBlockIds = await saveBlocks(template.pages?.[HomePage].blocks);
  }

  if (template.pages[MainPage]?.blocks.length > 0) {
    mainpageBlockIds = await saveBlocks(template.pages[MainPage].blocks);
  }
  if (template.data?.[data]) {
    mainPageDataIds = template.data?.[data];
  }

  const response = await saveMyTemplate(
    template.type,
    HomePage,
    homepageBlockIds,
    MainPage,
    mainpageBlockIds,
    data,
    mainPageDataIds,
    title
  );
  return response;
  // return response;
};
// template,
//               "BlogHomePage",
//               "BlogsPage",
//               "blogs",
//               id
export const UpdateTemplate = async (
  template,
  HomePage,
  MainPage,
  data,
  id,
  adminId
) => {
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  console.log("template", template);
  if (template.pages?.[HomePage]?.blocks.length > 0) {
    homepageBlockIds = await updateBlocks(template.pages[HomePage].blocks);
    console.log("homepageBlockIds", homepageBlockIds);
  }

  if (template.pages[MainPage]?.blocks.length > 0) {
    mainpageBlockIds = await updateBlocks(template.pages[MainPage].blocks);
    console.log("mainpageBlockIds", mainpageBlockIds);
  }
  if (template.data?.[data]) {
    mainPageDataIds = template.data?.[data];
    console.log("mainPageDataIds", mainPageDataIds);
  }
  const response = await updateTemplate(
    id,
    adminId,
    template.type,
    HomePage,
    homepageBlockIds,
    MainPage,
    mainpageBlockIds,
    data,
    mainPageDataIds
  );
  console.log("response", response);
  if (response.status === 201) {
    console.log("success");
    return Promise.resolve({ msg: "Updated Successfully" });
  } else if (response.status === 500) {
    console.log("error");
    return Promise.reject({ error: "Server Error" });
  } else {
    console.log("error");
    return Promise.reject({ error: "Server Error" });
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Get the year, month, and day components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // add 1 to account for 0-indexed months
  const day = date.getDate();

  // Format the date as a string in the desired format (e.g. "YYYY-MM-DD")
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};
