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

  const labels = toasts?.slice(0, 5).map((toast) => (
    <Tag
      key={toast?.id}
      style={{
        color: "#404145",
        backGroundColor: "#F7F9FA",
        margin: "1px",
      }}
    >
      {toast.label}
    </Tag>
  ));

  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.target.classList.contains("tag") ||
      e.target.classList.contains("StyledTag-kOHXTp kgNmpz")
        ? setToggle(!toggle)
        : setToggle(false);
    });
  }, [toggle]);

  return (
    <div className=".widget-label-container">
      <div className="widget-top">
        {/* {labels?.length > 0 ? labels : <Dots steps={3} size={6} />} */}
        {labels?.length >= 5 && (
          <div className="widget-dots" onClick={handleToggle}>
            <Dots steps={3} size={2} />
            {toggle ? <DropDownTags tags={labels} /> : null}
          </div>
        )}
      </div>
      <div className="widget-top-labels">
        {labels?.length > 0 ? (
          <span>Tags seleccionados</span>
        ) : (
          <span>Tags no seleccionados</span>
        )}
      </div>
    </div>
  );
};
