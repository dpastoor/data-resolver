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
      this.colDetails[this.selectedColumnIndex].newName = newName;
      // should only be renaming column if matching
      this.colDetails[this.selectedColumnIndex].matched = true;
    }
  }
  @action clearAllNewNames() {
      this.colDetails.forEach(row => {
        if (row.newName != "") {
          row.newName = "";
          row.matched = false;
        }
    });
  }
  @action setSelectedColumnByName(colName) {
    let index = _.findIndex(this.colDetails, {column: colName});
    this.selectedColumnIndex = index;
  }
  @computed get notMatchedCount() {
    return this.colDetails.reduce(
      (sum, row) => sum + (row.matched ? 0 : 1),
      0
    )
  }
  @computed get selectedColumnDetails() {
    if (this.selectedColumnIndex < 0) {
      return {};
    }
    return this.colDetails[this.selectedColumnIndex];
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