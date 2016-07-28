import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from 'mobx-react';
import SelectStatementDialogView from './SelectStatementDialogView'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class SelectStatementsForR extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const data = this.props.tableListStore.matchedAndRenamedColumnsPerTable;
    return (
      <div>
        <RaisedButton label="Derived Select Statements" onTouchTap={this.handleOpen} />
        <Dialog
          title="Create Select Statements for R"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div
            style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"}}
          >
            {data.map((table, i) => (<div
               style={{padding: "2vw", display: "inline"}}
            >
              <SelectStatementDialogView table={table} tableName={i+1} key ={i} />
            </div>))}
          </div
          >
        </Dialog>
      </div>
    );
  }
}

