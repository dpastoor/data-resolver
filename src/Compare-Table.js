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
  {column: "STUDYID", label: "Study ID", levels: "100-103", class: "labelled factor", SASformat: "", distinct_values: 1} ,
  {column: "AGE", label: "Age of Participant in years", levels: "NA", class: "labelled integer", SASformat: "", distinct_values: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", class: "labelled factor", SASformat: "", distinct_values: 3} ,
  {column: "TERMDT", label: "Study Termination date", levels: "NA", class: "labeled Date", SASformat: "YYMMDD10.", distinct_values: 750}
];

let listKeys = ["column", "label", "levels"];
class CompareTable extends React.Component {
  constructor(props) {
    super(props)
    this._renderCells = this._renderCells.bind(this)
    this.state = {selectedIndex: -1}
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
    if (rowIndex == this.state.selectedIndex) {
      bgColor = "red"
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
            onRowClick={({index}) => {
            console.log(index)
            console.log(list[index])
            this.setState({
            selectedIndex: index
            })
            }}
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