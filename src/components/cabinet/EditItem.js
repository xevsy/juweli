import React from 'react'
import Header from '../grid/Header'
import { connect } from 'react-redux'
import MainItemForm from './forms/MainItemForm'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { startEditMainItem, startRemoveMainItem, getItemsAll } from '../../actions/items'
import { withStyles } from '@material-ui/core/styles'
import { storage } from '../../firebase/firebase'
import MainMenu from './MainMenu'
import { store }  from '../../store/configureStore';
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import classNames from 'classnames'
import { getTags } from '../../actions/tags'
import { getCategories } from '../../actions/categories'
import ItemTeaser from '../block/ItemTeaser'

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
    }

    if (props.item) {
      storage
        .ref("images")
        .child(props.item.image)
        .getDownloadURL().then((url) => this.setState({'imageUrl': url}));
    }
  }

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
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h1>{this.props.item.title}</h1>
                <MainItemForm
                  item={this.props.item}
                  categories={this.props.categories}
                  auth={this.props.auth}
                  tags={this.props.tags}
                  onFormSubmit={this.props.onFormSubmit}
                  onHandleChange={this.props.onHandleChange}
                  onHandleDelete={this.props.onHandleDelete}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <h2>Preview</h2>
                <ItemTeaser
                  item={this.props.item}
                  onBucketClick={() => console.log('test')}
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
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(getItemsAll());
    },
    onHandleChange: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(getItemsAll());
    },
    onHandleDelete: () => {
      dispatch(startRemoveMainItem(props.match.params.id));
      props.history.push('/cabinet');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(EditItem));
