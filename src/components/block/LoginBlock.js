import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import LoginForm from '../forms/LoginForm'
import * as PropTypes from 'prop-types'
import LoginFormSuccess from '../forms/LoginFormSuccess'
import T from 'i18n-react'

class LoginBlock extends React.Component {

  render() {
    const { classes } = this.props;

    let formView;

    if (this.props.auth.uid === undefined) {
      formView = <LoginForm startSmartLogin={this.props.startSmartLogin} auth={this.props.auth} resetPassword={this.props.resetPassword}/>
    } else {
      formView = <LoginFormSuccess startLogout={this.props.startLogout} auth={this.props.auth} />
    }
    return (
      <div className={classes.root}>
        <h3>{T.translate("auth.login")}</h3>
        <div>
          {formView}
        </div>
      </div>
    );
  }
}

const style = theme => ({
  root: {
    width: '100%',
  }
});

LoginBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(LoginBlock);
