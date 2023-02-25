import IdeaToText from "Components/IdeaToText/IdeaToText";
import Navigation from "Components/Navigation/Navigation";
import TextToSpeech from "Components/TextInput/TextToSpeech";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navigation />
      {/* <TextToSpeech /> */}
      <IdeaToText />
    </Fragment>
  );
}
