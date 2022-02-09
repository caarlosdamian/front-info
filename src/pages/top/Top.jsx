import React from "react";
import { Widget } from "../../components/widget/Widget";
import { WidgetLabels } from "../../components/widgetLabels/WidgetLabels";
import { Dot } from "../../components/shared/dot/Dot";
import { Dots } from "@dexma/ui-components";
import "./top.css";
import { useSelector } from "react-redux";
export const Top = () => {

  const { incidents, perc_stores_without_incidents, uncommunicated_stores } = useSelector((state) => state.table.data);
  const { total_locations, location_tags } = useSelector((state) => state.table);

  const widgetsData = [
    ['Localizaciones', total_locations],
    ['Tags Seleccionadas', <WidgetLabels loc_tags={location_tags} />, 'Tags no seleccionadas'],
    ['Store sin comunicacion', uncommunicated_stores],
    ['Incidencias', incidents],
    ['Store sin incidencias', perc_stores_without_incidents]
  ]
  const widgets = widgetsData.map((widget, index) => {
    return (
      <>
        {widget[0] === 'Store sin comunicacion' || widget[0] === 'Incidencias'

          ? < Widget key={index}>
            <div className="store-with-dot">
              {perc_stores_without_incidents !== null || undefined ? (
                <div className="top-label">
                  <Dot
                    style={{
                      backgroundColor: "#F25A5A",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                    }}
                  />
                  <span className="widget-number">{widget[1]}</span>
                </div>
              ) : (
                <Dots steps={3} size={6} />
              )}
              <span className="widget-label">{widget[0]}</span>
            </div >
          </Widget>


          : widget[0] === 'Tags Seleccionadas' ?
            < Widget >
              {location_tags.length !== 0
                ?
                <div className="widget-left">

                  {perc_stores_without_incidents !== null || undefined ? (
                    <div className="tags">
                      {widget[1]}
                    </div>

                  ) : (
                    <Dots steps={3} size={6} />
                  )}
                  <span className="widget-label-tags">{widget[0]}</span>
                </div>
                :
                <span className="widget-label-tags">{widget[2]}</span>}

            </Widget>

            : widget[0] === 'Store sin incidencias'
              ? < Widget >
                <div className="widget-left">
                  {perc_stores_without_incidents !== null || undefined ? (
                    <span className="widget-number">{`${widget[1]}%`}</span>
                  ) : (
                    <Dots steps={3} size={6} />
                  )}
                  <span className="widget-label">{widget[0]}</span>
                </div>
              </Widget> :

              < Widget >
                <div className="widget-left">
                  {perc_stores_without_incidents !== null || undefined ? (
                    <span className="widget-number">{widget[1]}</span>
                  ) : (
                    <Dots steps={3} size={6} />
                  )}
                  <span className="widget-label">{widget[0]}</span>
                </div>
              </Widget>}
      </>

    )
  })

  return (
    <div className="top-container">
      <div className="top">
        {widgets}
      </div>
    </div >
  )
}
