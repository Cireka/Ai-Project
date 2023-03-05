import style from "./TextToSpeech.module.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TextToSpeech = () => {
  const [textInput, setTextInput] = useState("");
  const [voiceName, setVoiceName] = useState("21m00Tcm4TlvDq8ikWAM");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [apiPersonalData, setApiPersonalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const TextToSpeechApi = process.env.TEXT_TO_SPEECH;

  useEffect(() => {
    const myHeaders = {
      accept: "application/json",
      "xi-api-key": TextToSpeechApi,
    };
    axios
      .get("https://api.elevenlabs.io/v1/user", { headers: myHeaders })
      .then((response) => {
        setApiPersonalData(response.data.subscription);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [audioUrl]);

  const InputChangeHandler = (event) => {
    event.preventDefault();
    setTextInput(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceName}`;
    const apiKey = TextToSpeechApi;
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
    setLoading(true);
    axios
      .post(url, data, { headers, responseType: "blob" })
      .then((response) => {
        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        setAudioUrl(URL.createObjectURL(audioBlob));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  };

  const optionChangeHandler = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedId = selectedOption.getAttribute("id");
    setVoiceName(selectedId);
  };

  useEffect(() => {
    const url = `https://api.elevenlabs.io/v1/voices?xi-api-key=${TextToSpeechApi}`;

    axios
      .get(url)
      .then((response) => {
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
                  <option
                    key={item.voice_id}
                    id={item.voice_id}
                    value={`${item.name}`}
                  >
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
              {apiPersonalData.character_count && (
                <h2>
                  {apiPersonalData.character_count}/
                  {apiPersonalData.character_limit}
                </h2>
              )}
              <button type="submit" className={style.Button}>
                Generate
              </button>
            </div>
          </div>
        </form>
        {loading === false && audioUrl !== null && (
          <audio className={style.Audio} controls src={audioUrl} />
        )}
        {loading === true && <h1 className={style.Audio}>Loading...</h1>}
      </div>
    </section>
  );
};

export default TextToSpeech;
