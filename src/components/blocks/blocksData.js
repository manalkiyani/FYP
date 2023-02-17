import Features2 from "./Features2/Features2";
import Header1 from "./Header1/Header1";
import Header2 from "./Header2/Header2";
import sample1 from '../../assets/imgs/sample1.jpg';
import sample2 from '../../assets/imgs/sample2.jpg';
import sample3 from '../../assets/imgs/sample3.jpg';


const blocks = [
    {
        type: 'header1',
        img: 'header1.png',
        Component: Header1,
        Data:{
             socialIcons:[{icon:'Facebook',url:'https://res.cloudinary.com/djlewzcd5/image/upload/v1670229851/facebook_nunoeq.png',link:''},
        {icon:'Twitter',url:'https://res.cloudinary.com/djlewzcd5/image/upload/v1670230136/twitter_xtgade.png',link:''},
        {icon:'Instagram',url:'https://res.cloudinary.com/djlewzcd5/image/upload/v1670230168/instagram_ft5yeo.png',link:''}
        ],
         data: {
            "h": {
                text: 'Intro with an Image',
                size: '32px',
                color: '#000',
                bold: false,
                underline: false,
                italic: false,
                align: 'center',
                family: 'Sans-serif'
            },
            "p": {
                text: 'Easily create small/medium websites, landing pages, portfolios. beautiful website blocks, templates and themes help you to start easily.',
                size: '16px',
                color: '#000',
                bold: false,
                underline: false,
                italic: false,
                align: 'center',
                family: 'Sans-serif'

            },
            "btn": {
                text: 'START NOW',
                size: '14px',
                color: '#fff',
                bold: false,
                underline: false,
                italic: false,
                align: 'center',
                family: 'Sans-serif'

            },
            ref: ""
        }


        }
      
       
       
    }, {
        type: 'header2',
        img: 'header2.png',
        Component: Header2,
        Data: {}

    }, {
        type: 'features2',
        img: 'features2.png',
        Component: Features2,
        Data:{
             layout:3,
              data: {
            "1": {
                "h": {
                    text: 'Design',
                    size: '24px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "s": {
                    text: 'Website Design',
                    size: '16px',
                    color: ' #7890A3',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "p": {
                    text: 'Just drop site elements to your page, add content and style it to look the way you like.',
                    size: '16px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "btn": {
                    text: 'START NOW',
                    size: '14px',
                    color: '#fff',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "bg": {
                    picture: sample1
                }
            },
            "2": {
                "h": {
                    text: 'Branding',
                    size: '24px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "s": {
                    text: 'Creating Your Brand',
                    size: '16px',
                    color: ' #7890A3',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "p": {
                    text: 'Select the theme that suits you. Each theme contains a set of unique blocks.',
                    size: '16px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "btn": {
                    text: 'START NOW',
                    size: '14px',
                    color: '#fff',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "bg": {
                  picture: sample2
              }
                
            },
            "3": {
                "h": {
                    text: 'No Coding',
                    size: '24px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "s": {
                    text: 'No html/css',
                    size: '16px',
                    color: ' #7890A3',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'
                },
                "p": {
                    text: "You don't have to code to create your own site. Select one of available themes.",
                    size: '16px',
                    color: '#000',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "btn": {
                    text: 'START NOW',
                    size: '14px',
                    color: '#fff',
                    bold: false,
                    underline: false,
                    italic: false,
                    align: 'left',
                    family: 'Sans-serif'

                },
                "bg": {
                  picture: sample3
              }
            }


        }

        }
       
       
    }

]

export default blocks;
