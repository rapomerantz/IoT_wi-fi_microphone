import React, { Component } from 'react'

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';

export default class DevicesDeleteDialog extends Component {

  render() {
    return (
      <div>
            <Dialog open={this.props.deleteDialog}
                    onClose={this.props.handleClose}
                    aria-labelledby="Delete Device"
                    aria-describedby="This action cannot be undone"
                >
                <DialogTitle id="alert-dialog-title">{"Delete Device?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This action cannot be undone and it will clear all associated SPL data
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary" autoFocus>
                    Nevermind
                  </Button>
                  <Button onClick={this.props.deleteSaga} color="secondary">
                    Delete Device
                  </Button>
                </DialogActions>
            </Dialog>
        
      </div>
    )
  }
}
