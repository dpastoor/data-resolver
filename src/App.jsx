import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS, autorun } from "mobx";
import DevTools from 'mobx-react-devtools';
import {Grid, Cell} from 'radium-grid';
import Radium, {Style, StyleRoot } from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, RaisedButton} from 'material-ui';
import SelectedColumn from './components/SelectedColumn';
import RenameColumnForm from './components/RenameColumnForm';
import MatchedTable from './components/Matched-Table';
import SelectStatementsForR from './components/SelectStatementsForR';
import CompareTable from './Compare-Table'
import TableStore from './stores/TableStore'
import TableListStore from './stores/TableListStore'
import ViewStore from './stores/ViewStore';
import {ALL_COLUMNS, UNMATCHED_COLUMNS, MATCHED_COLUMNS} from './constants'
import {tbl1, tbl2, tbl3 } from './fixtures/fixture1'
const colors = {
  formidared: "#FF4136",
  shade1: "26C6DA",
  shade2: "#E1BEE7",
  shade3: "EEEEEE",
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
  {column: "AGEYRS", label: "Age of Participant in years", levels: "NA", className: "labelled integer", SASformat: "", distinctValues: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", className: "labelled factor", SASformat: "", distinctValues: 3} ,
  {column: "TERMDT2", label: "Study Termination date", levels: "NA", className: "labeled Date", SASformat: "YYMMDD10.", distinctValues: 750}
];
const listKeys = ["column", "label", "levels"];
const tableStore1 = TableStore.fromJS(tbl1);
const tableStore2 = TableStore.fromJS(tbl2);
const viewStore = new ViewStore();
const tableListStore = new TableListStore();
tableListStore.addTables(tableStore1, tableStore2);

autorun(() => {
  console.log("currently dealing with: ",  tableListStore.tables.length, " tables");
  tableListStore.deriveMatches()
});

class App extends Component {
  render() {
    return (
     <MuiThemeProvider>
       <StyleRoot className="tables">
         <Style rules={styles.global} />
         Customizations:
           <RaisedButton
             onClick={() => {
                            return tableListStore.addTable(TableStore.fromJS(list1));
                          }}
           > add table </RaisedButton>
         <RaisedButton
           onClick={() => {
                               if(viewStore.colFilter === ALL_COLUMNS) {
                                  viewStore.colFilter = UNMATCHED_COLUMNS;
                               } else {
                                  viewStore.colFilter = ALL_COLUMNS;
                               }
                          }}
         > Set filter criteria </RaisedButton>
         <SelectStatementsForR tableListStore={tableListStore} />
         <Grid cellWidth="1">
           <Cell
             style={[styles.cell, styles.fluidCell, styles.redCell]}
           >
             <Grid
               align="center"
               cellWidth="1/2"
             >
               <Cell style={[styles.cell, styles.nestedCell, styles.blackCell]}>
                 Number of tables: {tableListStore.tables.length}
                 <MatchedTable tableListStore={tableListStore} listKeys={listKeys} />
               </Cell>
               <Cell style={[styles.cell, styles.nestedCell, styles.darkRedCell]}>
                 <Grid
                   align="center"
                  cellWidth="1/2"
                 >
                  <Cell
                    style={[styles.cell, styles.nestedCell]}
                  >
                    <List>
                      {
                        tableListStore.tables.map((tbl, i) => {
                          if (tbl.selectedColumnDetails.column) {
                           return <div>
                              Table: {i+1} <SelectedColumn columnDetails={tbl.selectedColumnDetails} />
                             </div>
                          }
                        })
                      }
                    </List>
                  </Cell>
                   <Cell
                     style={[styles.cell, styles.nestedCell]}
                   >
                     <Grid
                       cellWidth="1"
                       align="center"
                     >
                      <Cell>
                        {tableListStore.allTablesHaveSelectedColumn ?
                          <div>All Tables Have selection</div> :
                          <div> At least one table missing selection </div>
                        }
                      </Cell>
                       <Cell>
                         <RenameColumnForm tableListStore={tableListStore} />
                       </Cell>
                     </Grid>

                   </Cell>
                 </Grid>
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
                     <Cell key={i} style={[styles.cell, styles.nestedCell]}>
                       <CompareTable tableStore={tbl} listKeys={listKeys} viewStore={viewStore} />
                     </Cell>
                   )
                 })
               }
             </Grid>
           </Cell>
         </Grid>
       </StyleRoot>
     </MuiThemeProvider>
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
