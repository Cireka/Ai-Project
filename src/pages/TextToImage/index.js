import Navigation from "Components/Navigation/Navigation";
import style from "./TextToImage.module.css";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TextToImagePage = () => {
  const [picture, setPicture] = useState([]);
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const GptKey = process.env.GPT_KEY;

  useEffect(() => {
    if (imagePrompt !== "") {
      setLoading(true);
      axios
        .post(
          "https://api.openai.com/v1/images/generations",
          {
            model: "image-alpha-001",
            prompt: imagePrompt,
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
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setImagePrompt(event.target.value);
      event.target.value = ""; // Clear the value of the textarea
    }
  };

  console.log(picture);

  return (
    <Fragment>
      <Navigation />
      <section className={style.Section}>
        <div className={style.RecivedTextParrent}>
          {/* {responses.map((text, index) => (
          <span key={index} className={style.RecivedText}>
            {text}
          </span>
        ))} */}
          {picture.length >= 1 &&
            picture.map((item, index) => {
              return <img key={index} src={item.url} />;
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
