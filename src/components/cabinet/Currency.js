import React from 'react';
import { connect } from 'react-redux';
import { store }  from '../../store/configureStore'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from "../../styles/jss/material-kit-react/views/components"
import classNames from 'classnames'
import T from 'i18n-react'
import CurrencyForm from './forms/CurrencyForm'
import { addMessage } from '../../actions/message'
import { getCurrency, startUpdateCurrencyRate } from '../../actions/currency'

class Currency extends React.Component {
  componentDidMount() {
    store.dispatch(getCurrency());
  }

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
                <h1>{T.translate("cabinet.currencyTitle")}</h1>
                <CurrencyForm
                  currency={this.props.currency}
                  onFormSubmit={this.props.onFormSubmit}
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
    currency: state.currency,
    path: props.match.path
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (usd, eur) => {
      dispatch(startUpdateCurrencyRate(usd, eur));
      dispatch(addMessage(T.translate("messages.currencyChange"), 'success'))
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(Currency));
