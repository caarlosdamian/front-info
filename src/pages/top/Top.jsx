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
    ['', 'tags'],
    ['Store sin comunicacion', storesComunication],
    ['Incidencias', storeIncidents],
    ['Store con incidencias', storesWithoutIncidents]
  ]

  const widgets = widgetsData.map((widget, index) => {
    return (
      <Widget>
        <div className="widget-left">
          {widget !== null || undefined ? (
            <span className="widget-number">{widget[1]}</span>
          ) : (
            <Dots steps={3} size={6} />
          )}
          <span className="widget-label">{widget[0]}</span>
        </div>
      </Widget>
    )
  })


  return (
    <div className="top">
      <div style={{
        display: 'grid',
        gridTemplateColumns: ' repeat(5, minmax(5rem, 1fr))',
        gap: '10px',
      }}>
        {widgets}
      </div>
    </div>
  )
}
  // <div className="top">
  // <Widget>
  //   <div className="widget-left">
  //     {locations !== null || undefined ? (
  //       <span className="widget-number">{locations}</span>
  //     ) : (
  //       <Dots steps={3} size={6} />
  //     )}
  //     <span className="widget-label">Localizaciones</span>
  //   </div>
  // </Widget>
  //   <Widget>
  //     <WidgetLabels />
  //   </Widget>
  //   <Widget>
  //     <div className="store-with-dot">
  //       {storesComunication !== null || undefined ? (
  //         <div className="top-label">
  //           <Dot
  //             style={{
  //               backgroundColor: "#F25A5A",
  //               width: "16px",
  //               height: "16px",
  //               borderRadius: "50%",
  //             }}
  //           />
  //           <span className="widget-number">{storesComunication}</span>
  //         </div>
  //       ) : (
  //         <Dots steps={3} size={6} />
  //       )}
  //       <span className="widget-label">Store sin comunicación</span>
  //     </div >
  //   </Widget >
  //   <Widget>
  //     <div className="store-with-dot">
  //       {storeIncidents !== null || undefined ? (
  //         <div className="top-label">
  //           <Dot
  //             style={{
  //               backgroundColor: "#F25A5A",
  //               width: "16px",
  //               height: "16px",
  //               borderRadius: "50%",
  //             }}
  //           />
  //           <span className="widget-number">{storeIncidents}</span>
  //         </div>
  //       ) : (
  //         <Dots steps={3} size={6} />
  //       )}
  //       <span className="widget-label">Incidencias</span>
  //     </div >
  //   </Widget >
  //   <Widget>
  //     <div className="widget-left">
  //       {storesWithoutIncidents !== null || undefined ? (
  //         <span className="widget-number">{`${storesWithoutIncidents}%`}</span>
  //       ) : (
  //         <Dots steps={3} size={6} />
  //       )
  //       }
  //       <span className="widget-label">Store con incidencias</span>
  //     </div >
  //   </Widget >
  // </div >

