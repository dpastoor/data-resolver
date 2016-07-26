/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action, transaction, toJS } from 'mobx';
import TableStore from './TableListStore';
import _ from 'lodash';
export default class TableListStore {
  @observable tables = [];
  @action addTable(tbl) {
    this.tables.push(tbl)
  }
  @action addTables(...tbls) {
    transaction(() => tbls.forEach(t => this.tables.push(t)))
  }
  @action renameSelectedColumns(newName) {
      this.tables.forEach(tbl => {
        tbl.renameSeletedColumns(newName)
    })
  }

  @computed get allTablesHaveSelectedColumn() {
    return _.every(this.tables, (tbl) => tbl.selectedColumnIndex > -1)
  }
  @action deriveMatches() {
    console.log("------------deriving matches-------EXPENSIVE--------- ");
    let unique_names = _.uniq(_.flatten(_.map(this.tables, tbl => tbl.colDetails.map(r => r.column))));
    let containedInAll = [];
    unique_names.forEach(name => {
      let inTable = this.tables.reduce((contains, table) => {
        if (contains) {
          // TODO: not sure if need to turn to JS or not
          let cols = toJS(table.colDetails);
          return cols.filter(r => r.column == name).length == 1;
        }
        return false
      }, true);
      if (inTable) {
        containedInAll.push(name)
      }
    });
    containedInAll.forEach((match) => {
        this.tables.forEach(table => {
            table.colDetails.forEach(row => {
              if (row.column == match) {
                row.matched = true;
              }
        })
      });
    });
  }
  @action renameAllSelected(newName) {
    this.tables.forEach(tbl => tbl.renameSelectedColumn(newName))
  }
  
  @computed get matchedColumns() {
    let matchedRows = this.tables.map((table, i) => {
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
    });

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
  static fromJS(...array) {
    const tableListStore = new TableListStore();
    tableListStore.tables = array.map(row => TableStore.fromJS(row));
    return tableListStore;
  }
}