import IdeaToText from "Components/IdeaToText/IdeaToText";
import Navigation from "Components/Navigation/Navigation";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navigation />
      <IdeaToText />
    </Fragment>
  );
}
