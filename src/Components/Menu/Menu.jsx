import React, { useEffect } from "react";
import GLOBAL from "../../Utils/Global";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import Logo from "../Logo/Logo";

const Menu = ({ handleToggleMenu, handleToggleAddMovie }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      handleToggleMenu();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className="menu" onClick={handleToggleMenu}>
      <div className="menu__content" onClick={(e) => e.stopPropagation()}>
        <div className="menu__content__header">
          <div>
            <img src="icons/close.svg" alt="plus" onClick={handleToggleMenu} />
          </div>
          <div className="menu__content__logo">
            <Logo />
          </div>
          <div>
            <img
              src="icons/notif.svg"
              alt="notif"
              className="menu__content__notif"
            />
            <img src="icons/profile.png" alt="profile" />
          </div>
        </div>
        <div className="menu__content__list">
          {Object.values(GLOBAL.MENU).map((e) => (
            <ButtonCustom
              description={e}
              className={"menu__content__buttons"}
            />
          ))}
          <ButtonCustom
            description={GLOBAL.COMMON.ADD_MOVIE}
            src={"icons/plus.svg"}
            handleClick={handleToggleAddMovie}
            className={
              "menu__content__buttons menu__content__buttons__addmovie"
            }
          />
          <ButtonCustom
            description={GLOBAL.COMMON.LOGOUT}
            className={"menu__content__buttons"}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
