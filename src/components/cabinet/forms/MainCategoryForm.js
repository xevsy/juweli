import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';
import T from 'i18n-react'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'

class MainCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      title: props.currentCategory ? props.currentCategory.title : '',
      description: props.currentCategory ? props.currentCategory.description : '',
      parentId: props.currentCategory && props.currentCategory.parentId ? props.currentCategory.parentId : 0,
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
        title: this.state.title,
        description: this.state.description,
        parentId: this.state.parentId
      });
  }

  render() {
    return (
      <form>
        <TextField
          id={"title"}
          label={T.translate("cabinet.categoryTitle")}
          className={this.props.classes.textFieldFull}
          value={this.state.title}
          onChange={this.handleChange('title')}
          errortext={this.state.error}
          margin={"normal"}
        />
        <TextField
          id={"description"}
          label={T.translate("cabinet.categoryDescription")}
          multiline
          rowsMax={"4"}
          className={this.props.classes.textFieldFull}
          value={this.state.description}
          onChange={this.handleChange('description')}
          errortext={this.state.error}
          margin={"normal"}
        />
        <TextField
          id={"parentId"}
          select
          label={T.translate("cabinet.categoryParent")}
          name={"parentId"}
          className={this.props.classes.textFieldFull}
          value={this.state.parentId}
          onChange={this.handleChange('parentId')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          margin={"dense"}
        >
          <MenuItem key={0} value={0} selected={0 === this.state.parentId}>---</MenuItem>
          {this.props.parentCategories.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              selected={option.id === this.state.parentId}
            >
              {option.title}
            </MenuItem>
          ))}
        </TextField>
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

MainCategoryForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainCategoryForm);
