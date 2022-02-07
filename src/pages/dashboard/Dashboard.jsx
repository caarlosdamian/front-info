import React, { useEffect, useState } from "react";
import { DotTable } from "../../components/shared/dotTable/DotTable";
import { Dots } from "@dexma/ui-components";
import { colorScale, sortInfo, headersData, sortHeaders } from "../../utils";
import * as R from "ramda";
import { ExcelTable } from "../../utils/exelData";
import { useSelector } from "react-redux";
import { dummyData } from "../../utils/dummyData";
import './dashboard.css'
import { bottomTable } from "../../utils/bottomData";
import { Top } from '../top/Top'


const even = (n) => n % 2 === 0;

export const Dashboard = () => {
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


    const tableDataApi = R.map(table => R.values(table),
        dataSort.map(item => ({ ...item, "a": 'esto', 'b': 'es', 'c': 'de', 'd': 'prueba' })))

    // const tableDataDummy = R.map(table => R.values(table), dummyData)


    const headers = headersData.map(header => {
        return <div
            onClick={(e) => setDataSort(sortHeaders(e, dataSort))}
            className={header === 'Impacto Anomalías' ? 'header-impacto' : 'headers'}>
            <div className="header-in">
                {header}
            </div>

        </div>
    })

    const info = tableDataApi.map((item, i) => {
        return item.map((row, a) => {
            return <div className="table-info"
                style={{ backgroundColor: `${even(i) ? '#f5f5f5' : 'white'}` }}>
                <div className="table-data"
                    style={{
                        backgroundColor: `${a === 13
                            ? colorScale(item[a])
                            : even(i) ? '#f5f5f5' : 'white'}`,
                        textDecoration: `${a === 0 ? 'underline' : 'none'}`
                    }}>

                    {row === true
                        ? <DotTable className='red' />
                        : row === false
                            ? <DotTable className='green' />
                            : row
                    }
                </div>
            </div>
        }
        )
    })
    return (

        <div className="dashboad-container" >
            <div style={{ backgroundColor: '#F1F2F3', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Top />
            </div>
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

                    {/* ///////////CENTRAL-TABLE-GRID/////////////////////////////// */}

                    <div className="headers-magic">
                        <div className="headers-super-scroll">
                            <div className='grid-container-headers'>
                                {headers}
                            </div>
                        </div>

                        <div className="table-container">
                            {table?.length !== 0
                                ? <div className='grid-container'>
                                    {info}
                                </div>
                                : <div className="loading-container">
                                    <Dots steps="3" size="5" />
                                </div>}
                        </div>
                    </div>

                    {/* ///////////BOTTOM GRID/////////////////////////////// */}
                    <div className=" bottom-bottom-grid">
                        {table?.length !== 0
                            ? <div className="bottom-grid-container">

                                {
                                    bottomTable(table).map((column, i) => column.map((row) => {
                                        return <div
                                            className={row === 'Total Incidencias' ||
                                                row === 'Total Stores' ||
                                                row === '% Incidencias' ? 'bottom-bottom-grid-headers' : ''}
                                            style={{ backgroundColor: `${even(i) ? '#f5f5f5' : 'white'}`, }}>

                                            <div className={
                                                row === 'Total Incidencias' ||
                                                    row === 'Total Stores' ||
                                                    row === '% Incidencias' ? 'table-data-bottom-headers' : 'table-data-bottom-headers2'
                                            }>
                                                {row}
                                            </div>
                                        </div>
                                    }))
                                }
                            </div>
                            : <div className="loading-container">
                                <Dots steps="3" size="5" />
                            </div>}
                    </div>
                </div>
            </div>

        </div >
    )
};
