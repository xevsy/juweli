import React, { Component } from 'react'
import '../../styles/App.css'
import Header from '../grid/Header'
import Footer from '../grid/Footer'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import Grid from '@material-ui/core/Grid/Grid'
import LeftSidebar from '../grid/LeftSidebar'
import MainContent from '../content/MainContent'
import RightSidebar from '../grid/RightSidebar'
import { getPublishedItemsAll } from '../../actions/items'
import { store }  from '../../store/configureStore'
import { connect } from 'react-redux'

class CategoryPage extends Component {
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
              <LeftSidebar category={this.props.category}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MainContent items={this.props.items} category={this.props.category}/>
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
  let categoryItems = [];
  state.products.find((item) => {
    if (item.category === props.match.params.id) {
      categoryItems.push(item);
    }
  });
  return {
    items: categoryItems !== undefined ? categoryItems : [],
    category: state.categories.all.find((category) => category.id === props.match.params.id)
  }
};

export default connect(MapStateToProps)(withStyles(componentsStyle)(CategoryPage));