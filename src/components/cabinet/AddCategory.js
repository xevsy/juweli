import React from 'react';
import { connect } from 'react-redux';
import { startAddCategory, getParentCategories } from '../../actions/categories'
import { store }  from '../../store/configureStore'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import MainCategoryForm from './forms/MainCategoryForm'
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import classNames from 'classnames'
import T from 'i18n-react'

class AddCategory extends React.Component {
  componentDidMount() {
    store.dispatch(getParentCategories());
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>
                <MainMenu path={this.props.path}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={this.props.classes.paper}>
                <h1>{T.translate("cabinet.addCategory")}</h1>
                <MainCategoryForm
                  parentCategories={this.props.parentCategories}
                  onFormSubmit={this.props.onFormSubmit}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state, props) => {
  return {
    parentCategories: state.categories.parent,
    language: state.language,
    path: props.match.path
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: category => {
      dispatch(startAddCategory(category));
      props.history.push('/cabinet/categories');
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(AddCategory));
