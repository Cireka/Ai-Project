import style from "./TextInputSection.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

const TextInputSection = () => {
  const [textInput, setTextInput] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const InputChangeHandler = (event) => {
    event.preventDefault();
    setTextInput(event.target.value);
  };

  const SubmitHandler = (event) => {
    const url =
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM";
    const apiKey = "8f358a86ce3dd5ba829791045b3ff889";

    const data = {
      text: textInput,
      voice_settings: {
        stability: 0,
        similarity_boost: 0,
      },
    };

    const headers = {
      accept: "audio/mpeg",
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    };

    event.preventDefault();
    axios
      .post(url, data, { headers, responseType: "blob" })
      .then((response) => {
        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        setAudioUrl(URL.createObjectURL(audioBlob));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(textInput);

  return (
    <section className={style.Section}>
      <div className={style.InputPrrent}>
        <form onSubmit={SubmitHandler}>
          <input
            onChange={InputChangeHandler}
            className={style.TextInput}
            type="text"
          />
          <button type="submit" className={style.Button}>
            Call Ai
          </button>
          {audioUrl && <audio controls src={audioUrl} />}
        </form>
      </div>
    </section>
  );
};

export default TextInputSection;
