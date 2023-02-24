import React, { useContext, useState, useEffect } from "react";
import GLOBAL from "../../Utils/Global";
import Dropdown from "../Dropdown/Dropdown";
import Movie from "../Movie/Movie";
import { useMyMoviesAxios, useTheMovieDbAxios } from "../../Utils/Axios";
import { RefetchContext } from "../../App";
import { Spinner } from "react-bootstrap";

const MovieList = () => {
  const { refetchMyMovies } = useContext(RefetchContext);
  const [
    { data: myMovies, loading: myMoviesLoading, error: myMoviesError },
    refetch,
  ] = useMyMoviesAxios({
    url: GLOBAL.ENV.MOVIES,
  });

  useEffect(() => {
    if (refetchMyMovies) refetch();
  }, [refetchMyMovies, refetch]);

  const [{ data: popularMovies }] = useTheMovieDbAxios({
    url: GLOBAL.ENV.POPULAR,
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selected, setSelected] = useState(GLOBAL.DROPDOWN.POPULAR);
  const [anchorEl, setAnchorEl] = useState();

  let movieList = [];

  if (selected === GLOBAL.DROPDOWN.POPULAR) movieList = popularMovies;

  if (selected === GLOBAL.DROPDOWN.MY_MOVIES) {
    movieList = myMoviesLoading || myMoviesError ? [] : myMovies;
  }

  const firstMovies = movieList.slice(0, 4);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDropdown(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenDropdown(false);
  };

  return (
    <RefetchContext.Consumer>
      {(value) => (
        <div className="movielist">
          <div className="d-flex movielist__choose">
            <div className="movielist__choose__watch">{GLOBAL.HOME.WATCH}</div>
            <div className="movielist__choose__popular" onClick={handleClick}>
              {selected}
              <img src="icons/arrow.svg" alt="plus" />
            </div>
          </div>
          <Dropdown
            setSelected={setSelected}
            selected={selected}
            handleClose={handleClose}
            open={openDropdown}
            anchorEl={anchorEl}
          />
          <div className="d-flex flex-column movielist__movies">
            {myMoviesLoading ? (
              <Spinner />
            ) : (
              firstMovies.map((movie, i) => (
                <Movie
                  picture={movie.image}
                  title={movie.original_title}
                  voteAverage={movie.vote_average}
                  releaseDate={movie.release_date}
                  selected={selected}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
      )}
    </RefetchContext.Consumer>
  );
};

export default MovieList;
