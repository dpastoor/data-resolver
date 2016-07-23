/**
 *
 * Created by devin on 7/22/16.
 */
import {observable, computed, action, transaction} from 'mobx';
import XptRowModel from '../models/XptRowModel'
export default class TableStore {
  @observable colDetails = [];
  @observable selectedColumnIndex;
  constructor(selectedColumnIndex = -1) {
    this.selectedColumnIndex = selectedColumnIndex;
  }

  @action renameSelectedColumn(newName) {
    if (this.selectedColumnIndex > 0) {
      // TODO: maybe bundle these in a transaction?
      colDetails[selectedColumnIndex].newName = newName;
      // should only be renaming column if matching
      colDetails[selectedColumnIndex].matched = true;
    }
  }
  @action clearAllNames() {
    transaction(() => {
      this.colDetails.forEach(row => {
        row.newName = "";
        row.matched = false;
      })
    })
  }
  @computed get notMatchedCount() {
    return this.colDetails.reduce(
      (sum, row) => sum + (row.matched ? 0 : 1),
      0
    )
  }
  @computed get selectedColumnName() {
    if (this.selectedColumnIndex < 0) {
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