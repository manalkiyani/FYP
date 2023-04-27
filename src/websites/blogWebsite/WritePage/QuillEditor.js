import React from "react";
import ReactQuill from "react-quill";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

const QuillEditor = ({ handleChangeDescription }) => {
  const quillRef = React.useRef(null);
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        // text direction

        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["link", "image", "video"], // link, image, and video
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            const file = input.files[0];
            try {
              const link = await uploadImage(file);
              console.log(link);
              let quillObj = quillRef.current.getEditor();
              const range = quillObj.getSelection();
              let position = range ? range.index : 0;
              console.log(range);
              quillObj.insertEmbed(position, "image", link);
              quillObj.setSelection(position + 1);
              // quillObj.editor.insertEmbed(range.index, "image", link);
            } catch (err) {
              console.log(err);
            }
          };
        },

        // video: () => {
        //   const url = prompt("Enter the video URL");
        //   const range = quillRef.current.getEditor().getSelection(true);
        //   quillRef.current
        //     .getEditor()
        //     .insertEmbed(range.index, "video", url, "user");
        // },
      },
    },
  };
  return (
    <ReactQuill
      ref={quillRef}
      placeholder={"Write something awesome..."}
      style={{ height: "100%" }}
      theme="snow"
      //  value={desc}
      onChange={handleChangeDescription}
      modules={modules}
    />
  );
};

export default QuillEditor;
