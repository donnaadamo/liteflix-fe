import React from "react";
import GLOBAL from "../../Utils/Global";

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo__lite">{GLOBAL.COMMON.LITE}</div>
      <div className="logo__flix">{GLOBAL.COMMON.FLIX}</div>
    </div>
  );
};

export default Logo;
