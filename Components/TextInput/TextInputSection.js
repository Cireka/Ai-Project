import style from "./TextInputSection.module.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TextInputSection = () => {
  const [textInput, setTextInput] = useState("");
  const [voiceName, setVoiceName] = useState("21m00Tcm4TlvDq8ikWAM");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [apiPersonalData, setApiPersonalData] = useState([]);

  const InputChangeHandler = (event) => {
    event.preventDefault();
    setTextInput(event.target.value);
  };

  const SubmitHandler = (event) => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceName}`;
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

    const myHeaders = {
      accept: "application/json",
      "xi-api-key": "8f358a86ce3dd5ba829791045b3ff889",
    };

    axios
      .get("https://api.elevenlabs.io/v1/user", { headers: myHeaders })
      .then((response) => {
        const data = response.data;
        setApiPersonalData(response.data.subscription);
        // do something with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const optionChangeHandler = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedId = selectedOption.getAttribute("id");
    setVoiceName(selectedId);
  };

  useEffect(() => {
    const url =
      "https://api.elevenlabs.io/v1/voices?xi-api-key=8f358a86ce3dd5ba829791045b3ff889";

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.voices);
        setVoices(response.data.voices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={style.Section}>
      <div className={style.InputPrrent}>
        <div className={style.FormHeader}>
          <h1>Speech Synthesis</h1>
        </div>
        <div className={style.OptionsListParrent}>
          <h2>Settinigs</h2>
          <div className={style.OptionsContainer}>
            <select onChange={optionChangeHandler}>
              {voices.map((item) => {
                return (
                  <option id={item.voice_id} value={`${item.name}`}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <form className={style.form} onSubmit={SubmitHandler}>
          <div className={style.InputFormContainer}>
            <h2>Text</h2>
            <div>
              <textarea
                placeholder="Type or copy text here. The model works best on longer fragments."
                onChange={InputChangeHandler}
                className={style.TextInput}
                type="text"
              />
              <h2>
                {apiPersonalData.character_count}/
                {apiPersonalData.character_limit}
              </h2>
              <button type="submit" className={style.Button}>
                Generate
              </button>
            </div>
          </div>
        </form>
        {audioUrl && <audio className={style.Audio} controls src={audioUrl} />}
      </div>
    </section>
  );
};

export default TextInputSection;
