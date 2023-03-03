import Navigation from "Components/Navigation/Navigation";
import style from "./TextToImage.module.css";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TextToImagePage = () => {
  const [picture, setPicture] = useState([]);
  const [imagePrompt, setImagePrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const GptKey = process.env.GPT_KEY;

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [picture]);

  useEffect(() => {
    if (imagePrompt.length >= 1) {
      setLoading(true);
      axios
        .post(
          "https://api.openai.com/v1/images/generations",
          {
            model: "image-alpha-001",
            prompt: imagePrompt.slice(-1)[0],
            num_images: 1,
            size: "256x256",
          },
          {
            headers: {
              Authorization: `Bearer ${GptKey}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setPicture((previousPictures) => [
            ...previousPictures,
            res.data.data[0],
          ]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [imagePrompt]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && loading === false) {
      event.preventDefault();
      setImagePrompt((previousImagePrompts) => [
        ...previousImagePrompts,
        event.target.value,
      ]);
      setTimeout(() => {
        event.target.value = ""; // Clear the value of the textarea
      }, 0);
    }
  };

  return (
    <Fragment>
      <Navigation />
      <section className={style.Section}>
        <div className={style.RecivedTextParrent}>
          {picture.length >= 1 &&
            picture.map((item, index) => {
              return (
                <div key={Math.random()} className={style.ChatParrent}>
                  <h2 key={Math.random()}>{imagePrompt[index]}</h2>
                  <img key={Math.random()} src={item.url} />
                </div>
              );
            })}
          {loading && <span className={style.RecivedText}>Loading...</span>}
        </div>
        <div className={style.SendTextParrent}>
          <textarea onKeyDown={handleKeyDown} className={style.TextArea} />
        </div>
      </section>
    </Fragment>
  );
};
export default TextToImagePage;
