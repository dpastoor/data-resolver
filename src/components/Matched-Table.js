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

  render() {
    let {table, colNames} = this.props.tableListStore.matchedColumns;
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