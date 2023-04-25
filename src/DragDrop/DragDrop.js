import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classes from "./DragDrop.module.css";
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
  dragOverHandler,
  dragEndHandler,
  changeBackgroundColor,
  changeBackgroundImage,
  changeCardImage,
  changeBtnColor,
} from "../utilityFunctions/helperFunctions";

import DragAndDropPanel from "../components/DragAndDropPanel";
import ViewBlockPanelBtn from "../components/ViewBlockPanelBtn/ViewBlockPanelBtn";
import TextEditor from "../components/TextEditor/TextEditor";

const DragDrop = ({
  components,
  setComponents,
  blocksPanelDisplayed,
  setBlocksPanelDisplayed,
  setDragDisable,
  dragDisable,
  clickedComponentId,
  setClickedComponentId,
  Index,
  setIndex,
  tag,
  setTag,
  textEditorDisplayed,
  setTextEditorDisplayed,
  textEditor,
  setTextEditor,
  type,
  setType,
}) => {
  const closeEditor = () => {
    setTextEditorDisplayed(false);
  };

  const setTextEditorHandler = (
    idFromComponent,
    tagFromComponent = 0,
    index = 0,
    type
  ) => {
    const clickedComponent = components.find(
      (ele) => ele.key === idFromComponent
    );
    let dataForTextEditor = {};

    if (
      type === "header1" ||
      type === "header2" ||
      type === "header3" ||
      type === "about1"
    ) {
      dataForTextEditor = clickedComponent.Data.data[tagFromComponent];
    } else if (
      type === "features1" ||
      type === "features2" ||
      type === "features3" ||
      type === "gallery1" ||
      type === "gallery2"
    ) {
      console.log(" i am happy");
      dataForTextEditor = clickedComponent.Data.data[index][tagFromComponent];
    } else if (type === "faq1") {
      if (tagFromComponent === "heading") {
        console.log("in faq");
        dataForTextEditor = clickedComponent.Data.data.heading;
      } else if (tagFromComponent === "question") {
        dataForTextEditor = clickedComponent.Data.data.style.question;
      } else if (tagFromComponent === "answer") {
        dataForTextEditor = clickedComponent.Data.data.style.answer;
      }
    }

    setTextEditorDisplayed(true);
    setTextEditor(
      <TextEditor
        closeEditor={closeEditor}
        onUpdate={(stateFromTextEditor) =>
          setComponents(
            updateComponentData(
              stateFromTextEditor,
              components,
              idFromComponent,
              index,
              tagFromComponent,
              type
            )
          )
        }
        data={dataForTextEditor}
        show={true}
        // id={idFromComponent}
        // index={index}
        // tag={tagFromComponent}
        // type={type}
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

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
        border: dragDisable === false ? "3px dashed #AAFF00 " : "none",
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

      <div className={textEditorDisplayed ? classes.shrink : classes.wide}>
        <DragDropContext
          onDragEnd={(result) => {
            setComponents(dragEndHandler(result, components));
            setDragDisable(true);
          }}
        >
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                onDragOver={(event) =>
                  setBlocksPanelDisplayed(dragOverHandler(event))
                }
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
                {components?.map(({ key, Component, Data, type }, index) => {
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
                            onClick={(
                              idFromComponent,
                              tagFromComponent,
                              index,
                              type
                            ) =>
                              setTextEditorHandler(
                                idFromComponent,
                                tagFromComponent,
                                index,
                                type
                              )
                            } //to do
                            // e.target.value,null,tag,this.props.id,"header1"
                            changeText={(
                              textFromComponent,
                              index,
                              tag,
                              id,
                              type
                            ) =>
                              setComponents(
                                changeComponentText(
                                  components,
                                  textFromComponent,
                                  index,
                                  tag,
                                  id,
                                  type
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
                            changeCardImage={(image, index, idFromComponent) =>
                              setComponents(
                                changeCardImage(
                                  image,
                                  index,
                                  idFromComponent,
                                  components
                                )
                              )
                            }
                            handleSocialIcons={(socialIcons, idFromComponent) =>
                              setComponents(
                                handleSocialIcons(
                                  socialIcons,
                                  idFromComponent,
                                  components
                                )
                              )
                            }
                            changeBackgroundColor={(color, idFromComponent) =>
                              setComponents(
                                changeBackgroundColor(
                                  color,
                                  idFromComponent,
                                  components
                                )
                              )
                            }
                            changeBackgroundImage={(image, idFromComponent) =>
                              setComponents(
                                changeBackgroundImage(
                                  image,
                                  idFromComponent,
                                  components
                                )
                              )
                            }
                            changeBtnColor={(color, idFromComponent) =>
                              setComponents(
                                changeBtnColor(
                                  color,
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
  );
};

export default DragDrop;
