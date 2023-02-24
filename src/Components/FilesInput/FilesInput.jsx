import React, { useRef, useState } from "react";
import GLOBAL from "../../Utils/Global";
import CustomLinearProgress from "../CustomLinearProgress/CustomLinearProgress";

const FilesInput = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    trackProgress(e.dataTransfer);
    if (!validateFile(e.dataTransfer)) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
      setIsSuccess(true);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    e.stopPropagation();

    trackProgress(e.target);
    if (!validateFile(e.target)) return;

    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
      setIsSuccess(true);
    }
  };

  const trackProgress = (target) => {
    const fileReader = new FileReader();

    fileReader.onprogress = function (e) {
      setProgress(Math.round((e.loaded / e.total) * 100));
    };

    fileReader.readAsDataURL(target.files[0]);
  };

  const validateFile = (target) => {
    if (!fileTypes.includes(target.files[0].type)) {
      setUploadError(GLOBAL.ADD_MOVIE.TYPE_ERROR);
      return false;
    }

    if (target.files[0].size > 200000) {
      setUploadError(GLOBAL.ADD_MOVIE.SIZE_ERROR);
      return false;
    }

    return true;
  };

  const handleRetry = () => {
    setProgress(0);
    onUpload(null);
    setIsSuccess(false);
    setUploadError("");
  };

  return (
    <>
      {progress > 0 ? (
        <>
          {uploadError ? (
            <div className="filesinput__load">{uploadError}</div>
          ) : (
            <div className="filesinput__load">
              {progress < 100
                ? `CARGANDO ${progress}%`
                : GLOBAL.ADD_MOVIE.LOADED}
            </div>
          )}
          <CustomLinearProgress progress={progress} typeError={uploadError} />
          {isSuccess ? (
            <div className="filesinput__buttons filesinput__ready">
              {GLOBAL.ADD_MOVIE.READY}
            </div>
          ) : (
            <div
              onClick={handleRetry}
              className="filesinput__buttons filesinput__cancel"
            >
              {uploadError ? GLOBAL.ADD_MOVIE.RETRY : GLOBAL.ADD_MOVIE.CANCEL}
            </div>
          )}
        </>
      ) : (
        <form
          className="filesinput"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
            accept="image/*"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "filesinput__drag-active" : ""}
          >
            <div className="filesinput__text">
              <img src="icons/clip.svg" alt="plus" />
              {GLOBAL.ADD_MOVIE.FILES_INPUT}
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      )}
    </>
  );
};

export default FilesInput;
