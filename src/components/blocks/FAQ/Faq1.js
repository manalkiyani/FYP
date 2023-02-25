import { useState } from "react";
import styles from "./faq.module.css";
import ContentEditable from "react-contenteditable";
import HandleBlock from "../HandleBlock/handleBlock";

function FaqItem({ question, answer, style, index, id, onClick, changeText }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.faqItem}>
      <div className={styles.faqQuestion} onClick={toggleOpen}>
        <ContentEditable
          html={question} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) =>
            changeText(e.target.value, index, "question", id, "faq1")
          }
          onClick={() => onClick(id, "question", null, "faq1")}
          style={{
            fontSize: style.question.size,
            fontFamily: style.question.family,
            color: style.question.color,
            fontWeight: style.question.bold === true ? "bold" : "normal",
            textDecoration:
              style.question.underline === true ? "underline" : "none",
            fontStyle: style.question.italic === true ? "italic" : "normal",
            textAlign: style.question.align,
          }}
        />
        <button
          className={`${styles.toggleButton} ${isOpen ? styles.open : ""}`}
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>
      <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ""}`}>
        <ContentEditable
          html={answer} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) =>
            changeText(e.target.value, index, "answer", id, "faq1")
          } // handle innerHTML change
          onClick={() => onClick(id, "answer", null, "faq1")}
          style={{
            fontSize: style.answer.size,
            fontFamily: style.answer.family,
            color: style.answer.color,
            fontWeight: style.answer.bold === true ? "bold" : "normal",
            textDecoration:
              style.answer.underline === true ? "underline" : "none",
            fontStyle: style.answer.italic === true ? "italic" : "normal",
            textAlign: style.answer.align,
          }}
        />
      </div>
    </div>
  );
}

export default function Faq1(props) {
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  console.log(displayHandleBlock);
  return (
    <div
      className={styles.faqSection}
      onMouseOver={() => setDisplayHandleBlock(true)}
      onMouseOut={() => setDisplayHandleBlock(false)}
      
    >
      {displayHandleBlock && (
        <HandleBlock
          del={() => props.deleteBlock(props.id)}
          enableDrag={props.enableDrag}
        />
      )}
      <ContentEditable
        className={styles.heading}
        html={props.Data.data.heading.text} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={(e) =>
          props.changeText(e.target.value, null, "heading", props.id, "faq1")
        } // handle innerHTML change
        onClick={() => props.onClick(props.id, "heading", null, "faq1")}
        style={{
          fontSize: props.Data.data.heading.size,
          fontFamily: props.Data.data.heading.family,
          color: props.Data.data.heading.color,
          fontWeight: props.Data.data.heading.bold === true ? "bold" : "normal",
          textDecoration:
            props.Data.data.heading.underline === true ? "underline" : "none",
          fontStyle:
            props.Data.data.heading.italic === true ? "italic" : "normal",
          textAlign: props.Data.data.heading.align,
        }}
      />

      <div className={styles.faqList}>
        {props.Data.data.faqList.map((faq, index) => {
          return (
            <FaqItem
              key={index}
              style={props.Data.data.style}
              question={faq.question}
              answer={faq.answer}
              index={index}
              id={props.id}
              onClick={props.onClick}
              changeText={props.changeText}
            />
          );
        })}
      </div>
    </div>
  );
}
