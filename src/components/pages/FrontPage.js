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
import { getMainContacts } from '../../actions/contacts'
import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'

class FrontPage extends Component {
  componentDidMount() {
    store.dispatch(getPublishedItemsAll());
    store.dispatch(getMainContacts());
  }

  rawMarkup(content){
    return { __html: content };
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
              <div><br/></div>
              <Card>
                <CardContent>
                  <Typography variant="body1" component="p" width={"100%"} align="center">
                    <span dangerouslySetInnerHTML={this.rawMarkup(this.props.contacts)} />
                  </Typography>
                </CardContent>
              </Card>
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
    images: images,
    contacts: state.contacts,
  }
};

export default connect(MapStateToProps)(withStyles(componentsStyle)(FrontPage));