import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SaveBtn from "./components/SaveBtn";
import {
  handleLayout,
  deleteCard,
  deleteBlock,
  handleAddCard,
  handleSocialIcons,
  changeComponentText,
  dragStartHandler,
  dropHandler,
  updateComponentData,
  dragEndHandler,
} from "./utilityFunctions/helperFunctions";

import Blogs from "./blogWebsite/components/Blogs/Blogs";
import DragAndDropPanel from "./components/DragAndDropPanel";
import ViewBlockPanelBtn from "./components/ViewBlockPanelBtn/ViewBlockPanelBtn";
import TextEditor from "./components/TextEditor/TextEditor";

const BlogMain = (props) => {
  const [components, setComponents] = useState([]);
  const [tag, setTag] = useState(null);
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const [clickedComponentId, setClickedComponentId] = useState(null);
  const [blocksPanelDisplayed, setBlocksPanelDisplayed] = useState(false);
  const [dragDisable, setDragDisable] = useState(true);
  const [textEditorDisplayed, setTextEditorDisplayed] = useState(false);
  const [textEditor, setTextEditor] = useState(null);
  const [iconsPanelDisplayed, setIconsPanelDisplayed] = useState(false);
  const [iconsPanel, setIconsPanel] = useState(null);
  const [blogIds, setBlogIds] = useState(null);

  useEffect(() => {
    console.log(props.data)
    setComponents(props.data.blocks);
    setBlogIds(props.data.blogIds);
  }, [props.data]);

  const closeEditor = () => {
    setTextEditorDisplayed(false);
  };

  const setTextEditorHandler = (idFromComponent, tagFromComponent, index) => {
    const clickedComponent = components.find(
      (ele) => ele.key === idFromComponent
    );
    let dataForTextEditor = {};

    if (index === null) {
      dataForTextEditor = clickedComponent.Data.data[tagFromComponent];
    } else {
      console.log(clickedComponent.Data.data[index][tagFromComponent]);
      dataForTextEditor = clickedComponent.Data.data[index][tagFromComponent];
    }
    setClickedComponentId(idFromComponent);
    setClickedCardIndex(index);
    setTag(tagFromComponent);
    setTextEditorDisplayed(true);
    setTextEditor(
      <TextEditor
        closeEditor={closeEditor}
        onUpdate={(stateFromTextEditor) =>
          setComponents(
            updateComponentData(
              stateFromTextEditor,
              components,
              clickedComponentId,
              clickedCardIndex,
              tag
            )
          )
        }
        data={dataForTextEditor}
        show={textEditorDisplayed}
      />
    );
  };

  const enableDragHandler = () => {
    setDragDisable(false);
    setTextEditorDisplayed(false);
  };
  const openDrawerHandler = () => {
    setTextEditorDisplayed(false);
    setBlocksPanelDisplayed(!blocksPanelDisplayed);
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    setBlocksPanelDisplayed(false);
  };

  const componentDragStartHandler = () => {
    setBlocksPanelDisplayed(false);
  };

  return (
    <>
      <SaveBtn />
      {blogIds && <Blogs blogs={blogIds} />}
      <div
        style={{
          border: dragDisable === false ? "5px solid #AAFF00 " : "none",
        }}
      >
        {textEditorDisplayed && textEditor}

        <ViewBlockPanelBtn
          click={openDrawerHandler}
          status={blocksPanelDisplayed}
        />
        <DragAndDropPanel
          blocksPanelDisplayed={blocksPanelDisplayed}
          dragStartHandler={dragStartHandler}
        />

        <div
          style={{
            width: textEditorDisplayed ? "80vw" : "100vw",
            position: textEditorDisplayed ? "absolute" : "static",
            right: 0,
          }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              setComponents(dragEndHandler(result, components));
              setDragDisable(true);
            }}
          >
            <Droppable droppableId="blocks">
              {(provided) => (
                <div
                  onDragOver={dragOverHandler}
                  onDrop={(event) =>
                    setComponents(dropHandler(event, components))
                  }
                  style={{
                    backgroundColor: "#fff",
                    minHeight: "1000px", // set a min-height to extend the droppable area
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {components.map(({ key, Component, Data, type }, index) => {
                    return (
                      <Draggable
                        isDragDisabled={dragDisable}
                        key={key}
                        draggableId={key}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Component
                              enableDrag={enableDragHandler}
                              onClick={setTextEditorHandler}
                              changeText={(textFromComponent, index) =>
                                setComponents(
                                  changeComponentText(
                                    textFromComponent,
                                    index,
                                    components,
                                    tag,
                                    clickedComponentId
                                  )
                                )
                              }
                              dragDisable={dragDisable}
                              deleteBlock={(idFromComponent) =>
                                setComponents(
                                  deleteBlock(idFromComponent, components)
                                )
                              }
                              deleteCard={(index, idFromComponent) =>
                                setComponents(
                                  deleteCard(index, idFromComponent, components)
                                )
                              }
                              addCard={(idFromComponent) =>
                                setComponents(
                                  handleAddCard(idFromComponent, components)
                                )
                              }
                              id={key}
                              Data={Data}
                              setLayout={(numberOfCards, idFromComponent) =>
                                setComponents(
                                  handleLayout(
                                    numberOfCards,
                                    idFromComponent,
                                    components
                                  )
                                )
                              }
                              handleSocialIcons={(
                                socialIcons,
                                idFromComponent
                              ) =>
                                setComponents(
                                  handleSocialIcons(
                                    socialIcons,
                                    idFromComponent,
                                    components
                                  )
                                )
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default BlogMain;
