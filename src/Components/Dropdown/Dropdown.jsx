import React from "react";
import GLOBAL from "../../Utils/Global";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { Menu, MenuItem } from "@mui/material";

const Dropdown = ({ selected, setSelected, handleClose, open, anchorEl }) => {
  const handleSelected = (e) => {
    setSelected(e);
    handleClose();
  };

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 0,
          backgroundColor: "#242424;",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
            bgcolor: "#242424",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {Object.values(GLOBAL.DROPDOWN).map((e) => (
        <div
          key={e}
          className="dropdown__item"
          onClick={() => handleSelected(e)}
        >
          <MenuItem>
            <ButtonCustom
              description={e}
              className={"dropdown__item__buttons"}
            />
            {selected === e && <img src="icons/selected.svg" alt="selected" />}
          </MenuItem>
        </div>
      ))}
    </Menu>
  );
};

export default Dropdown;
