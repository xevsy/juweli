import React, { Component } from 'react'
import '../../styles/App.css'
import Header from '../grid/Header'
import Footer from '../grid/Footer'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import Grid from '@material-ui/core/Grid/Grid'
import LeftSidebar from '../grid/LeftSidebar'
import RightSidebar from '../grid/RightSidebar'
import MainItem from '../content/MainItem'
import connect from 'react-redux/es/connect/connect'
import { store } from '../../store/configureStore'
import { getPublishedItemsAll } from '../../actions/items'

class ItemPage extends Component {
  componentDidMount() {
    store.dispatch(getPublishedItemsAll());
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <LeftSidebar/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MainItem item={this.props.item}/>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.marginLeft}>
              <RightSidebar/>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

const MapStateToProps = (state, props) => {
  return {
    item: state.products.find((item) => item.id === props.match.params.id),
    categories: state.categories,
    auth: state.auth,
    tags: state.tags,
    language: state.language,
    currency: state.currency,
  }
};

export default connect(MapStateToProps)(withStyles(componentsStyle)(ItemPage));