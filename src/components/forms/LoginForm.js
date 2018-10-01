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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      showPassword: false,
      errorMessage: '',
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
          label={"Email"}
          name={"email"}
          variant={"outlined"}
          className={classNames(classes.margin, classes.textField)}
          value={this.state.emailInput}
          onChange={this.handleChange('emailInput')}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
          margin={"normal"}
        />
        <TextValidator
          id={"password"}
          name={"password"}
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label={"Пароль"}
          value={this.state.passwordInput}
          onChange={this.handleChange('passwordInput')}
          validators={['required']}
          errorMessages={['this field is required']}
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
          Вход
        </Button>
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
