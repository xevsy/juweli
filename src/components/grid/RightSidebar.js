import React from 'react';
import { connect } from 'react-redux'
import Bucket from '../block/Bucket'
import { removeItemFromBucket } from '../../actions/bucket'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper/Paper'
import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import LoginBlock from '../block/LoginBlock'
import { startLogout, startSmartLogin } from '../../actions/auth'

const RightSidebar = (props) => (
  <Paper className={classNames(props.classes.paper, props.classes.fixed)} elevation={0} >
    <Bucket bucket={props.bucket} onBucketClickRemove={props.onBucketClickRemove}/>
    <LoginBlock
      startLogout={props.startLogout}
      startSmartLogin={props.startSmartLogin}
      auth={props.auth}
    />
  </Paper>
);

const styles = theme => ({
  paper: {
    //...theme.mixins.gutters(),
    backgroundColor: '#EFEBE9',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  fixed: {
    // position: "fixed",
    zIndex: "1100"
  },
});

RightSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
    bucket: state.bucket,
    auth: state.auth,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBucketClickRemove: id => {
      dispatch(removeItemFromBucket(id));
    },
    startSmartLogin: (email, password) => {
      dispatch(startSmartLogin(email, password));
    },
    startLogout: () => dispatch(startLogout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RightSidebar));