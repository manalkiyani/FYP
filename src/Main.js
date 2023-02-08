import React, {Component} from 'react';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';


import ViewBlockPanelBtn from './components/ViewBlockPanelBtn/ViewBlockPanelBtn';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Image from './components/SideDrawer/Image/Image';
import blocks from './components/blocks/blocksData';
import TextEditor from './components/TextEditor/TextEditor';
import Header1 from './components/blocks/Header1/Header1';
import Features2 from './components/blocks/Features2/Features2';




class Main extends Component {
    state = {
        components: [
                {
                id: uuid(),
                Component: Header1,
                socialIcons:JSON.parse(JSON.stringify(blocks[0].socialIcons)),
               
                data:JSON.parse(JSON.stringify(blocks[0].data))
             },
            {
                id:uuid(),
                Component:Features2,
                layout:blocks[2].layout, //numbers of cards
                data:JSON.parse(JSON.stringify(blocks[2].data))
            }
        ],


        tag:null, 
        clickedCardIndex:null,
        clickedComponentId:null,
        blocksPanelDisplayed: false,
        dragDisable:true,
        textEditorDisplayed:false,
        textEditor:null,
        iconsPanelDisplayed:false,
        iconsPanel:null


    }
    


    handleSocialIcons = (socialIcons,idFromComponent) =>{
        console.log("[App.js] handleSocialIcons")

        let position = 0;
        let componentsList = [...this.state.components];
    
        //get the cliked components position and component
        const component = componentsList.find((ele, index) => {
            position = index;
      
            return ele.id === idFromComponent;
          });
         
          //delete component from components list
          componentsList.splice(position, 1);
          //update component data
          const updatedComponent = {
            ...component,
           socialIcons
          
          };
          //add component to the same position again
        componentsList.splice(position, 0, updatedComponent);
    
         
          //update the state
        this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});

    }
    handleLayout = (numberOfCards,idFromComponent) =>{
        

        let position = 0;
        let componentsList = [...this.state.components];
    
        //get the cliked components position and component
        const component = componentsList.find((ele, index) => {
            position = index;
      
            return ele.id === idFromComponent;
          });
         
          //delete component from components list
          componentsList.splice(position, 1);
          //update component data
          const updatedComponent = {
            ...component,
           
            layout:numberOfCards,
          
          };
          //add component to the same position again
        componentsList.splice(position, 0, updatedComponent);
    
         
          //update the state
        this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});

    }
    closeEditor = () => {
        this.setState({
            textEditorDisplayed:false,
        })
    }
    deleteCard=(index,idFromComponent)=>{
        
        let position = 0;
        let componentsList = [...this.state.components];
       
      
    
        //get the cliked components id and component
        const component = componentsList.find((ele, index) => {
            position = index;
      
            return ele.id === idFromComponent;
          });
       //   console.log(position)
          //delete component from components list
            componentsList.splice(position, 1);
           // update components data

    let newData = JSON.parse(JSON.stringify(component.data));
    let refinedData={}
   
    Object.getOwnPropertyNames(newData).map((val) => {
       if( val !== index)   {refinedData[val]=newData[val] }
      });
     // console.log(refinedData)

    let count=0;
    let revisedData = {}
      //to revise numbering so cards not numbered randomly , they are in sequence
    Object.getOwnPropertyNames(refinedData).map(val=>{
    count++;
    revisedData[count] = refinedData[val]
   })
  // console.log(revisedData)

    const updatedComponent = {
        ...component,
        data: revisedData
      };
      //add component to the same position again
    componentsList.splice(position, 0, updatedComponent);
      this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});





    }
    deleteBlock=(idFromComponent)=>{
        

        let position = 0;
        let componentsList = [...this.state.components];
    
        //get the cliked components position and component
        const component = componentsList.find((ele, index) => {
            position = index;
      
            return ele.id === idFromComponent;
          });
          console.log(position)
          //delete component from components list
          componentsList.splice(position, 1);
          //update the state
        this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});



    }
    handleAddCard=(idFromComponent)=>{
       // console.log('here too')
        let position = 0;
        const componentsList = [...this.state.components];
    
        //get the cliked components id and component
        const component = componentsList.find((ele, index) => {
            position = index;
      
            return ele.id === idFromComponent;
          });
        
        //delete component from components list
        componentsList.splice(position, 1);

        // update components data

    const newData = JSON.parse(JSON.stringify(component.data));
    let count=0;
    Object.getOwnPropertyNames(newData).forEach(()=>count++);
    count=count+1
    const cards=   blocks.find(ele=>ele.Component===component.Component)
    const i =Math.floor(Math.random()*3)+1
    newData[count]= cards.data[i];
    const updatedComponent = {
       ...component,
        data: newData,
        
      };
      //add component to the same position again
    componentsList.splice(position, 0, updatedComponent);

    //update the state
    this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});




    }
    changeComponentText = (textFromComponent,index) =>{

    let position = 0;
    console.log(index)
    const componentsList = [...this.state.components];

    //get the cliked components id and component
    const component = componentsList.find((ele, index) => {
        position = index;
  
        return ele.id === this.state.clickedComponentId;
      });
    
    //delete component from components list
    componentsList.splice(position, 1);

    // update components data

    const newData = JSON.parse(JSON.stringify(component.data));
    index == null ?
    newData[this.state.tag].text = textFromComponent:
    newData[index][this.state.tag].text = textFromComponent;

    const updatedComponent = {
      ...component,
        data: newData
        
      };
     

    //add component to the same position again
    componentsList.splice(position, 0, updatedComponent);

    //update the state
    this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});

   
    }
    setTextEditor = (idFromComponent,tagFromComponent,index) => {
        console.log(index)
        const clickedComponent = this.state.components.find((ele) => (ele.id === idFromComponent));
        let dataForTextEditor={}

        if ( index === null)
         {
            dataForTextEditor = clickedComponent.data[tagFromComponent];

         }
        else{
            console.log("in else")
            console.log(clickedComponent.data[index][tagFromComponent])
            dataForTextEditor = clickedComponent.data[index][tagFromComponent];

         }
    
        this.setState({
            clickedCardIndex:index,
            tag:tagFromComponent,
            textEditorDisplayed:true,
            clickedComponentId:idFromComponent,
           
        },()=>{
            this.setState({
                textEditor:<TextEditor 
                closeEditor ={this.closeEditor}
                onUpdate={this.updateComponentData} 
                data={dataForTextEditor}
                show={this.state.textEditorDisplayed}
            />

            })
        })

    }
    updateComponentData = (stateFromTextEditor) => {
       
    let position = 0;
    const componentsList = [...this.state.components];

    //get the cliked components id and component
    const component = componentsList.find((ele, index) => {
        position = index;
  
        return ele.id === this.state.clickedComponentId;
      });
    
    //delete component from components list
    componentsList.splice(position, 1);

    // update components data

    const newData = JSON.parse(JSON.stringify(component.data));
      
    if (this.state.clickedCardIndex === null)

    {newData[this.state.tag].size = stateFromTextEditor.size;
    newData[this.state.tag].color = stateFromTextEditor.color;
    newData[this.state.tag].bold = stateFromTextEditor.bold;
    newData[this.state.tag].underline = stateFromTextEditor.underline;
    newData[this.state.tag].italic = stateFromTextEditor.italic;
    newData[this.state.tag].align = stateFromTextEditor.align;
    newData[this.state.tag].family = stateFromTextEditor.family;
}

    else{
    newData[this.state.clickedCardIndex][this.state.tag].size = stateFromTextEditor.size;
    newData[this.state.clickedCardIndex][this.state.tag].color = stateFromTextEditor.color;
    newData[this.state.clickedCardIndex][this.state.tag].bold = stateFromTextEditor.bold;
    newData[this.state.clickedCardIndex][this.state.tag].underline = stateFromTextEditor.underline;
    newData[this.state.clickedCardIndex][this.state.tag].italic = stateFromTextEditor.italic;
    newData[this.state.clickedCardIndex][this.state.tag].align = stateFromTextEditor.align;
    newData[this.state.clickedCardIndex][this.state.tag].family = stateFromTextEditor.family;

    }
    const updatedComponent = {
       ...component,
        data: newData,
        
      };
     

    //add component to the same position again
    componentsList.splice(position, 0, updatedComponent);

    //update the state
    this.setState(
        {
          components: componentsList
        },()=>{console.log(this.state.components)});

   


    }
    enableDragHandler=()=>{
      
        this.setState({
            dragDisable:false,

            textEditorDisplayed:false,

        })

    }
    openDrawerHandler = () => {
        this.setState({
            textEditorDisplayed:false,
            blocksPanelDisplayed: !this.state.blocksPanelDisplayed})
    }
    dragStartHandler = (event) => {
        event.dataTransfer.setData('id', event.target.id);
       
    }
    dropHandler = (event) => {
        event.preventDefault();
        const droppedComponentId = event.dataTransfer.getData('id');
        const droppedComponent = blocks.filter((item) => item.id === droppedComponentId)
        
       
        const requiredComponent = droppedComponent.map((item) => {
            return {id:uuid(), ...item}
        })
        //adding newly Dropped component to list of components
     
        const updatedComponents = [
            ...this.state.components,
            ...requiredComponent
        ];
        this.setState({components: updatedComponents},()=> window.scrollTo(0, document.body.scrollHeight))
       // 
       
    }
    dragOverHandler = (event) => {

         event.preventDefault();
         this.setState({blocksPanelDisplayed:false})
    }
    dragEndHandler = (result)=>{
      
        if (!result.destination) return;

        const items = [...this.state.components];
        //delete component from prev location
        const [reorderedItem] = items.splice(result.source.index, 1);
        //add component to new location
        items.splice(result.destination.index, 0, reorderedItem);
    
        this.setState({components: items,dragDisable:true})

    }
    componentDragStartHandler=()=>{
        console.log('onDragStart={this.componentDragStartHandler}')
        this.setState({blocksPanelDisplayed:false})

    }


    render() {
        return (
             <div style={{border:this.state.dragDisable === false ? '5px solid #AAFF00 ' :'none'}} >
                
                    { this.state.textEditorDisplayed && this.state.textEditor}
                
               
               
                 
                    <ViewBlockPanelBtn 
                        click={this.openDrawerHandler}
                        status={this.state.blocksPanelDisplayed}
                        />

                    <SideDrawer show={this.state.blocksPanelDisplayed} width='30%'>
                        
                        <>
                         <div style={{backgroundColor:'#40AFC0' ,width:'100%' ,marginBottom :'10px', padding:'10px',paddingLeft:'25px',color:'#fff'}}>
                            <p style={{fontSize:'20px',margin:0}}> Drag Blocks to Page</p>
                        </div>
                       { blocks.map((item) => {
                                return (
                                    <Image 
    
                                        dragStart={this.dragStartHandler}
                                        key ={item.id}
                                        id={item.id}
                                        source={require('./assets/imgs/' + item.img)}
                                    />
                                    );
                                })}


                        </> 
                        
                    </SideDrawer>

                    <div style={{
                                width:this.state.textEditorDisplayed ?'80vw' :'100vw',
                                position:this.state.textEditorDisplayed ? 'absolute' : 'static',
                                right: 0  
                                }}>
                    <DragDropContext onDragEnd={this.dragEndHandler}>
                        <Droppable droppableId='blocks'>
                            {(provided)=>(
                                 <div 
                                    onDragOver={this.dragOverHandler}
                                    onDrop={this.dropHandler}
                                    style={{backgroundColor:'#fff'}} 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                
                                 {this.state.components.map(({id,Component,data,layout,socialIcons},index) => {
                                    console.log("layout"+layout)
                                 return(
                                    <Draggable 
                                        isDragDisabled = {this.state.dragDisable}  
                                        key = {id} 
                                        draggableId = {id} 
                                        index = {index}>

                                        {(provided)=>(
                                            <div 
                                                ref = {provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps}>
                                                    
                                                {<Component 
                                                    enableDrag = {this.enableDragHandler}
                                                    onClick = {this.setTextEditor}
                                                    changeText={this.changeComponentText}
                                                    dragDisable={this.state.dragDisable}
                                                    deleteBlock={this.deleteBlock}
                                                    deleteCard={this.deleteCard}
                                                   
                                                    addCard={this.handleAddCard}
                                                    id={id}
                                                    data={data}
                                                    layout={layout}
                                                    setLayout={this.handleLayout}
                                                    socialIcons = {socialIcons}
                                                    handleSocialIcons = {this.handleSocialIcons}

                                                    
                                                />}
                                            </div>

                                        )}
                                    
                                    </Draggable>
                                 )
                                
                                 
                                 })}
                                 {provided.placeholder}
                             
                                 </div>

                            )}
                           
                        </Droppable>
                    </DragDropContext>
                    </div>
                    
                   
                </div>
            
        );
    }
}

export default Main
