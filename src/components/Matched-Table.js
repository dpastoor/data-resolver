/**
 *
 * Created by devin on 7/22/16.
 */
import React from 'react';
import { observer, toJS } from 'mobx-react';
import { FlexTable, FlexColumn, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import _ from 'lodash';
// Table data as a array of objects

@observer
class MatchedTable extends React.Component {
  constructor(props) {
    super(props)
    this._renderCells = this._renderCells.bind(this)
  }
  _renderCells({
    cellData,
    cellDataKey,
    columnData,
    rowData,
    rowIndex
  }) {
    let bgColor;
    if (rowIndex % 2) {
      bgColor = "#d3d3d3";
    }
    return (
      <div style={!!bgColor ? {backgroundColor: bgColor} : {}}>
        {cellData}
      </div>
    )
  }

  _getMatchedColumns() {
    let matchedRows = this.props.tableListStore.tables.map((table, i) => {
      return table.colDetails
        .filter(row => row.matched)
        .reduce((howMatched, row) => {
          const {column, newName} = row;
          let simpleRow = {column, newName};
          simpleRow.tableIndex = i+1;
          if (simpleRow.newName != "") {
            howMatched.renamed = howMatched.renamed.concat(simpleRow);
          } else {
            howMatched.matched = howMatched.matched.concat(simpleRow);
          }
          return howMatched;
        }, {renamed: [], matched: []})
    })

    // for now test opposite what will want
    let renamedRows = matchedRows.map(tbl => tbl.renamed.sort((a, b) => {
      if (a.column > b.column) {
        return -1;
      }
      if (a.column < b.column) {
        return 1
      }
      return 0;
    }));
    let renamedTable = [];
    let renamedTableNames = ["newName"];
    renamedRows.forEach((tbl, i) => {
      renamedTableNames.push(`column${i+1}`);
    })
    renamedRows[0].forEach((row, i) => {
      let newRow = {newName: row.newName};
      renamedRows.forEach((tbl, tbli) => {
        newRow[[`column${tbli+1}`]] = tbl[i].column;
      });
      renamedTable.push(newRow);
    })
    // any with matches but no newName must exist in every table
    // any with newname must exist in each table
    console.log("-----matchedRows-------");
    console.log(JSON.stringify(renamedRows));
    console.log(JSON.stringify(renamedTable));
    return {
      table: renamedTable,
      colNames: renamedTableNames
    }
  }
  render() {
    let {tableListStore, listKeys} = this.props;
    let {table, colNames} = this._getMatchedColumns();
  return(
    <div style={{width: "100%", minHeight: '40vh'}}>
      <AutoSizer>
        {({height, width}) => (
          <FlexTable
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            rowCount={table.length}
            rowGetter={
               ({ index }) => table[index]
             }
          >
            {
              _.map(colNames,(key, i) => <FlexColumn
                key={i} // bad practice just suppressing warning for now
                width={width}
                label={key}
                dataKey={key}
                cellRenderer = {this._renderCells}
              />
              )
            }

          </FlexTable>
        )
        }
      </AutoSizer>
    </div>
  )}
}

export default MatchedTable