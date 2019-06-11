import React from 'react'
import Header from '../grid/Header'
import { connect } from 'react-redux'
import MainItemForm from './forms/MainItemForm'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { startEditMainItem, startRemoveMainItem, getItemsAll } from '../../actions/items'
import { withStyles } from '@material-ui/core/styles'
import MainMenu from './MainMenu'
import { store }  from '../../store/configureStore';
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import classNames from 'classnames'
import { getTags } from '../../actions/tags'
import { getCategories } from '../../actions/categories'
import { addMessage } from '../../actions/message'

class EditItem extends React.Component {

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
                <h1>{this.props.item.title}</h1>
                <MainItemForm
                  item={this.props.item}
                  categories={this.props.categories.all}
                  auth={this.props.auth}
                  tags={this.props.tags}
                  onFormSubmit={this.props.onFormSubmit}
                  onHandleChange={this.props.onHandleChange}
                  onHandleDelete={this.props.onHandleDelete}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    item: state.products.find((item) => item.id === props.match.params.id),
    categories: state.categories,
    auth: state.auth,
    tags: state.tags,
    language: state.language,
    currency: state.currency,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(getItemsAll());
      dispatch(addMessage('Тавар успешно сохранен!', 'success'))
    },
    onHandleChange: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(getItemsAll());
    },
    onHandleDelete: image => {
      dispatch(startRemoveMainItem(props.match.params.id, image));
      props.history.push('/cabinet');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(EditItem));
