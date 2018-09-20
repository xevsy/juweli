import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';

class MainTagForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      name: props.item ? props.item.name : '',
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
        name: this.state.name
      });
  }

  render() {
    return (
      <form>
        <TextField
          id={"name"}
          label={"Name"}
          className={this.props.classes.textFieldFull}
          value={this.state.name}
          onChange={this.handleChange('name')}
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
            Save
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

MainTagForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTagForm);
