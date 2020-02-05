import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteMessage } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class DeleteMessage extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteMessage = () => {
    this.props.deleteMessage(this.props.messageId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Message"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this message ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteMessage} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteMessage.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired
};

export default connect(null, { deleteMessage })(
  withStyles(styles)(DeleteMessage)
);
