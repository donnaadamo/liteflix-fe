import React, { useState } from "react";
import GLOBAL from "../../Utils/Global";

const Movie = ({ picture, title, voteAverage, releaseDate, selected }) => {
  const year = new Date(releaseDate).getFullYear();
  const [over, setOver] = useState(false);

  return (
    <div
      className="movie"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%), url(${picture})`,
      }}
    >
      <div className="movie__background"></div>
      <div className="movie__play">
        <div
          className="movie__icon"
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          <img
            src={over ? "icons/playblack.svg" : "icons/play.svg"}
            alt="play"
          />
        </div>
        <div className="movie__title">{title}</div>
      </div>
      {selected === GLOBAL.DROPDOWN.POPULAR && (
        <div className="movie__info">
          <div>
            <img src="icons/starAqua.svg" alt="star" /> {voteAverage}
          </div>
          <div>{year}</div>
        </div>
      )}
    </div>
  );
};

export default Movie;
