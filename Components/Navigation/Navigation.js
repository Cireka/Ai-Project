import style from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <section className={style.Navigation}>
      <div className={style.NavigationParrent}>
        <h1>E-Booker</h1>
        <div className={style.NavParrent}>
          <Link href={"/"}>Idea To Text</Link>
          <Link href={"/TextToSpeech"}>Text To Speech</Link>
          <Link href={"/TextToImage"}>Text To Image</Link>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
