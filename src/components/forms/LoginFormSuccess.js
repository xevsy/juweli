import React from 'react'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '../custom/Button'
import TextField from '@material-ui/core/TextField/TextField'
import T from 'i18n-react'

class LoginFormSuccess extends React.Component {

  startLogout = (e) => {
    e.preventDefault();
    this.props.startLogout();
  }

  render() {
    const {classes} = this.props;

    return (
      <form className={classes.container} onClick={(event) => {this.startLogout(event)}}>
        <TextField
          disabled
          id="filled-disabled-email"
          label={T.translate("auth.loginSuccess")}
          defaultValue={this.props.auth.displayName ? this.props.auth.displayName : this.props.auth.email}
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <Button variant="contained" className={classes.button} type={"submit"}>
          {T.translate("auth.logout")}
        </Button>
      </form>
    )
  }
}

const style = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

LoginFormSuccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(LoginFormSuccess);
