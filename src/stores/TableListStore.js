/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action, transaction } from 'mobx';
import TableStore from './TableListStore';
export default class TableListStore {
  @observable tables = [];
  @action addTable(tbl) {
    this.tables.push(tbl)
  }
  @action addTables(...tbls) {
    transaction(() => tbls.forEach(t => this.tables.push(t)))
  }
  @computed
  static fromJS(...array) {
    const tableListStore = new TableListStore();
    tableListStore.tables = array.map(row => TableStore.fromJS(row));
    return tableListStore;
  }
}