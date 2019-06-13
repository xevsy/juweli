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
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Select from '@material-ui/core/Select'
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Phone from '@material-ui/icons/Phone'
import Email from '@material-ui/icons/Email'
import axios from 'axios'
import { connect } from 'react-redux'
import { applyOrder } from '../../actions/orders'
import { removeItemsFromBucket } from '../../actions/bucket'
import { addMessage } from '../../actions/message'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'

class ApplyOrderForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fio: '',
      email: '',
      phone: '',
      comments: '',
      delivery: 0,
      deliveryProvider: [
        T.translate("common.deliveryProviderName")
      ],
      deliveryBranch: '',
    }
  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  }

  // handleApplyOrder = (e) => {
  //   e.preventDefault();
  //   console.log(this.state)
  //   console.log(this.props)
  //
  //   const data = {
  //     message: 'Test message'
  //   }
  //
  //   axios.post('/api/send_email', data)
  //     .then( res => {
  //       console.log(res)
  //     })
  //     .catch( () => {
  //       console.log('Message not sent')
  //     })
  // }

  applyOrder = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleApplyOrder = () => {
    this.props.handleApplyOrder(this.state, this.props.bucket)
    this.applyOrder()
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
          <ValidatorForm
            ref="form"
            onSubmit={this.handleApplyOrder}
            onError={errors => console.log(errors)}
          >
            <DialogTitle id="form-dialog-apply-order">{T.translate("common.applyOrderTitle")}</DialogTitle>
            <DialogContent>
                <TextValidator
                  id={"fio"}
                  label={T.translate("common.fio")}
                  name={"fio"}
                  variant={"outlined"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.fio}
                  onChange={this.handleChange('fio')}
                  validators={['required']}
                  errorMessages={[T.translate("cabinet.requiredField")]}
                  margin={"normal"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  id={"email"}
                  label={T.translate("common.email")}
                  name={"email"}
                  variant={"outlined"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin={"normal"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  id={"phone"}
                  label={T.translate("common.phone")}
                  name={"phone"}
                  variant={"outlined"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                  validators={['required']}
                  errorMessages={[T.translate("cabinet.requiredField")]}
                  margin={"normal"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  id="delivery"
                  select
                  label={T.translate("common.delivery")}
                  name={"delivery"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.delivery}
                  onChange={this.handleChange('delivery')}
                  validators={[]}
                  errorMessages={[]}
                  helperText={T.translate("common.delivery")}
                  margin="normal"
                >
                  {Boolean(this.state.deliveryProvider) && this.state.deliveryProvider.map((option, i) => (
                    <MenuItem key={i} value={i}>
                      {option}
                    </MenuItem>
                  ))}
                </TextValidator>
                <TextValidator
                  id={"deliveryBranch"}
                  label={T.translate("common.deliveryBranch")}
                  name={"deliveryBranch"}
                  multiline
                  variant={"outlined"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.deliveryBranch}
                  onChange={this.handleChange('deliveryBranch')}
                  validators={['required']}
                  errorMessages={[T.translate("cabinet.requiredField")]}
                  margin={"normal"}
                />
                <TextValidator
                  id={"comments"}
                  label={T.translate("common.comments")}
                  name={"comments"}
                  multiline
                  variant={"outlined"}
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.comments}
                  onChange={this.handleChange('comments')}
                  margin={"normal"}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="inherit">
                {T.translate("common.cancelButton")}
              </Button>
              <Button type={"submit"} color="primary">
                {T.translate("common.applyOrderButton")}
              </Button>
            </DialogActions>
          </ValidatorForm>
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
  margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    width: "96%",
    display: "inline-flex"
  }
});

ApplyOrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
  bucket: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleApplyOrder: (data, bucket) => {
      if (bucket.length > 0) {
        dispatch(applyOrder(data, bucket));
        dispatch(removeItemsFromBucket(bucket.map((item) => item.id)))
        dispatch(addMessage(T.translate("messages.orderSuccess"), 'success'))
      } else {
        dispatch(addMessage(T.translate("messages.emptyBucket"), 'info'))
      }
    }
  }
}

export default connect(undefined, mapDispatchToProps)(withStyles(style)(ApplyOrderForm));
