import React from 'react';
import { connect } from 'react-redux';
import { startAddMainItem } from '../../actions/items'
import MainItemForm from './forms/MainItemForm'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import { store }  from '../../store/configureStore';
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import { getTags } from '../../actions/tags'
import { getCategories } from '../../actions/categories'
import T from 'i18n-react'

class AddItem extends React.Component {
  componentDidMount() {
    store.dispatch(getCategories());
    store.dispatch(getTags())
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <h1>{T.translate("cabinet.addProduct")}</h1>
                <MainItemForm
                  categories={this.props.categories}
                  auth={this.props.auth}
                  tags={this.props.tags}
                  onFormSubmit={this.props.onFormSubmit}
                  onHandleChange={this.props.onHandleChange}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    categories: state.categories.all,
    auth: state.auth,
    tags: state.tags,
    language: state.language,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: item => {
      dispatch(startAddMainItem(item));
      props.history.push('/cabinet');
    },
    onHandleChange: item => {
      //dispatch(startAddMainItem(item));
      //props.history.push('/');
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(AddItem));
