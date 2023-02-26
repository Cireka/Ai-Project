import style from "./IdeaToText.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const IdeaToText = () => {
  const [text, setText] = useState("");
  const [responses, setResponses] = useState([]);
  const GptKey = process.env.GPT_KEY;

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [responses]);

  useEffect(() => {
    if (text !== "") {
      axios
        .post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: `${responses.join("\n")}\n${text}`,
            temperature: 0.9,
            max_tokens: 450,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${GptKey}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setResponses([...responses, text, res.data.choices[0].text]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [text]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setText(event.target.value);
      console.log(GptKey);
    }
  };

  return (
    <section className={style.Section}>
      <div className={style.RecivedTextParrent}>
        {responses.map((text, index) => (
          <span key={index} className={style.RecivedText}>
            {text}
          </span>
        ))}
      </div>
      <div className={style.SendTextParrent}>
        <textarea onKeyDown={handleKeyDown} className={style.TextArea} />
      </div>
    </section>
  );
};

export default IdeaToText;
