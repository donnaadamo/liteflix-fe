import React, { useState } from "react";
import GLOBAL from "../../Utils/Global";
import Menu from "../Menu/Menu";
import AddMovie from "../AddMovie/AddMovie";
import Logo from "../Logo/Logo";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAddMovie, setOpenAddMovie] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleToggleAddMovie = () => {
    setOpenAddMovie(!openAddMovie);
  };

  return (
    <div className="header">
      <img
        src="icons/menuInverted.svg"
        alt="menu"
        className="header__menuInverted icons"
        onClick={handleToggleMenu}
      />
      <div className="d-flex">
        <Logo />
        <div className="header__addMovie" onClick={handleToggleAddMovie}>
          <img src="icons/plus.svg" alt="plus" /> {GLOBAL.COMMON.ADD_MOVIE}
        </div>
      </div>
      <div className="header__icons">
        <img
          src="icons/menu.svg"
          alt="menu"
          className="header__icons__menu icons"
          onClick={handleToggleMenu}
        />
        <img
          src="icons/notif.svg"
          alt="notif"
          className="header__icons__notif icons"
        />
        <img
          src="icons/profile.png"
          alt="profile"
          className="header__icons__profile icons"
        />
      </div>
      {openMenu && (
        <Menu
          handleToggleMenu={handleToggleMenu}
          handleToggleAddMovie={handleToggleAddMovie}
        />
      )}
      {openAddMovie && <AddMovie handleToggleAddMovie={handleToggleAddMovie} />}
    </div>
  );
};

export default Header;
