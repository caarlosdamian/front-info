import * as R from 'ramda'
import XLSX from 'xlsx';

export const ExcelTable = (data, top) => {

    const topTag = () => top[0].length !== 0
        ? top[0].map((tag, i) => top.map((row, j) =>
            j % 6 === 0
                ? tag
                : i === 0
                    ? top[j]
                    : ''
        ))
        : [top]

    const widgetsArray = ['Location tags', 'Localizaciones', 'Tags no seleccionados',
        'Stores sin comunicacion', 'Incidencias', 'Stores con incidencias']

    const incidentsDataReduce = data?.map(item =>
        R.values(R.pick(
            [
                "Comunicacion",
                "Pasarela_Clima",
                "Alumbrado",
                "Clima",
                "Banderola",
                "Rotulo",
                "Consumo_Clima",
                "Confort"], item))
    )

    const totalIncidencias = incidentsDataReduce?.map(item =>
        item?.map(ite => ite === false ? 1 : ite === true ? 0 : '')
    )
    const totalStores = incidentsDataReduce?.map(item =>
        item?.map(ite => ite === false ? 0 : ite === true ? 1 : '')
    )

    const mapI = R.addIndex(R.map);
    const zipNReduce = R.curry(function (fn, lists) {
        return mapI(function (_, n) {
            return fn(R.pluck(n, lists));
        }, R.head(lists));
    });

    const sumByIndex = zipNReduce(R.sum);
    const totalInci = sumByIndex(totalIncidencias)
    const totalScore = sumByIndex(totalStores)
    const f = (a, b) => (a / (a + b)).toFixed(1)
    const percentage = R.zipWith(f, totalInci, totalScore)

    //para modificar cuando este toda la data
    const finalPercentage = percentage.map(p => p === 'NaN' ? 0 : p)
    const inciArray = ['Total Incidencias', 'Total Stores', '% Incidencias',]
    const excelArray = R.zip(inciArray, [R.flatten(['', '', totalInci]), R.flatten(['', '', totalScore]), R.flatten(['', '', finalPercentage])])
    const superExcelArray = excelArray.map(arr => R.flatten(arr))


    const headersArray = Object.keys(data[0])
    const superDummy = data?.map(data => R.values(data))

    const tabla = [widgetsArray]
        .concat(topTag())
        .concat(['', ''])
        .concat([headersArray])
        .concat(superDummy)
        .concat(['', ''])
        .concat(superExcelArray)

    const downloadExcel = () => {
        const newData = tabla?.map(row => {
            delete row.tableData
            return row
        })

        const workSheet = XLSX.utils.aoa_to_sheet(newData)
        const workBook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workBook, workSheet, "dashboard")
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        XLSX.writeFile(workBook, "dashboard.xlsx")
    }
    return downloadExcel
}