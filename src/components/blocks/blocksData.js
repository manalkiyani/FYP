import Features2 from "./Features2/Features2";
import Header1 from "./Header1/Header1";
import Header2 from "./Header2/Header2";
import Header3 from "./Header3/Header3";
import sample1 from "../../assets/imgs/sample1.jpg";
import sample2 from "../../assets/imgs/sample2.jpg";
import sample3 from "../../assets/imgs/sample3.jpg";
import hours from "../../assets/imgs/hours.png";
import printer from "../../assets/imgs/printer.png";
import link from "../../assets/imgs/link.png";
import Faq1 from "./FAQ/Faq1";
import Features3 from "./Features3/Features3";
import Features1 from "./Features1/Features1";


const blocks = [
  {
    type: "header1",
    img: "header1.png",
    Component: Header1,
    Data: {
      btnLink:{
        link:"",
        page:''
      },
      socialIcons: [
        {
          icon: "Facebook",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670229851/facebook_nunoeq.png",
          link: "",
        },
        {
          icon: "Twitter",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230136/twitter_xtgade.png",
          link: "",
        },
        {
          icon: "Instagram",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230168/instagram_ft5yeo.png",
          link: "",
        },
      ],
      data: {
        h: {
          text: "Intro with an Image",
          size: "32px",
          color: "#000",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        p: {
          text: "Easily create small/medium websites, landing pages, portfolios. beautiful website blocks, templates and themes help you to start easily.",
          size: "16px",
          color: "#000",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        btn: {
          text: "START NOW",
          size: "14px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
       img:'https://res.cloudinary.com/djlewzcd5/image/upload/v1678558265/pexels-quang-nguyen-vinh-2649403_byuwhi.jpg',
      },
    },
  },
  {
    type: "header2",
    img: "header2.png",
    Component: Header2,
    Data: {
      data: {
        h: {
          text: "For Private clinics and medical centers",
          size: "24px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
        },
        p: {
          text: "Simplify the day to day operations of your employees and increase the flow of patients",
          size: "16px",
          color: "#EBF1FC",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        btn: {
          text: "START NOW",
          size: "14px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1678545576/m3-removebg-preview_jorxiz.png",
        bgColor: "#068078",
      },
    },
  },
  {
    type: "header3",
    img: "header3.png",
    Component: Header3,
    Data: {
      data: {
        h: {
          text: "Spring Sales Only",
          size: "24px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
        },
        //Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        p: {
          text: "Upto 50% off",
          size: "16px",
          color: "#EBF1FC",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
        },
        s: {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          size: "16px",
          color: "#EBF1FC",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
        },
        btn: {
          text: "START NOW",
          size: "14px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1669815537/samples/ecommerce/shoes.png",
        bgColor: "#5f3777",
      },
    },
  },
  {
    type: "faq1",
    img: "faq1.png",
    Component: Faq1,
    Data: {
      data: {
        style: {
          question: {
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "right",
            family: "Sans-serif",
          },
          answer: {
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
        },
        heading: {
          text: "Frequently Asked Questions",
          size: "28px",
          color: "#000",
          bold: true,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
        },
        faqList: [
          {
            question: "What is Lorem Ipsum?",
            answer:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          },
          {
            question: "Why do we use it?",
            answer:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          },
          {
            question: "Where does it come from?",
            answer:
              "Contrary to popular belief, Lorem Ipsum is not simply random text.",
          },
        ],
      },
    },
  },

  {
    type: "features2",
    img: "features2.png",
    Component: Features2,
    Data: {
      layout: 3,
      data: {
        1: {
          h: {
            text: "Design",
            size: "24px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          s: {
            text: "Website Design",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          p: {
            text: "Just drop site elements to your page, add content and style it to look the way you like.",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          btn: {
            text: "START NOW",
            size: "14px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          bg: {
            picture: sample1,
          },
        },
        2: {
          h: {
            text: "Branding",
            size: "24px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          s: {
            text: "Creating Your Brand",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          p: {
            text: "Select the theme that suits you. Each theme contains a set of unique blocks.",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          btn: {
            text: "START NOW",
            size: "14px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          bg: {
            picture: sample2,
          },
        },
        3: {
          h: {
            text: "No Coding",
            size: "24px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          s: {
            text: "No html/css",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          p: {
            text: "You don't have to code to create your own site. Select one of available themes.",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          btn: {
            text: "START NOW",
            size: "14px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          bg: {
            picture: sample3,
          },
        },
      },
    },
  },
  {
    type: "features3",
    img: "features3.png",
    Component: Features3,
    Data: {
      layout: 2,
      data: {
        1: {
          h: {
            text: "Design",
            size: "24px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          p: {
            text: "Just drop site elements to your page, add content and style it to look the way you like.",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          bg: {
            picture: sample1,
          },
        },
        2: {
          h: {
            text: "Branding",
            size: "24px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          p: {
            text: "Select the theme that suits you. Each theme contains a set of unique blocks.",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },
          bg: {
            picture: sample2,
          },
        },
      },
    },
  },
  {
    type: "features1",
    img: "features1.png",
    Component: Features1,
    Data: {
      layout: 3,
      data: {
        1: {
          h: {
            text: "No Coding",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },

          bg: {
            picture: hours,
          },
        },
        2: {
          h: {
            text: "Unlimited Styles",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },

          bg: {
            picture: printer,
          },
        },
        3: {
          h: {
            text: "Branding",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
          },

          bg: {
            picture: link,
          },
        },
      },
    },
  },
];

export default blocks;
