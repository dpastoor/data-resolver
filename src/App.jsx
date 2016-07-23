import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS, autorun } from "mobx";
import DevTools from 'mobx-react-devtools';
import {Grid, Cell} from 'radium-grid';
import Radium, {Style, StyleRoot } from 'radium';
import CompareTable from './Compare-Table'
import TableStore from './stores/TableStore'
import TableListStore from './stores/TableListStore'
import ViewStore from './stores/ViewStore';
import {ALL_COLUMNS, UNMATCHED_COLUMNS, MATCHED_COLUMNS} from './constants'
const colors = {
  formidared: "#FF4136",
  shade1: "#CC342B",
  shade2: "#B22D26",
  shade3: "#992720",
  white: "#fff",
  black: "#2b303b"
};

const list1 = [
  {column: "STUDYID", label: "Study ID", levels: "100-103", className: "labelled factor", SASformat: "", distinctValues: 1} ,
  {column: "AGE", label: "Age of Participant in years", levels: "NA", className: "labelled integer", SASformat: "", distinctValues: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", className: "labelled factor", SASformat: "", distinctValues: 3} ,
  {column: "TERMDT", label: "Study Termination date", levels: "NA", className: "labeled Date", SASformat: "YYMMDD10.", distinctValues: 750}
];

const list2 = [
  {column: "STUDYID", label: "Study ID", levels: "100-103", className: "labelled factor", SASformat: "", distinctValues: 1} ,
  {column: "AGE", label: "Age of Participant in years", levels: "NA", className: "labelled integer", SASformat: "", distinctValues: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", className: "labelled factor", SASformat: "", distinctValues: 3} ,
  {column: "TERMDT", label: "Study Termination date", levels: "NA", className: "labeled Date", SASformat: "YYMMDD10.", distinctValues: 750}
];
const listKeys = ["column", "label", "levels"];
const tableStore1 = TableStore.fromJS(list1);
const tableStore2 = TableStore.fromJS(list2);
const viewStore = new ViewStore();
const tableListStore = new TableListStore();
tableListStore.addTables(tableStore1, tableStore2);
autorun(() => {
  console.log("selected column name for ts1: ", tableStore1.selectedColumnName);
  console.log("selected column name for ts2: ", tableStore2.selectedColumnName);
  console.log("View Currently showing", viewStore.colFilter);
});

class App extends Component {
  render() {
    return (
      <StyleRoot className="tables">
        <Style rules={styles.global} />
        <h2>Comparator Tables</h2>
        <Grid cellWidth="1">
          <Cell
            style={[styles.cell, styles.fluidCell, styles.redCell]}
          >
            <Grid
              align="center"
              cellWidth="1/2"
            >
              <Cell style={[styles.cell, styles.nestedCell, styles.blackCell]}>
              </Cell>
              <Cell style={[styles.cell, styles.nestedCell, styles.darkRedCell]}>
                <button

                  onClick={() => {
                    if(viewStore.colFilter === ALL_COLUMNS) {
                      viewStore.colFilter = MATCHED_COLUMNS;
                    } else {
                      console.log("in else block")
                      viewStore.colFilter = ALL_COLUMNS;
                    }
                  }}
                > COLUMN VISIBILITY </button>
                  In Progress Resolution Component
              </Cell>
            </Grid>
          </Cell>
          <Cell style={[styles.cell, styles.fluidCell, styles.redCell]}>
            <Grid
              align="center"
              cellWidth="1/2"
            >
              {
               tableListStore.tables.map((tbl,i) => {
                 return(
                   <Cell key={i} style={[styles.cell, styles.nestedCell, styles.blackCell]}>
                     <CompareTable tableStore={tbl} listKeys={listKeys} viewStore={viewStore} />
                   </Cell>
                 )
               })
              }
            </Grid>
          </Cell>
        </Grid>
      </StyleRoot>
    );
  }
};

const styles = {
  global: {
    body: {
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      lineHeight: 1.5,
      margin: 0
    },
    p: {
      margin: 0
    }
  },
  cell: {
    boxSizing: "border-box",
    marginBottom: "1rem",
    padding: "1rem",
    minWidth: "0px",
    minHeight: "40%"
  },
  fluidCell: {
    height: "auto"
  },
  nestedCell: {
    marginBottom: 0
  },
  redCell: {
    backgroundColor: colors.shade1
  },
  darkRedCell: {
    backgroundColor: colors.shade3
  },
  blackCell: {
    backgroundColor: colors.white
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  cellText: {
    color: colors.white
  }
};


export default Radium(observer(App));
