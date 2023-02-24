import React from "react";

const ButtonCustom = ({
  description,
  src,
  className,
  imgClassname,
  handleClick,
  disabled,
}) => {
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      <img src={src} alt="" className={imgClassname} /> {description}
    </button>
  );
};

export default ButtonCustom;
