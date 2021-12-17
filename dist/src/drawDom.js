import { NumRows, NumColumns } from "./constants.js";
export const drawGrid = () => {
    let html = "<table class='grid'><tbody>";
    let rowCount = 0;
    let colCount = 0;
    while (rowCount < NumRows) {
        html += `<tr>`;
        while (colCount < NumColumns) {
            const className = `tile${colCount === 0 || NumRows === rowCount ? " gutter" : ""}`;
            html += `<td class="${className}"><div></div></td>`;
            colCount += 1;
        }
        html += "</tr>";
        rowCount += 1;
        colCount = 0;
    }
    html += "</tbody></table>";
    document.getElementById("grid_container").innerHTML = html;
};
export const drawNumbers = ;
