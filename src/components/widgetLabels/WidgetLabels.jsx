import React, { useEffect, useState } from "react";
import { Tag, Dots } from "@dexma/ui-components";
import { DropDownTags } from "../shared/DropDownTags/DropDownTags";
import "./widgetlabels.css";
import { useSelector } from "react-redux";

export const WidgetLabels = () => {

  const { location_tags } = useSelector((state) => state.table);
  const [toasts, setToast] = useState([]);
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    setToast(location_tags);
  }, [location_tags]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };
  const labels = location_tags?.slice(0, 7).map((toast, i) => (
    <div className="tag">{toast}</div>
    // <Tag key={i} >{toast}</Tag>
  )).concat(<div className="widget-dots" onClick={handleToggle}></div>)
  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.target.classList.contains("tag") ||
        e.target.classList.contains("StyledTag-kOHXTp kgNmpz")
        ? setToggle(!toggle)
        : setToggle(false);
    });
  }, [toggle]);

  return (
    <div className="widget-label-container">
      <div className="widget-top">
        {labels?.length > 0 ? labels : <Dots steps={3} size={6} />}
      </div>
      <div style={{ position: 'absolute', top: '200px', zIndex: '4' }}>
        {toggle ? <DropDownTags tags={labels} /> : null}
      </div>

    </div>
  );
};
