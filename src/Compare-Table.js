/**
 *
 * Created by devin on 7/22/16.
 */
import React from 'react';
import { FlexTable, FlexColumn, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import _ from 'lodash';
// Table data as a array of objects
const list = [
  { name: 'Brian Vaughn', description: 'Software engineer, adsfasdfasdf asdf asdfasdf asdf asdf asdf asdf ' },
  { name: '1asdf Vaughn', description: ' engineer' },
  { name: '2asdf Vaughn', description: ' engineer' },
  { name: '3asdf Vaughn', description: ' engineer' },
  { name: '4asdf Vaughn', description: ' engineer' },
  { name: '5asdf Vaughn', description: ' engineer' },
  { name: '6asdf Vaughn', description: ' engineer' },
  { name: '7asdf Vaughn', description: ' engineer' },
  { name: '8asdf Vaughn', description: ' engineer' },
  { name: '9asdf Vaughn', description: ' engineer' },
  { name: '11asdf Vaughn', description: ' engineer' },
  { name: '12asdf Vaughn', description: ' engineer' },
  { name: '13asdf Vaughn', description: ' engineer' },
  { name: '14asdf Vaughn', description: ' engineer' },
  { name: '15asdf Vaughn', description: ' engineer' },
  { name: '16asdf Vaughn', description: ' engineer' },
  { name: '17asdf Vaughn', description: ' engineer' },
  { name: '18asdf Vaughn', description: ' engineer' },
  { name: '19asdf Vaughn', description: ' engineer' },
  { name: '111asdf Vaughn', description: ' engineer' },
  { name: '112asdf Vaughn', description: ' engineer' },
  { name: '113asdf Vaughn', description: ' engineer' },
  { name: '114Lorem Vaughn', description: 'Software ' }
];

let listKeys = ["name", "description"];
class CompareTable extends React.Component {
  constructor(props) {
    super(props, context)
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
  return(
    <div style={{width: "100%", minHeight: '40vh'}}>
      <AutoSizer>
        {({height, width}) => (
          <FlexTable
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={
      ({ index }) => list[index]
    }
            onRowClick={(index) => console.log(index)}
          >
            {
              _.map(listKeys,(key, i) => <FlexColumn
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

export default CompareTable