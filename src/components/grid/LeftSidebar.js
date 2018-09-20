import React from 'react';
import SidebarMenu from '../menu/SidebarMenu'
import { connect } from 'react-redux'
import { getItemsByCategory } from '../../actions/items'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper/Paper'
import classNames from 'classnames'

const LeftSidebar = (props) => (
  <Paper className={classNames(props.classes.paper, props.classes.fixed)} elevation={0}>
    <SidebarMenu categories={props.categories} onHandleClick={props.onHandleClick}/>
  </Paper>
);

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleClick: categoryId => {
      dispatch(getItemsByCategory(categoryId));
    }
  }
};

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#EFEBE9',
    // maxWidth: 225,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  fixed: {
    // position: "fixed",
    zIndex: "1100"
  },
});

LeftSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LeftSidebar));