import hours from "../../assets/imgs/hours.png";
import printer from "../../assets/imgs/printer.png";
import link from "../../assets/imgs/link.png";
import Faq1 from "./FAQ/Faq1";
import Header1 from "./Header1/Header1";
import Header2 from "./Header2/Header2";
import Header3 from "./Header3/Header3";

import Features1 from "./Features1/Features1";
import Features2 from "./Features2/Features2";
import Features3 from "./Features3/Features3";

import sample1 from "../../assets/imgs/sample1.jpg";
import sample2 from "../../assets/imgs/sample2.jpg";
import sample3 from "../../assets/imgs/sample3.jpg";
import sample4 from "../../assets/imgs/sample4.jpg";
import sample5 from "../../assets/imgs/sample5.webp";

import Gallery1 from "./Gallery1/Gallery1";
import Gallery2 from "./Gallery2/Gallery2";

import About1 from "./About1/About1";
import { Features4 } from "./Features4/Features4";
import People1 from "./People/People1";
import People2 from "./People/People2";

const blocks = [
  //header1
  {
    type: "header1",
    img: "header1.png",
    Component: Header1,
    Data: {
      socialIcons: [
        {
          icon: "Facebook",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684435757/social_imb14a.png",
          link: "",
        },
        {
          icon: "Twitter",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684435758/social_1_dma9dz.png",
          link: "",
        },
        {
          icon: "Instagram",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684436107/instagram_2_ybnpzw.png",
          link: "",
        },
      ],
      data: {
        h: {
          text: "Intro with an Image",
          size: "48px",
          color: "#333333",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Fantasy",
          spacing: "0px",
          height: "80px",
          weight: "500",
        },
        p: {
          text: "Easily create small/medium websites, landing pages, portfolios. beautiful website blocks, templates and themes help you to start easily.Easily create small/medium websites, landing pages, portfolios.",
          size: "18px",
          color: "#CCCCCC",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
          spacing: "0px",
          height: "25px",
          weight: "500",
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
          bgColor: "#000",
          spacing: "0px",
          height: "20px",
          weight: "500px",
          link: {
            url: "",
            page: "",
            detail: "",
          },
        },
        img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1678558265/pexels-quang-nguyen-vinh-2649403_byuwhi.jpg",
      },
    },
  },
  //medical header2
  {
    type: "header2",
    img: "header2.png",
    Component: Header2,
    Data: {
      data: {
        h: {
          text: "Create Your Websites Automagically",
          size: "48px",
          color: "#000",
          bold: true,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
          spacing: "1px",
          height: "100px",
          weight: "500",
        },
        p: {
          text: "Build fully functional accessible web applications faster than ever – Mantine includes more than 120 customizable components and hooks to cover you in any situation",
          size: "20px",
          color: "#808080",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
          spacing: "0px",
          height: "30px",
          weight: "500",
        },
        btn: {
          text: "Get Started",
          size: "14px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
          bgColor: "#000",
          spacing: "0px",
          height: "20px",
          weight: "500",
          link: {
            url: "",
            page: "",
            detail: "",
          },
        },
       
        img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684317004/image.9a65bd94_dqb9jb.svg",
        bgColor: "#EBEBFF",
      },
    },
  },
  //spring sales header3
  {
    type: "header3",
    img: "header3.png",
    Component: Header3,
    Data: {
      data: {
        h: {
          text: "Create Your Website",
          size: "48px",
          color: "#000000",
          bold: true,
          underline: false,
          italic: false,
          align: "left",
          family: "Poppins",
          spacing: "1px",
          height: "100px",
          weight: "500",
        },
        //Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        s: {
          text: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.",
          size: "18px",
          color: "#808080",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Sans-serif",
          spacing: "0px",
          height: "30px",
        },
        btn: {
          text: "START NOW",
          size: "14px",
          color: "#000",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
          bgColor: "#000",
          spacing: "0px",
          height: "20px",
          link: {
            url: "",
            page: "",
            detail: "",
          },
        },
        img: "https://www.turintech.ai/wp-content/uploads/2022/07/Fast-2048x1638.png",
        bgColor: "#fff",
      },
    },
  },
  //faq1
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
            spacing: "0px",
            height: "30px",
          },
          answer: {
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
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
          spacing: "0px",
          height: "60px",
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
  //features4
  {
    type: "features4",
    img: "features4.png",
    Component: Features4,
    Data: {
      layout: 2,
      data: {
        1: {
          h: {
            text: "Best forests to visit in North America",
            size: "32px",
            color: "#fff",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
          },

          p: {
            text: "NATURE",
            size: "16px",
            color: "#ccc",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
          },
          btn: {
            text: "Read Article",
            size: "12px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            bgColor: "#000",
            spacing: "0px",
            height: "30px",
            link: {
              url: "",
              page: "",
              detail: "",
            },
          },
          bg: {
            picture: sample4,
          },
        },
        2: {
          h: {
            text: "Paradox of Fading Beauty",
            size: "32px",
            color: "#fff",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
          },

          p: {
            text: "Beauty",
            size: "16px",
            color: "#ccc",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
          },
          btn: {
            text: "Start Now",
            size: "12px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            bgColor: "#000",
            spacing: "0px",
            height: "30px",
          },
          bg: {
            picture: sample5,
          },
        },
      },
    },
  },
  //features2
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
          },
          btn: {
            text: "Start Now",
            size: "12px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            bgColor: "#000",
            spacing: "0px",
            height: "30px",
            link: {
              url: "",
              page: "",
              detail: "",
            },
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
          },
          btn: {
            text: "Start Now",
            size: "12px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            bgColor: "#000",
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
          },
          btn: {
            text: "Start Now",
            size: "12px",
            color: "#fff",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            bgColor: "#000",
            spacing: "0px",
            height: "30px",
          },
          bg: {
            picture: sample3,
          },
        },
      },
    },
  },
  //features3 , 2 cards
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
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
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
          bg: {
            picture: sample2,
          },
        },
      },
    },
  },
  //features1 , icon
  {
    type: "features1",
    img: "features1.png",
    Component: Features1,
    Data: {
      layout: 2,
      data: {
        1: {
          h: {
            text: "Lawyers",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
          p: {
            text: "Fans obsess over the particular length and angle of its arms",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1684316379/lawyers.3ddb0c33_faaaeb.svg",
          },
        },
        2: {
          h: {
            text: "Others",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1684316426/others.0a9c7795_i7v9q2.svg",
          },
          p: {
            text: "Phanpy uses its long nose to shower itself",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
        },
        3: {
          h: {
            text: "Bank owners",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
          p: {
            text: "They divvy up their prey evenly among the members of their pack",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1684316421/accountants.ba1b4633_pygojv.svg",
          },
        },
        4: {
          h: {
            text: "Pharmacists",
            size: "20px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
          p: {
            text: "Azurill can be seen bouncing and playing on its big, rubbery tail",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1684316355/auditors.32124e83_qzg8oq.svg",
          },
        },
      },
    },
  },
  //gallery1
  {
    type: "gallery1",
    img: "gallery1.jpeg",
    Component: Gallery1,
    Data: {
      layout: 3,
      data: {
        1: {
          p: {
            text: "BEAUTY",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },
          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679295087/sunny-ng-KVIlNRoGwxk-unsplash_j5mxm3.jpg",
          },
        },
        2: {
          p: {
            text: "NATURE",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679296051/evie-s-vz3IQy0LOaA-unsplash_fobcsr.jpg",
          },
        },
        3: {
          p: {
            text: "LIFE",
            size: "16px",
            color: "#000",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "30px",
            weight: "500",
          },

          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679223218/ldsgk8wnpb8jcshaxhb3.jpg",
          },
        },
      },
    },
  },
  //gallery2
  {
    type: "gallery2",
    img: "gallery2.jpeg",
    Component: Gallery2,
    Data: {
      data: {
        1: {
          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679302828/hanna-balan-W-CDfBfMCzQ-unsplash_zbdsq8.jpg",
          },
        },
        2: {
          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679302849/valentina-ivanova-vLWKTPPp72g-unsplash_z6hnt9.jpg",
          },
        },

        3: {
          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679304300/hanna-balan-1cMQFzjaXi0-unsplash_xez11j.jpg",
          },
        },
        4: {
          bg: {
            picture:
              "https://res.cloudinary.com/djlewzcd5/image/upload/v1679303000/pexels-brett-sayles-992734_br54dm.jpg",
          },
        },
      },
    },
  },
  //about
  {
    type: "about1",
    img: "about1.jpeg",
    Component: About1,
    Data: {
      data: {
        h: {
          text: "ABOUT",
          size: "36px",
          color: "#000000",
          bold: false,
          underline: false,
          italic: false,
          align: "left",
          family: "Serif",
          spacing: "0px",
          height: "30px",
          weight: "500",
        },
        p: {
          text: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.",
          size: "16px",
          color: "#808080",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
          spacing: "0px",
          height: "30px",
          weight: "500",
        },
        btn: {
          text: "READ MORE",
          size: "14px",
          color: "#fff",
          bold: false,
          underline: false,
          italic: false,
          align: "center",
          family: "Sans-serif",
          spacing: "0px",
          height: "30px",
          weight: "500",
          bgColor: "#000",
          link: {
            url: "",
            page: "",
            detail: "",
          },
        },

        bgColor: "#DCEDC8",
      },
    },
  },
  //people1 , 2 cards
  {
    type: "people1",
    img: "people1.png",
    Component: People1,
    Data: {
      socialIcons: [
        {
          icon: "Facebook",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684435757/social_imb14a.png",
          link: "",
        },
        {
          icon: "Twitter",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684435758/social_1_dma9dz.png",
          link: "",
        },
        {
          icon: "Instagram",
          url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684436107/instagram_2_ybnpzw.png",
          link: "",
        },
      ],
      layout: 1,
      data: {
        1: {
          h: {
            text: "John Smith",
            size: "32px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "80px",
          },
           s: {
            text: "Programmar",
            size: "18px",
            color: "#7890A3",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
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
            spacing: "0px",
           
          },
          bg: {
            picture: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684432107/pexels-pixabay-220453_dd0tny.jpg",
          },
        },
        2: {
          h: {
            text: "Ann Brown",
            size: "32px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
          },
           s: {
            text: "Manager",
            size: "18px",
            color: "#7890A3",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
          
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
            spacing: "0px",
           
            weight: "500",
          },
          bg: {
            picture: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684432098/pexels-cottonbro-studio-10669639_sc5tjo.jpg",
          },
        },
      },
    },
  },
  //people 2
  {
    type: "people2",
    img: "people2.png",
    Component: People2,
    Data: {
     
      layout: 1,
      data: {
        1: {
          h: {
            text: "Alexa",
            size: "18px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
            height: "50px",
          },
           s: {
            text: "Programmar",
            size: "14px",
            color: "#7890A3",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
          },
          p: {
            text: "Just drop site elements to your page, add content and style it to look the way you like.Just drop site elements to your page, add content and style it to look the way you like",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
          },
          bg: {
            picture: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684432107/pexels-pixabay-220453_dd0tny.jpg",
          },
        },
        2: {
          h: {
            text: "Ann Brown",
            size: "18px",
            color: "#000",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
          },
           s: {
            text: "Manager",
            size: "14px",
            color: "#7890A3",
            bold: true,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
          
          },
          p: {
            text: "Select the theme that suits you. Each theme contains a set of unique blocks.Just drop site elements to your page, add content and style it to look the way you like",
            size: "16px",
            color: " #7890A3",
            bold: false,
            underline: false,
            italic: false,
            align: "left",
            family: "Sans-serif",
            spacing: "0px",
           
            weight: "500",
          },
          bg: {
            picture: "https://res.cloudinary.com/djlewzcd5/image/upload/v1684432098/pexels-cottonbro-studio-10669639_sc5tjo.jpg",
          },
        },
      },
    },
  },
];

export default blocks;
