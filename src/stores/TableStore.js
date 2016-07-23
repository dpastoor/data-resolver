/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action, autorun} from 'mobx';
import XptRowModel from '../models/XptRowModel'
export default class TableStore {
  @observable colDetails = [];
  @observable selectedColumnIndex;
  constructor(selectedColumn = null) {
    this.selectedColumn = selectedColumn;
  }
  @computed get notMatchedCount() {
    return this.colDetails.reduce(
      (sum, row) => sum + (row.matched ? 0 : 1),
      0
    )
  }
  @computed get selectedColumnName() {
    if (!this.selectedColumnIndex) {
      return ""
    }
    return this.colDetails[this.selectedColumnIndex].column;
  }
  @computed get matchedCount() {
    return this.colDetails.length - this.notMatchedCount;
  }

  static fromJS(array) {
    const tableStore = new TableStore();
    tableStore.colDetails = array.map(row => XptRowModel.fromJS(row));
    return tableStore;
  }
}