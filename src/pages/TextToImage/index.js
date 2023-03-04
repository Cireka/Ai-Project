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
  const [pictureSize, setPictureSize] = useState("256x256");

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [picture]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            size: pictureSize,
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

  const optionClickHandler = (event) => {
    setPictureSize(event.target.value);
  };

  return (
    <Fragment>
      <Navigation />
      <section className={style.Section}>
        <div className={style.Settings}>
          <h2>Picture Size Selector</h2>
          <select onChange={optionClickHandler}>
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
          </select>
        </div>
        <div className={style.RecivedTextParrent}>
          <div className={style.Warning}>
            <h2>Read Before Using</h2>
            <p>
              It's pretty straightforward. Ask the API to generate a picture,
              for example, 'Kid Walking in the Forest Artwork'. You can also
              specify the size of the picture Below This Text. This GPT API has
              some weak points, so to get the best out of it, you must use
              correct prompt messages.le.
            </p>
            <p>
              Also, keep in mind that this is a project website for
              demonstration purposes only. I would be glad if you do not use API
              requests excessively.
            </p>
          </div>
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
