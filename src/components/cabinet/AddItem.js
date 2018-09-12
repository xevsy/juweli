import React from 'react';
import { connect } from 'react-redux';
import { startAddMainItem } from '../../actions/items'
import MainItemForm from './forms/MainItemForm'
import Header from '../Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import { store } from '../../index'
import { startSetCategories } from '../../actions/categories'
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'

class AddItem extends React.Component {
  componentDidMount() {
    store.dispatch(startSetCategories());
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h1>Add new item</h1>
                <MainItemForm
                  categories={this.props.categories}
                  auth={this.props.auth}
                  onFormSubmit={this.props.onFormSubmit}
                  onHandleChange={this.props.onHandleChange}
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

const MapStateToProps = (state) => {
  return {
    categories: state.categories,
    auth: state.auth,
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
