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

  static fromJS(...array) {
    const tableListStore = new TableListStore();
    tableListStore.tables = array.map(row => TableStore.fromJS(row));
    return tableListStore;
  }
}