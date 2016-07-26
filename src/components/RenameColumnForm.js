/**
 *
 * Created by devin on 7/25/16.
 */
import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyDate, FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui';
import {observer} from 'mobx-react'
@observer
export default class RenameColumnForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false
    };
    this.errorMessages = {
      wordsError: "Please only use letters",
    }

    this.styles = {
      paperStyle: {
        width: 300,
        margin: 'auto',
        padding: 10,
      },
      switchStyle: {
        marginBottom: 16,
      },
      submitStyle: {
        marginTop: 2,
      }
    }
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }



  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    console.log("-----form data------")
    console.log(data)

  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError } = this.errorMessages;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyText
              name="name"
              validationError={wordsError}
              required
              hintText="Normalized column name?"
              floatingLabelText="Name"
            />
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  };
};

