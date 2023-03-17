import blocks from "../components/blocks/blocksData";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { getUserData } from "./authFunctions";

import Header1 from "../components/blocks/Header1/Header1";
import Features2 from "../components/blocks/Features2/Features2";
import Header2 from "../components/blocks/Header2/Header2";
import Header3 from "../components/blocks/Header3/Header3";
import Features1 from "../components/blocks/Features1/Features1";
import Features3 from "../components/blocks/Features3/Features3";
import Faq1 from "../components/blocks/FAQ/Faq1";

import ViewerFaq1 from "../Viewer/Components/blocks/viewerFaq1";
import ViewerFeatures1 from "../Viewer/Components/blocks/viewerFeatures1";
import ViewerFeatures2 from "../Viewer/Components/blocks/viewerFeatures2";
import ViewerFeatures3 from "../Viewer/Components/blocks/viewerFeatures3";
import ViewerHeader1 from "../Viewer/Components/blocks/viewerHeader1";
import ViewerHeader2 from "../Viewer/Components/blocks/viewerHeader2";
import ViewerHeader3 from "../Viewer/Components/blocks/viewerHeader3";

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
export const mapAdminBlocks = (Blocks) => {
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
        break;
      case "Faq1":
        block.Component = ViewerFaq1;
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
const saveBlocks = async (blocks) => {
  const Blocks = unmapBlocks(blocks);

  try {
   const res = await axios.post("http://localhost:8800/api/blocks/saveBlocks", { blocks: Blocks })
   return res.data.savedBlockKeys;
  }
  catch(error)
  {
    console.error(error);
  }
};
const updateBlocks = async (blocks) => {
  const Blocks = unmapBlocks(blocks);

  try {
   const res = await axios.post("http://localhost:8800/api/blocks/updateBlocks", { blocks: Blocks })
   return res.data.updatedBlockKeys;
  }
  catch(error)
  {
    console.error(error);
  }
};
const saveTemplate = async (
  type,
  homepageBlockIds,
  mainPage,
  mainpageBlockIds,
  dataType,
  mainPageDataIds
) => {
  const userData = await getUserData();
  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/saveTemplate",
      {
        username: userData.username,
        template: {
          type: type,
          pages: {
            HomePage: {
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
  type,
  homepageBlockIds,
  mainPage,
  mainpageBlockIds,
  dataType,
  mainPageDataIds
) => {

  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/updateTemplate",
       {template: {
              id,
              type: type,
              pages: {
                HomePage: {
                  blocks: homepageBlockIds,
                },
                [mainPage]: {
                  blocks: mainpageBlockIds,
                },
              },
              data: {
                [dataType]: mainPageDataIds,
              },
            },}
    );
    if (res.status === 201) {
     
      const response = { status: "201"};
      return response;
    } else if (res.status === 500) {
      
      const response = { status: "500"};
      return response;
    }
  } catch (err) {
    
    return { status: "500" };
  }
};
export const SavedTemplate = async (template) => {
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  if (template.pages?.HomePage?.blocks.length > 0) {
  
    homepageBlockIds = await saveBlocks(template.pages.HomePage.blocks);
  }
  switch (template.type) {
    case "blog": {
      if (template.pages.BlogsPage?.blocks.length > 0) {
        console.log(template.pages.BlogsPage.blocks);
        mainpageBlockIds = await saveBlocks(template.pages.BlogsPage.blocks);
      }
      if (template.data?.blogs) {
        mainPageDataIds = template.data?.blogs;
      }

      const response = await saveTemplate(
        template.type,
        homepageBlockIds,
        "BlogsPage",
        mainpageBlockIds,
        "blogs",
        mainPageDataIds
      );
      console.log(response);
      if (response.status === 201) {
        console.log("here");
        return Promise.resolve({ msg: response.msg });
      } else if (response.status === 500) {
        console.log("here");
        return Promise.reject({ error: response.msg });
      }
      break;
    }

    case "eccomerce": {
      if (template.pages.ProductsPage?.blocks.length > 0) {
        mainpageBlockIds = await saveBlocks(template.pages.ProductsPage.blocks);
      }
      if (template.data?.products) {
        mainPageDataIds = template.data?.products;
      }

      const response = await saveTemplate(
        template.type,
        homepageBlockIds,
        "ProductsPage",
        mainpageBlockIds,
        "products",
        mainPageDataIds
      );
      if (response.status === 201) {
        return Promise.resolve({ msg: response.msg });
      } else if (response.status === 500) {
        return Promise.reject({ error: response.msg });
      }
      break;
    }
  }
};

export const UpdateTemplate = async (template, id) => {
 
  //first send blocks of homepage
  //send blocks to backend to save
  let homepageBlockIds = [];
  let mainpageBlockIds = [];
  let mainPageDataIds = [];

  if (template.pages?.HomePage?.blocks.length > 0) {
      homepageBlockIds = await updateBlocks(template.pages.HomePage.blocks);
   
  }
  switch (template.type) {
    case "blog":
      {
        if (template.pages.BlogsPage?.blocks.length > 0) {
          mainpageBlockIds = await updateBlocks(template.pages.BlogsPage.blocks);
        }
        if (template.data?.blogs) {
          mainPageDataIds = template.data?.blogs;
        }
        const response = await   updateTemplate(id, template.type, homepageBlockIds, "BlogsPage", mainpageBlockIds, "blogs", mainPageDataIds)
        if (response.status === 201) {  
          
            return Promise.resolve({ msg: 'Updated Successfully' });
          } else if (response.status === 500) {
          
            return Promise.reject({ error: 'Server Error' });
          }
        
      }
      break;
  }
  switch (template.type) {
    case "eccomerce":
      {
        if (template.pages.ProductsPage?.blocks.length > 0) {
          mainpageBlockIds = await updateBlocks(template.pages.ProductsPage.blocks);
        }
        if (template.data?.products) {
          mainPageDataIds = template.data?.products;
        }
     const response = await   updateTemplate(id, template.type, homepageBlockIds, "ProductsPage", mainpageBlockIds, "products", mainPageDataIds)
     if (response.status === 201) {
       
        return Promise.resolve({ msg: 'Updated Successfully' });
      } else if (response.status === 500) {
       
        return Promise.reject({ error: 'Server Error' });
      }
        
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
