import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';
import T from 'i18n-react'

class CurrencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      usd: this.props.currency.usd ? this.props.currency.usd : 0,
      eur: this.props.currency.eur ? this.props.currency.eur : 0,
      error: '',
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onFormSubmit(e) {
    e.preventDefault();

    this.props.onFormSubmit(
      {
        usd: this.state.usd,
        eur: this.state.eur
      });
  }

  render() {
    return (
      <form>
        <TextField
          id={"currency-usd"}
          label={T.translate("cabinet.currencyUSD")}
          className={this.props.classes.textFieldFull}
          value={this.state.usd}
          onChange={this.handleChange('usd')}
          errortext={this.state.error}
          margin={"normal"}
        />
        <TextField
          id={"currency-eur"}
          label={T.translate("cabinet.currencyEUR")}
          className={this.props.classes.textFieldFull}
          value={this.state.eur}
          onChange={this.handleChange('eur')}
          errortext={this.state.error}
          margin={"normal"}
        />
        <div>
          <Button
            variant="contained"
            color="default"
            className={this.props.classes.button}
            onClick={this.onFormSubmit}
          >
            {T.translate("common.saveButton")}
            <Icon className={this.props.classes.rightIcon}>save</Icon>
          </Button>
        </div>
      </form>
    )
  };
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldFull: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  textFieldMedium: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '60%',
  },
  textFieldSmall: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '18%',
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  addFileBtn: {
    'marginTop': '15px',
  },
  media: {
    objectFit: 'cover',
  },
  card: {
    maxWidth: 345,
  },
});

CurrencyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencyForm);
