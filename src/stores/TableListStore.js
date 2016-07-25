/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action, transaction } from 'mobx';
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

  static fromJS(...array) {
    const tableListStore = new TableListStore();
    tableListStore.tables = array.map(row => TableStore.fromJS(row));
    return tableListStore;
  }
}