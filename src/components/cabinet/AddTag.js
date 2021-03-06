import React from 'react';
import { connect } from 'react-redux';
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import classNames from 'classnames'
import MainTagForm from './forms/MainTagForm'
import { startAddTag } from '../../actions/tags'
import T from 'i18n-react'

class AddTag extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>
                <MainMenu path={this.props.path}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={this.props.classes.paper}>
                <h1>{T.translate("cabinet.addTag")}</h1>
                <MainTagForm onFormSubmit={this.props.onFormSubmit}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state, props) => {
  return {
    language: state.language,
    tags: state.tags,
    path: props.match.path
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: tag => {
      dispatch(startAddTag(tag)).then(() => {
        props.history.push('/cabinet/tags')
      });
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(AddTag));
