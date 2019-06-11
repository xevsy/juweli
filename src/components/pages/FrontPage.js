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
import { getPublishedItemsAll } from '../../actions/items'
import { store }  from '../../store/configureStore'
import ImageGallery from 'react-image-gallery'
import connect from 'react-redux/es/connect/connect'

class FrontPage extends Component {
  componentDidMount() {
    store.dispatch(getPublishedItemsAll());
  }

  render() {
    const { classes, images } = this.props;
    return (
      <div>
        <Header />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <LeftSidebar/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <ImageGallery items={images} />
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

const MapStateToProps = (state) => {
  let images = [];
  if (state.products.length > 0 ) {
    state.products.slice(0, 4).forEach((item) => {
      if (item.images) {
        item.images.forEach((image) => {
          images.push({original: image.url, thumbnail: image.url});
        })
      }
    });
  }
  return {
    images: images
  }
};

export default connect(MapStateToProps)(withStyles(componentsStyle)(FrontPage));