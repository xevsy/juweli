import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import * as PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import T from 'i18n-react'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Favorite from "@material-ui/icons/Favorite"
import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'

class ApplyOrderForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleChange = (value) => {

  }

  handleCloseDialog = () => {
    this.setState({ open: false });
  }

  handleApplyOrder = () => {

  }

  applyOrder = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" aria-label={T.translate("common.applyOrder")} color="secondary"
                onClick={this.applyOrder}>
          <Favorite className={classes.icons}/> {T.translate("common.applyOrder")}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-apply-order">{T.translate("common.applyOrderTitle")}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="inherit">
              {T.translate("common.cancelButton")}
            </Button>
            <Button onClick={this.handleApplyOrder} color="primary">
              {T.translate("common.applyOrderButton")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const style = theme => ({
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
});

ApplyOrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
  bucket: PropTypes.array.isRequired,
};

export default withStyles(style)(ApplyOrderForm);
