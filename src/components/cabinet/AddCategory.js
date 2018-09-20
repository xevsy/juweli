import React from 'react';
import { connect } from 'react-redux';
import { startAddCategory } from '../../actions/categories'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import MainCategoryForm from './forms/MainCategoryForm'
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import classNames from 'classnames'

class AddCategory extends React.Component {
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
                <h1>Add new category</h1>
                <MainCategoryForm onFormSubmit={this.props.onFormSubmit}
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
      dispatch(startAddCategory(category));
      props.history.push('/cabinet');
    }
  }
}

export default connect(undefined, mapDispatchToProps)(withStyles(componentsStyle)(AddCategory));
