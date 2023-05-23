// import React, { useState } from "react";
// import ContentEditable from "react-contenteditable";
// import { Container, Flex, Image, SimpleGrid, ThemeIcon } from "@mantine/core";
// import DelCard from "../delCard/delCard";
// import HandleBlock from "../HandleBlock/handleBlock";
// import UploadImage from "../../uploadImage/uploadImage";
// import { uploadImage } from "../../../utilityFunctions/imageUpload";
// import classes from "./Features1.module.css";
// export default class Features1 extends Component {
//   state = {
//     displayHandleBlock: false,
//   };

//   delCard = (index) => {
//     this.props.deleteCard(index, this.props.id);
//   };
//   // textFromComponent,
//   //   index,
//   //   tag,
//   //   clickedComponentId,
//   //   type
//   handleTextChange = (e, index, tag) => {
//     this.props.changeText(
//       e.target.value,
//       index,
//       tag,
//       this.props.id,
//       "features1"
//     );
//   };
//  handleImageChange = async (event, index) => {
//     console.log("in here features 2 ");
//     console.log("index", index);
//     const cardImagesCopy = [...this.state.cardImages];
//     cardImagesCopy[index] = event.target.files[0];
//     this.setState({ cardImages: cardImagesCopy });
//     try {
//       const link = await uploadImage(event.target.files[0]);
//       console.log(link);
//       this.props.changeCardImage(link, index, this.props.id);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleBtnClick = () => {};

//   render() {
//     return (
    
//         <Container
//           onMouseEnter={() => {
//             this.setState({
//               displayHandleBlock: true,
//             });
//           }}
//           onMouseLeave={() => {
//             this.setState({
//               displayHandleBlock: false,
//             });
//           }}
//            size={1500}
//         style={{ padding: "80px", position: "relative" }}
         
//         >
//           {this.state.displayHandleBlock && (
//             <HandleBlock
//               id={this.props.id}
//               del={() => this.props.deleteBlock(this.props.id)}
//               enableDrag={this.props.enableDrag}
//               displayAddCard={true}
//               addCard={() => this.props.addCard(this.props.id)}
//               layout={this.props.Data.layout}
//               displaySetLayout={true}
//               setLayout={this.props.setLayout}
//               options={[
//                 { text: "4 cards - width 20%", value: 4 },
//                 { text: "3 cards - width 30%", value: 3 },
//                 { text: "2 cards - width 40%", value: 2 },
//               ]}
//             ></HandleBlock>
//           )}
//  <SimpleGrid cols={Data.layout} spacing={20}>
//           {Object.getOwnPropertyNames(Data.data).map((index) => {
//             return (
//               <Flex
//                 gap="md"
//                 direction="row"
//                 key={index}
//                 className={classes.item}
//               >
//                 <ThemeIcon
//                   variant="light"
//                   className={classes.itemIcon}
//                   size={80}
//                   radius="md"
//                   p="sm"
//                 >
//                   <Image src={this.props.Data.data[index].bg.picture} />
//                 </ThemeIcon>

//                 <div
//                   onMouseEnter={() => {
//                     this.setState({ displayHandleBlock: true });
//                   }}
//                   onMouseLeave={() => {
//                     this.setState({ displayHandleBlock: false });
//                   }}
//                   style={{ position: "relative", width: "550px" }}
//                 >
//                   {displayHandleBlock && (
//                     <>
//                       <UploadImage
//                         top={5}
//                         left={5}
//                         handleImageChange={(event) =>
//                           this.handleImageChange(event, index)
//                         }
//                         index={index}
//                         image={cardImages[index]}
//                       />
//                       <DelCard del={this.delCard} index={index} />
//                     </>
//                   )}
//                   <ContentEditable
//                  className={classes.itemTitle}
//                   html={this.props.Data.data[index].h.text} // innerHTML of the editable div
//                   disabled={false} // use true to disable editing
//                   onClick={() =>
//                     this.props.onClick(this.props.id, "h", index, "features1")
//                   }
//                   onChange={(e) => this.handleTextChange(e, index, "h")} // handle innerHTML change
//                   style={{
//                     fontSize: this.props.Data.data[index].h.size,
//                     fontFamily: this.props.Data.data[index].h.family,
//                     color: this.props.Data.data[index].h.color,
//                     fontWeight:
//                       this.props.Data.data[index].h.bold === true
//                         ? "bold"
//                         : "normal",
//                     textDecoration:
//                       this.props.Data.data[index].h.underline === true
//                         ? "underline"
//                         : "none",
//                     fontStyle:
//                       this.props.Data.data[index].h.italic === true
//                         ? "italic"
//                         : "normal",
//                     textAlign: this.props.Data.data[index].h.align,
//                   }}
//                 />
//                   <ContentEditable
//                     html={Data.data[index].p.text}
//                     disabled={false}
//                     onClick={() => onClick(id, "p", index, "features1")}
//                     onChange={(e) => this.handleTextChange(e, index, "p")}
//                     style={{
//                       fontSize: Data.data[index].p.size,
//                       fontFamily: Data.data[index].p.family,
//                       color: Data.data[index].p.color,
//                       fontWeight:
//                         Data.data[index].p.bold === true ? "bold" : "normal",
//                       textDecoration:
//                         Data.data[index].p.underline === true
//                           ? "underline"
//                           : "none",
//                       fontStyle:
//                         Data.data[index].p.italic === true
//                           ? "italic"
//                           : "normal",
//                       textAlign: Data.data[index].p.align,
//                     }}
//                   />
//                 </div>
//               </Flex>
//             );
//           })}
//         </SimpleGrid>
//       </Container>
     
//     );
//   }
// }