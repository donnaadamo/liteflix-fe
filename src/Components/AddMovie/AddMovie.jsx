import React, { useState, useEffect, useContext } from "react";
import GLOBAL from "../../Utils/Global";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import FilesInput from "../FilesInput/FilesInput";
import { useMyMoviesAxios } from "../../Utils/Axios";
import StatusMessage from "./StatusMessage";
import { RefetchContext } from "../../App";
import { Spinner } from "react-bootstrap";

const AddMovie = ({ handleToggleAddMovie }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessageHeader, setStatusMessageHeader] = useState("");
  const [statusMessageText, setStatusMessageText] = useState("");
  const { setRefetchMyMovies } = useContext(RefetchContext);

  useEffect(() => {
    title.length > 0 && image !== null
      ? setReadyToUpload(true)
      : setReadyToUpload(false);
  }, [image, title]);

  const [{ data, loading, error }, executePost] = useMyMoviesAxios(
    {
      url: GLOBAL.ENV.MOVIES,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    },
    { manual: true }
  );

  const uploadMovie = async () => {
    const formData = new FormData();
    formData.append("original_title", title);
    formData.append("img", image);
    try {
      await executePost({
        data: formData,
      });
      setIsSuccess(true);
      setStatusMessageHeader(GLOBAL.ADD_MOVIE.UPLOADED_HEADER);
      setStatusMessageText(GLOBAL.ADD_MOVIE.UPLOADED_MESSAGE);
      setRefetchMyMovies(true);
    } catch (e) {
      setIsSuccess(false);
      setStatusMessageHeader(GLOBAL.ADD_MOVIE.ERROR_HEADER);
      setStatusMessageText(GLOBAL.ADD_MOVIE.ERROR_MESSAGE);
    }
  };

  return (
    <div className="addmovie" onClick={handleToggleAddMovie}>
      <div className="addmovie__content" onClick={(e) => e.stopPropagation()}>
        <div className="addmovie__content__header">
          <img
            src="icons/close.svg"
            alt="plus"
            onClick={handleToggleAddMovie}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="addmovie__content__body">
              {error || data ? (
                <StatusMessage
                  header={statusMessageHeader}
                  title={title}
                  text={statusMessageText}
                  error={error}
                />
              ) : (
                <>
                  <div className="addmovie__content__body__title">
                    {GLOBAL.COMMON.ADD_MOVIE}
                  </div>
                  <FilesInput onUpload={setImage} />
                  <input
                    type="text"
                    name="title"
                    placeholder={GLOBAL.ADD_MOVIE.TITLE}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </>
              )}
            </div>
            <ButtonCustom
              disabled={!readyToUpload}
              description={
                isSuccess || error
                  ? GLOBAL.ADD_MOVIE.HOME
                  : GLOBAL.ADD_MOVIE.UPLOAD_MOVIE
              }
              className={`addmovie__content__button ${
                readyToUpload && "addmovie__content__button__upload"
              }`}
              handleClick={
                isSuccess || error ? handleToggleAddMovie : uploadMovie
              }
            />
            <ButtonCustom
              description={GLOBAL.ADD_MOVIE.EXIT}
              className={`addmovie__content__button addmovie__content__button__exit ${
                isSuccess && "addmovie__content__button__hidden"
              }`}
              handleClick={handleToggleAddMovie}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AddMovie;

/*
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadMovie = () => {
    const formData = new FormData();
    formData.append("original_title", title);
    formData.append("img", image);
    executePost({
      data: formData,
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progress);
        setProgress(progress);
      },
    });
    setProgress(100);
    setIsSuccess(true);
  };

  */
