import React from 'react';
import { connect } from 'react-redux';
import { getParentCategories, startEditCategory } from '../../actions/categories'
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
import { addMessage } from '../../actions/message'

class EditCategory extends React.Component {
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
            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
                <h1>{T.translate("cabinet.addCategory")}</h1>
                <MainCategoryForm
                  currentCategory={this.props.category}
                  parentCategories={this.props.parentCategories}
                  onFormSubmit={this.props.onFormSubmit}
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

const MapStateToProps = (state, props) => {
  return {
    category: state.categories.all.find((category) => category.id === props.match.params.id),
    parentCategories: state.categories.parent,
    language: state.language,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: category => {
      dispatch(startEditCategory(props.match.params.id, category));
      dispatch(addMessage('Категория успешно сохранена!', 'success'))
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(EditCategory));
