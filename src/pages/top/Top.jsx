import React, { useState, useEffect } from "react";
import { Widget } from "../../components/widget/Widget";
import { WidgetLabels } from "../../components/widgetLabels/WidgetLabels";
import { Dot } from "../../components/shared/dot/Dot";
import { Dots } from "@dexma/ui-components";
import "./top.css";
import { useSelector } from "react-redux";
export const Top = () => {

  const { incidents, perc_stores_without_incidents, uncommunicated_stores } = useSelector((state) => state.table.data);
  const { total_locations } = useSelector((state) => state.table);
  const [locations, setLocations] = useState(null);
  const [storesComunication, setStoresComunication] = useState(null);
  const [storeIncidents, setStoreIncidents] = useState(null);
  const [storesWithoutIncidents, setStoresWithoutIncidents] = useState(null);

  useEffect(() => {
    setStoresComunication(uncommunicated_stores);
    setStoreIncidents(incidents);
    setStoresWithoutIncidents(perc_stores_without_incidents);
    setLocations(total_locations);
  }, [uncommunicated_stores, incidents, perc_stores_without_incidents, total_locations]);


  const widgetsData = [
    ['Localizaciones', locations],
    ['Tags Seleccionadas', <WidgetLabels />],
    ['Store sin comunicacion', storesComunication],
    ['Incidencias', storeIncidents],
    ['Store con incidencias', storesWithoutIncidents]
  ]

  const widgets = widgetsData.map((widget, index) => {
    return (
      <>
        {widget[0] === 'Store sin comunicacion' || widget[0] === 'Incidencias'

          ? < Widget key={index}>
            <div className="store-with-dot">
              {storeIncidents !== null || undefined ? (
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

          : < Widget >
            <div className="widget-left">
              {storeIncidents !== null || undefined ? (
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
