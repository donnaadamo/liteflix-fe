import React, { createContext, useEffect, useState } from "react";
import GLOBAL from "./Utils/Global";
import Home from "./Containers/Home/Home";
import Header from "./Components/Header/Header";
import { Container, Spinner } from "react-bootstrap";
import { useTheMovieDbAxios } from "./Utils/Axios";

export const RefetchContext = React.createContext();

function App() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const [{ loading: popularLoading, error: popularError }] = useTheMovieDbAxios(
    {
      url: GLOBAL.ENV.POPULAR,
    }
  );

  const [
    {
      data: outstandingData,
      loading: outstandingLoading,
      error: outstandingError,
    },
  ] = useTheMovieDbAxios({
    url: GLOBAL.ENV.OUTSTANDING,
  });

  const [refetchMyMovies, setRefetchMyMovies] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  if (popularLoading || outstandingLoading)
    return <Spinner className="spinner" />;

  if (popularError || outstandingError)
    return "Lo sentimos, en este momento no podemos cargar la pagina :(";

  return (
    <RefetchContext.Provider value={{ refetchMyMovies, setRefetchMyMovies }}>
      <Container
        fluid
        className="app"
        style={{
          backgroundImage: matches
            ? `url(${GLOBAL.COMMON.IMAGES_URL}${outstandingData.backdrop_path})`
            : `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%), url(${GLOBAL.COMMON.IMAGES_URL}${outstandingData.poster_path})`,
        }}
      >
        <Header />
        <Home outstanding={outstandingData} />
      </Container>
    </RefetchContext.Provider>
  );
}

export default App;
