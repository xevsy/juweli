import React, { Component } from 'react'
import '../styles/App.css'
import Header from './Header'
import Footer from './Footer'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import componentsStyle from "../styles/jss/material-kit-react/views/components"
import Grid from '@material-ui/core/Grid/Grid'
import LeftSidebar from './LeftSidebar'
import MainContent from './MainContent'
import RightSidebar from './RightSidebar'

class FrontPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={3}>
              <LeftSidebar/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainContent/>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.marginLeft}>
              <RightSidebar/>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(FrontPage);