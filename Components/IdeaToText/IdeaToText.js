import style from "./IdeaToText.module.css";

const IdeaToText = () => {
  return (
    <section className={style.Section}>
      <div className={style.RecivedTextParrent}>
        <span className={style.RecivedText}>
          In this example, we're using the Typewriter component to display the
          text we receive from the GPT-3 API. When the user clicks the "Generate
          Text" button, we make a request to the GPT-3 API using the axios
          library. When we receive a response, we set the gptText state to the
        </span>
      </div>
      <div className={style.SendTextParrent}>
        <textarea className={style.TextArea}></textarea>
      </div>
    </section>
  );
};
export default IdeaToText;
