import React from "react";
import GLOBAL from "../../Utils/Global";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import MovieList from "../../Components/MovieList/MovieList";

const Home = ({ outstanding }) => {
  return (
    <div className="home">
      <div className="home__outstanding">
        <div className="d-flex home__outstanding__original">
          <div className="home__outstanding__original__left">
            {GLOBAL.HOME.ORIGINAL}
          </div>
          <div className="home__outstanding__original__right">
            {GLOBAL.COMMON.LITEFLIX}
          </div>
        </div>
        <div className="d-flex home__outstanding__title">
          {outstanding.original_title}
        </div>
        <div className="d-flex home__outstanding__buttons">
          <ButtonCustom
            description={GLOBAL.HOME.PLAY}
            className="home__outstanding__buttons__play"
            src={"icons/play.svg"}
          />
          <ButtonCustom
            description={GLOBAL.HOME.MY_LIST}
            className="home__outstanding__buttons__mylist"
            src={"icons/plus.svg"}
          />
        </div>
      </div>
      <MovieList />
    </div>
  );
};

export default Home;
