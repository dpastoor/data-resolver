/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action} from 'mobx';
import TableStore from './TableListStore';
export default class TableListStore {
  @observable tables = [];

  @action addTable(tbl) {
    this.tables.push(tbl)
  }
  static fromJS(...array) {
    const tableListStore = new TableListStore();
    tableListStore.tables = array.map(row => TableStore.fromJS(row));
    return tableListStore;
  }
}