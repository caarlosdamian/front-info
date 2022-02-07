import React from "react";
import { DropDownItems } from "../DropDownItems/DropDownItems";
import "./DropDownTags.css";

export const DropDownTags = ({ tags }) => {
  const dropDownItems = tags.map((toast, i) => {
    return (
      <DropDownItems key={i}>
        <div>{toast}</div>
      </DropDownItems>
    );
  });

  return <div className="dropdown">{dropDownItems}</div>;
};