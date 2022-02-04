import React, { useEffect, useState } from "react";
import { DotTable } from "../../components/shared/dotTable/DotTable";
import { Dots } from "@dexma/ui-components";
import { colorScale, sortInfo, headersData, sortHeaders } from "../../utils/";
// import "./bottom.css";
import * as R from "ramda";
import { Dot } from '../../components/shared/dot/Dot'
import "./headersWidths.css";
import { ExcelTable } from "../../utils/exelData";
import { useSelector } from "react-redux";
import { dummyData } from "../../utils/dummyData";
import { superExcelArray } from '../../utils/exelData'
import './bootomGrid.css'
import { bottomTable } from "../../utils/bottomData";
import { Top } from '../top/Top'
console.log(bottomTable(dummyData))
const even = (n) => {
    return n % 2 === 0;
}

export const BottomGrid = () => {
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


    const newTableAllProps = table.map(item => ({ ...item, "a": 1, 'b': 2, 'c': 3, 'd': 4 }))


    console.log(newTableAllProps)
    const tableData = R.map(table => R.values(table), dummyData)
    const headers = headersData.map(header => {
        return <div
            className="headers">
            {header}
        </div>
    })

    const info = tableData.map((item, i) => {
        return item.map((row, a) => {
            return <div
                style={{
                    backgroundColor: `${even(i) ? '#f5f5f5' : 'white'}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTop: '1px solid #dee0e2',
                    height: '40px',
                }}>

                <div className="table-data"
                >
                    {row === true
                        ? <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'red' }}>{a}</div>
                        : row === false
                            ? <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'green' }}>{row}</div>
                            : row
                    }
                </div>
            </div>
        }
        )
    })
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
                <div className='headers'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: ' repeat(15, minmax(2rem, 1fr)) 20px',
                    }}
                >
                    {headers}
                </div>
                <div className="table-container">
                    <div className='grid-container'>
                        {info}
                    </div>
                </div>
                {/* `8rem  repeat(${roomMonthNumber.length -
              2}, minmax(16rem, 1fr)  ) 8rem`, */}

                <div className=" bottom-bottom-grid">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(15, minmax(2rem, 1fr))',
                        }}
                    >
                        {bottomTable(newTableAllProps).map((column, i) => column.map(row =>
                            <div style={{
                                backgroundColor: `${even(i) ? '#f5f5f5' : 'white'}`,
                                // gridColumn: `${i === 0 ? 'span 2' : 'span 1'}`,

                            }}>
                                <div className="table-data">
                                    {row}
                                </div>
                            </div>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
