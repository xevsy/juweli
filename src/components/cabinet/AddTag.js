import React from 'react';
import { connect } from 'react-redux';
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import classNames from 'classnames'
import MainTagForm from './forms/MainTagForm'
import { startAddTag } from '../../actions/tags'

class AddTag extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
                <h1>Add new tag</h1>
                <MainTagForm onFormSubmit={this.props.onFormSubmit}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: category => {
      dispatch(startAddTag(category));
      props.history.push('/cabinet');
    }
  }
}

export default connect(undefined, mapDispatchToProps)(withStyles(componentsStyle)(AddTag));
