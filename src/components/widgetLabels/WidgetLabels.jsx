import React, { useEffect, useState } from "react";
import { Dots } from "@dexma/ui-components";
import { DropDownTags } from "../shared/DropDownTags/DropDownTags";
import "./widgetlabels.css";


export const WidgetLabels = ({ loc_tags }) => {
  console.log(loc_tags)


  const [toggle, setToggle] = useState(false);


  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };


  const labels = loc_tags.length >= 7
    ? loc_tags.slice(0, 7).map(tag =>
      <div className="tag">{tag.label}</div>
    ).concat(
      [<div className="widget-dots" onClick={handleToggle}>
        <Dots steps={3} size={2} />
      </div>])
    : loc_tags.map(tag => (<div className="tag">{tag.label}</div>))






  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.target.classList.contains("tag") ||
        e.target.classList.contains("StyledTag-kOHXTp kgNmpz")
        ? setToggle(!toggle)
        : setToggle(false);
    });
  }, [toggle]);

  return (


    <div className="tags-labels-container">
      <div className="tags-top-grid">
        {labels?.length > 0 ? labels : <Dots steps={3} size={6} />}
      </div>
      <div style={{ position: 'absolute', top: '200px', zIndex: '4' }}>
        {toggle ? <DropDownTags tags={labels.slice(0, -1)} /> : null}
      </div>

    </div>
  );
};
