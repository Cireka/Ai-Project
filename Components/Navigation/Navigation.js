import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <section className={style.Navigation}>
      <div className={style.NavigationParrent}>
        <h1>E-Booker</h1>
        <div className={style.NavParrent}>
          <h1>Idea To Text</h1>
          <h1>Text To Speech</h1>
          <h1>Idea To Image</h1>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
