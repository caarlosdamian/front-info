import React, { useEffect, useState } from "react";
import { DotTable } from "../../components/shared/dotTable/DotTable";
import { Dots } from "@dexma/ui-components";
import { colorScale, sortInfo, headersData, sortHeaders } from "../../utils/";
import "./bottom.css";
import "./headersWidths.css";
import { ExcelTable } from "../../utils/exelData";
import { useSelector } from "react-redux";

export const Bottom = () => {
  const { table, incidents,
    uncommunicated_stores,
    perc_stores_without_incidents } = useSelector((state) => state.table.data);
  const { total_locations, location_tags } = useSelector((state) => state.table)
  const [newData, setNewData] = useState();


  const [incidentsArray] = useState([
    "Comunicacion",
    "Pasarela_Clima",
    "Alumbrado",
    "Clima",
    "Banderola",
    "Rotulos",
    "Consumo_Clima",
    "Confort",
  ]);
  const [dataSort, setDataSort] = useState(table);

  useEffect(() => {
    table?.length !== 0 && setNewData(sortInfo(incidentsArray, table));
  }, [table, incidentsArray]);

  useEffect(() => {
    table?.length !== 0 && setDataSort(table);
  }, [table]);

  return (
    <div className="bottom">
      <div className="top-bottom">
        <div className="headers-top">
          <span className="span-estado-store">Estados por store</span>
          <span className="span-estado-store"
            onClick={ExcelTable(
              table,
              [location_tags, total_locations, 'tags n s', uncommunicated_stores,
                incidents,
                `${perc_stores_without_incidents}%`]
            )
            }>
            ...
          </span>
        </div>
        <div className="headers-super-container">
          <div className="headers-container0">
            <div style={{ width: "50px" }}></div>
            <div className="headers">
              {headersData.slice(0, 3).map((item) => (
                <span
                  onClick={(e) => setDataSort(sortHeaders(e, dataSort))}
                  className={
                    item === "ID"
                      ? "headers-widths-id"
                      : "headers-widths-ciudad"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="headers-container1">
            <div className="headers">
              {headersData.slice(3, 11).map((item) => (
                <span
                  onClick={(e) => setDataSort(sortHeaders(e, dataSort))}
                  className="headers-widths-dots"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="headers-container2">
            <div className="headers">
              {headersData.slice(11, 15).map((item) => (
                <span
                  onClick={(e) => setDataSort(sortHeaders(e, dataSort))}
                  className="headers-widths-impacto"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {table.length !== 0 ? (
        <div className="table-container">
          <table className="table-container-table">
            {table.map((item) => (
              <tr key={item.ID} className="table-row">
                <td key={item.ID} className="table-space">
                  {" "}
                </td>
                <td key={item.ID} className="table-data-index">
                  {item.ID}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Ciudad}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Tipologia}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Comunicacion?.length !== 0 ? (
                    <DotTable
                      className={item.Comunicacion ? "green" : "red"}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Pasarela_Clima?.length !== 0 ? (
                    <DotTable
                      className={item.Pasarela_Clima ? "green" : "red"}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Alumbrado?.length !== 0 ? (
                    <DotTable className={item.Alumbrado ? "green" : "red"} />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Clima?.length !== 0 ? (
                    <DotTable className={item.Clima ? "green" : "red"} />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Banderola?.length !== 0 ? (
                    <DotTable className={item.Banderola ? "green" : "red"} />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Rotulo?.length !== 0 ? (
                    <DotTable className={item.Rotulo ? "green" : "red"} />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Consumo_Clima?.length !== 0 ? (
                    <DotTable
                      className={item.Consumo_Clima ? "green" : "red"}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Confort?.length !== 0 ? (
                    <DotTable className={item.Confort ? "green" : "red"} />
                  ) : (
                    "-"
                  )}
                </td>
                <td key={item.ID} className="table-space-middle">
                  {" "}
                </td>
                <td className="table-data">
                  {item.Anomalías?.length !== 0 ? item.Anomalías : "-"}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Impacto_Anomalías?.length !== 0
                    ? item.Impacto_Anomalías
                    : "-"}
                </td>
                <td
                  key={item.ID}
                  className="table-data"
                  style={{
                    backgroundColor: colorScale(item.Detected_Score),
                  }}
                >
                  {item.Detected_Score?.length !== 0
                    ? item.Detected_Score
                    : "-"}
                </td>
                <td key={item.ID} className="table-data">
                  {item.Ahorro_Potencial?.length !== 0
                    ? item.Ahorro_Potencial
                    : "-"}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="loading-container">
          <Dots steps="3" size="5" />
        </div>
      )}

      <div className="table-bottom-container">
        <table className="table-bottom-style">
          <tr className="table-bottom-row">
            <td className="table-bottom-space"> </td>
            <td className="table-bottom-data-index">Total Incidencias</td>
            <td className="table-bottom-data">
              {newData?.Comunicacion?.false !== undefined ? (
                newData?.Comunicacion?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Pasarela_Clima?.false !== undefined ? (
                newData?.Pasarela_Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Alumbrado?.false !== undefined ? (
                newData?.Alumbrado?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Clima?.false !== undefined ? (
                newData?.Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Banderola?.false !== undefined ? (
                newData?.Banderola?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Rotulos?.false !== undefined ? (
                newData?.Rotulos?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Consumo_Clima?.false !== undefined ? (
                newData?.Consumo_Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Confort?.false !== undefined ? (
                newData?.Confort?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data-space"> </td>
            <td className="table-bottom-data-space-big"> </td>
          </tr>
          <tr className="table-bottom-row">
            <td className="table-bottom-space"> </td>
            <td className="table-bottom-data-index">Total Stores</td>
            <td className="table-bottom-data">
              {newData?.Comunicacion?.true !== undefined ? (
                newData?.Comunicacion?.true + newData?.Comunicacion?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Pasarela_Clima?.true !== undefined ? (
                newData?.Pasarela_Clima?.true + newData?.Pasarela_Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Alumbrado?.true !== undefined ? (
                newData?.Alumbrado?.true + newData?.Alumbrado?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Clima?.true !== undefined ? (
                newData?.Clima?.true + newData?.Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Banderola?.true !== undefined ? (
                newData?.Banderola?.true + newData?.Banderola?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Rotulos?.true !== undefined ? (
                newData?.Rotulos?.true + newData?.Rotulos?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Consumo_Clima?.true !== undefined ? (
                newData?.Consumo_Clima?.true + newData?.Consumo_Clima?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data">
              {newData?.Confort?.true !== undefined ? (
                newData?.Confort?.true + newData?.Confort?.false
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data-space"> </td>
            <td className="table-bottom-data-space-big"> </td>
          </tr>
          <tr className="table-bottom-row">
            <td className="table-bottom-space"> </td>
            <td className="table-bottom-data-index">% Incidencias</td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Comunicacion?.percent})`,
              }}
            >
              {newData?.Comunicacion?.percent !== undefined ? (
                `${newData?.Comunicacion?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Pasarela_Clima?.percent})`,
              }}
            >
              {newData?.Pasarela_Clima?.percent !== undefined ? (
                `${newData?.Pasarela_Clima?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Alumbrado?.percent})`,
              }}
            >
              {newData?.Alumbrado?.percent !== undefined ? (
                `${newData?.Alumbrado?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Clima?.percent})`,
              }}
            >
              {newData?.Clima?.percent !== undefined ? (
                `${newData?.Clima?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Banderola?.percent})`,
              }}
            >
              {newData?.Banderola?.percent !== undefined ? (
                `${newData?.Banderola?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Rotulos?.percent})`,
              }}
            >
              {newData?.Rotulos?.percent !== undefined ? (
                `${newData?.Rotulos?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Consumo_Clima?.percent})`,
              }}
            >
              {newData?.Consumo_Clima?.percent !== undefined ? (
                `${newData?.Consumo_Clima?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td
              className="table-bottom-data"
              style={{
                backgroundColor: `rgba(255, 99, 71, ${newData?.Confort?.percent})`,
              }}
            >
              {newData?.Confort?.percent !== undefined ? (
                `${newData?.Confort?.percent}%`
              ) : (
                <Dots steps={3} size={3} />
              )}
            </td>
            <td className="table-bottom-data-space"> </td>
            <td className="table-bottom-data-space-big"> </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
