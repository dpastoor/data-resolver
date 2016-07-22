import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Grid, Cell} from 'radium-grid';
import Radium, {Style, StyleRoot } from 'radium';
import CompareTable from './Compare-Table'
const colors = {
  formidared: "#FF4136",
  shade1: "#CC342B",
  shade2: "#B22D26",
  shade3: "#992720",
  white: "#fff",
  black: "#2b303b"
};

const list1 = [
  {column: "STUDYID", label: "Study ID", levels: "100-103", class: "labelled factor", SASformat: "", distinct_values: 1} ,
  {column: "AGE", label: "Age of Participant in years", levels: "NA", class: "labelled integer", SASformat: "", distinct_values: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", class: "labelled factor", SASformat: "", distinct_values: 3} ,
  {column: "TERMDT", label: "Study Termination date", levels: "NA", class: "labeled Date", SASformat: "YYMMDD10.", distinct_values: 750}
];

const list2 = [
  {column: "STUDYID", label: "Study ID", levels: "100-103", class: "labelled factor", SASformat: "", distinct_values: 1} ,
  {column: "AGE", label: "Age of Participant in years", levels: "NA", class: "labelled integer", SASformat: "", distinct_values: 73} ,
  {column: "TRTGRP", label: "treatment group ", levels: "Placebo, DRUGX100, DRUGX200", class: "labelled factor", SASformat: "", distinct_values: 3} ,
  {column: "TERMDT", label: "Study Termination date", levels: "NA", class: "labeled Date", SASformat: "YYMMDD10.", distinct_values: 750}
];
const listKeys = ["column", "label", "levels"];

class App extends Component {
  render() {
    console.log("rendering entire app")
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
                <CompareTable list={list1} listKeys={listKeys} />
              </Cell>
              <Cell style={[styles.cell, styles.nestedCell, styles.darkRedCell]}>
                  In Progress Resolution Component
              </Cell>
            </Grid>
          </Cell>
          <Cell style={[styles.cell, styles.fluidCell, styles.redCell]}>
            <Grid
              align="center"
              cellWidth="1/2"
            >
              <Cell style={[styles.cell, styles.nestedCell, styles.blackCell]}>
                <CompareTable list={list2} listKeys={listKeys} />
              </Cell>
              <Cell style={[styles.cell, styles.nestedCell, styles.darkRedCell]}>
                <p style={styles.cellText}> Another Cell</p>
              </Cell>
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
