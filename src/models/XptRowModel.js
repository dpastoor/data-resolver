/**
 *
 * Created by devin on 7/22/16.
 */
import { observable } from 'mobx';
export default class XptRowModel {
  column;
  label;
  levels;
  className;
  SASformat;
  @observable matched;
  @observable newName;

  constructor(column, label, levels, className, distinctValues, matched = false, newName = "") {
    this.column = column;
    this.label = label;
    this.levels = levels;
    this.className = className;
    this.distinctValues = distinctValues;
    this.matched = matched;
    this.newName = newName
  }

  static fromJS(object) {
    let matched = object.matched || false;
    let newName = object.newName || "";
    return new XptRowModel(object.column, object.label, object.levels, object.className, object.distinctValues, matched, newName);
  }
}