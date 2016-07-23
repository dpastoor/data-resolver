/**
 *
 * Created by devin on 7/23/16.
 */
import {observable} from 'mobx';
import { ALL_COLUMNS } from '../constants';

export default class ViewStore {
  @observable colFilter= ALL_COLUMNS;
}
