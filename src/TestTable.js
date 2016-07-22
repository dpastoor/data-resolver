/**
 *
 * Created by devin on 7/22/16.
 */
/**
 * @flow
 */
import React, { Component } from 'react'
import {AutoSizer, ColumnSizer, Grid} from 'react-virtualized'
import shallowCompare from 'react-addons-shallow-compare'

export default class ColumnSizerExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      columnMaxWidth: 100,
      columnMinWidth: 75,
      columnCount: 10
    }

    this._noColumnMaxWidthChange = this._noColumnMaxWidthChange.bind(this)
    this._noColumnMinWidthChange = this._noColumnMinWidthChange.bind(this)
    this._onColumnCountChange = this._onColumnCountChange.bind(this)
    this._noContentRenderer = this._noContentRenderer.bind(this)
    this._cellRenderer = this._cellRenderer.bind(this)
  }

  render () {
    const {
      columnMaxWidth,
      columnMinWidth,
      columnCount
    } = this.state

    return (
        <div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <ColumnSizer
                columnMaxWidth={columnMaxWidth}
                columnMinWidth={columnMinWidth}
                columnCount={columnCount}
                key='GridColumnSizer'
                width={width}
              >
                {({ adjustedWidth, getColumnWidth, registerChild }) => (
                  <div
                    className={styles.GridContainer}
                    style={{
                      height: 50,
                      width: adjustedWidth
                    }}
                  >
                    <Grid
                      ref={registerChild}
                      columnWidth={getColumnWidth}
                      columnCount={columnCount}
                      height={50}
                      noContentRenderer={this._noContentRenderer}
                      cellRenderer={this._cellRenderer}
                      rowHeight={50}
                      rowCount={1}
                      width={adjustedWidth}
                    />
                  </div>
                )}
              </ColumnSizer>
            )}
          </AutoSizer>
        </div>
      </ContentBox>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _noColumnMaxWidthChange (event) {
    let columnMaxWidth = parseInt(event.target.value, 10)

    if (isNaN(columnMaxWidth)) {
      columnMaxWidth = undefined
    } else {
      columnMaxWidth = Math.min(1000, columnMaxWidth)
    }

    this.setState({ columnMaxWidth })
  }

  _noColumnMinWidthChange (event) {
    let columnMinWidth = parseInt(event.target.value, 10)

    if (isNaN(columnMinWidth)) {
      columnMinWidth = undefined
    } else {
      columnMinWidth = Math.max(1, columnMinWidth)
    }

    this.setState({ columnMinWidth })
  }

  _onColumnCountChange (event) {
    this.setState({ columnCount: parseInt(event.target.value, 10) || 0 })
  }

  _noContentRenderer () {
    return (
      <div className={styles.noCells}>
        No cells
      </div>
    )
  }

  _cellRenderer ({ columnIndex, rowIndex }) {
    const className = columnIndex === 0
      ? styles.firstCell
      : styles.cell

    return (
      <div className={className}>
        {`R:${rowIndex}, C:${columnIndex}`}
      </div>
    )
  }
}
