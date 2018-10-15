import React from 'react'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '../custom/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import T from 'i18n-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      showPassword: false,
      errorMessage: '',
      resetEmail: '',
      open: false,
    }
  }
  EmailAndPasswordAuthentication = (e) => {
    e.preventDefault();
    this.props.startSmartLogin(this.state.emailInput, this.state.passwordInput);
    this.setState({errorMessage: this.props.auth ? this.props.auth.errorMessage : ''});
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSetPasswordReset = () => {
    this.props.resetPassword(this.state.resetEmail)
    this.setState({ open: false });
  }

  handleClickOpenPasswordResetDialog = () => {
    this.setState({ open: true });
  };

  handleClosePasswordResetDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={(event) => {this.EmailAndPasswordAuthentication(event)}}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          id={"email"}
          label={T.translate("common.email")}
          name={"email"}
          variant={"outlined"}
          className={classNames(classes.margin, classes.textField)}
          value={this.state.emailInput}
          onChange={this.handleChange('emailInput')}
          validators={['required', 'isEmail']}
          errorMessages={[T.translate("cabinet.requiredField"), T.translate("cabinet.requiredEmail")]}
          margin={"normal"}
        />
        <TextValidator
          id={"password"}
          name={"password"}
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label={T.translate("common.password")}
          value={this.state.passwordInput}
          onChange={this.handleChange('passwordInput')}
          validators={['required']}
          errorMessages={[T.translate("cabinet.requiredField")]}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin={"normal"}
        />
        <Button variant="contained" className={classes.button} type={"submit"}>
          {T.translate("auth.login")}
        </Button>
        <Button onClick={this.handleClickOpenPasswordResetDialog}>{T.translate("auth.passwordReset")}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClosePasswordResetDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{T.translate("auth.passwordReset")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {T.translate("auth.passwordResetText")}
            </DialogContentText>
            <TextValidator
              id={"ResetEmail"}
              label={T.translate("auth.emailPasswordReset")}
              name={"ResetEmail"}
              autoFocus
              margin="dense"
              type="email"
              value={this.state.resetEmail}
              onChange={this.handleChange('resetEmail')}
              fullWidth
              validators={['required', 'isEmail']}
              errorMessages={[T.translate("cabinet.requiredField"), T.translate("cabinet.requiredEmail")]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePasswordResetDialog} color="transparent">
              {T.translate("common.cancelButton")}
            </Button>
            <Button onClick={this.handleSetPasswordReset} color="primary">
              {T.translate("common.sendButton")}
            </Button>
          </DialogActions>
        </Dialog>
      </ValidatorForm>
    )
  }
}

const style = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  snackbar: {
    minWidth: 0,
  },
  textField: {
    flexBasis: 180,
  },
  button: {
    margin: theme.spacing.unit,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(LoginForm);
