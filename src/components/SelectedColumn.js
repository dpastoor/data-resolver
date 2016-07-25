/**
 *
 * Created by devin on 7/23/16.
 */
import React from 'react';
import { toJS } from 'mobx'
import {Card,CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const SelectedColumn = ({columnDetails}) => (
  <Card>
    {console.log("column details")}
    {console.log(toJS(columnDetails))}
    {console.log(columnDetails.column)}
    <CardHeader
      title={columnDetails.column}
      subtitle={columnDetails.label}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
        <p>
            Levels: {columnDetails.levels}
            <br/>
            Distinct Values: {columnDetails.distinctValues}
        </p>
    </CardText>
  </Card>
);

export default SelectedColumn;
