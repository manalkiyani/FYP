import { useState } from "react";
import styles from "../../../components/blocks/FAQ/faq.module.css";
import ContentEditable from "react-contenteditable";

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
          disabled={true} // use true to disable editing
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
          disabled={true} // use true to disable editing
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

export default function ViewerFaq1(props) {
  return (
    <div className={styles.faqSection}>
      <ContentEditable
        className={styles.heading}
        html={props.Data.data.heading.text} // innerHTML of the editable div
        disabled={true} // use true to disable editing
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
            />
          );
        })}
      </div>
    </div>
  );
}
