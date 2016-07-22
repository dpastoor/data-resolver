import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Grid, Cell} from 'radium-grid';
import Radium, {Style, StyleRoot } from 'radium';
const colors = {
  formidared: "#FF4136",
  shade1: "#CC342B",
  shade2: "#B22D26",
  shade3: "#992720",
  white: "#fff",
  black: "#2b303b"
};

class App extends Component {
  onReset = () => {
    this.props.appState.resetTimer();
  }
  render() {
    return (
      <StyleRoot className="tables">
        <Style rules={styles.global} />
        <h2>Comparator Tables</h2>
        <Grid cellWidth="1">
          <Cell style={[styles.cell, styles.fluidCell, styles.redCell]}>
            <Grid cellWidth="1/2" smallCellWidth="1">
              <Cell style={[styles.cell, styles.nestedCell, styles.blackCell]}>
                <p style={styles.cellText}>
                Seconds passed: {this.props.appState.timer}
                </p>
              </Cell>
              <Cell style={[styles.cell, styles.nestedCell, styles.darkRedCell]}>
                <p style={styles.cellText}> Another Cell</p>
                <button
                  onClick={this.onReset}
                >
                 Reset Timer
                </button>
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
    marginBottom: "1rem",
    padding: "1rem",
    minWidth: "0px",
    height: "50%"
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
    backgroundColor: colors.black
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
