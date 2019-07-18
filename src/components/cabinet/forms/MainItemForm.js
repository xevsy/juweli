import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import generateRandomID from 'uuid/v4';
import * as mime from 'mime-types';

import { storage } from '../../../firebase/firebase';
import DownshiftMultiple from '../partial/DownshiftMultiple'
import Switch from '@material-ui/core/Switch/Switch'
import Typography from '@material-ui/core/Typography/Typography'
import T from 'i18n-react'
import Spinner from '../imageUpload/Spinner'
import Images from '../imageUpload/Images'
import Buttons from '../imageUpload/Buttons'

const currencies = [
  {
    value: 'UAH',
    label: '₴ (UAH)',
  },
  {
    value: 'USD',
    label: '$ (USD)',
  },
  {
    value: 'EUR',
    label: '€ (EUR)',
  }
];

class MainItemForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);

    this.state = {
      title: props.item ? props.item.title : '',
      description: props.item ? props.item.description : '',
      identifier: props.item ? props.item.identifier : '',
      category: props.item ? props.item.category : 'dd',
      currency: props.item ? props.item.currency : 'USD',
      amount: props.item ? props.item.amount : 0,
      count: props.item ? props.item.count : '',
      error: '',
      auth: props.auth,
      tags: props.item ? props.item.tags : [],
      published: props.item ? props.item.published : true,
      uploading: false,
      images: props.item && props.item.images ? props.item.images : [],
    }
  }

  handleToggle = () => {
    const { published } = this.state;

    this.setState({ published: !published });
  }

  onImageChange = event => {
    const files = Array.from(event.target.files)
    this.setState({ uploading: true })

    console.log(files)
    files.forEach((file) => {
      let randomFileName = generateRandomID() + '.' +   mime.extension(file.type);
      storage
        .ref("images")
        .child(randomFileName)
        .put(file)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => this.setState({images: [...this.state.images, {public_id: randomFileName, url: url}]}))
          }
        );
    })

    this.setState({uploading: false})
  }

  removeImage = id => {
    storage.ref(`images/${id}`).delete().then(() => {
      //store.dispatch(startRemoveImage(id))
      this.setState({
        images: this.state.images.filter(image => image.public_id !== id)
      })
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    this.props.onHandleChange(
    {
      [name]: event.target.value,
      ...this.state
    });
  };

  handleDeleteButton = event => {
    this.props.onHandleDelete({
        image: this.state.image
      });
  }

  handleTagChange = tags => {
    this.setState({tags: tags})
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.onFormSubmit(
    {
      title: this.state.title,
      description: this.state.description,
      identifier: this.state.identifier,
      category: this.state.category,
      currency: this.state.currency,
      amount: this.state.amount,
      count: this.state.count,
      images: this.state.images,
      author_id: this.state.auth.uid,
      tags: this.state.tags,
      published: this.state.published,
    });
  }

  render() {

    const { uploading, images } = this.state
    const imageArea = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return (
            <span>
              <Images images={images} removeImage={this.removeImage} />
              <Buttons onChange={this.onImageChange} />
            </span>
          )
        default:
          return <Buttons onChange={this.onImageChange} />
      }
    }

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.onFormSubmit}
        onError={errors => console.log(errors)}
      >
        <div>
          <Typography>
            {T.translate("cabinet.itemPublished")}
          </Typography>
          <Switch
            onChange={this.handleToggle}
            checked={this.state.published}
          />
        </div>
        <TextValidator
          id={"title"}
          label={T.translate("cabinet.itemTitle")}
          className={this.props.classes.textFieldFull}
          name={"title"}
          value={this.state.title}
          onChange={this.handleChange('title')}
          validators={['required']}
          errorMessages={[T.translate("cabinet.requiredField")]}
          margin={"normal"}
        />
        <TextField
          id={"description"}
          label={T.translate("cabinet.itemDescription")}
          multiline
          rowsMax={"6"}
          rows={"6"}
          className={this.props.classes.textFieldFull}
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin={"normal"}
        />
        <TextField
          id={"identifier"}
          label={T.translate("cabinet.itemIdentifier")}
          className={this.props.classes.textFieldFull}
          name={"identifier"}
          value={this.state.identifier}
          onChange={this.handleChange('identifier')}
          errortext={this.state.error}
          margin={"normal"}
        />
        <TextValidator
          id="select-category"
          select
          label={T.translate("cabinet.itemCategory")}
          name={"select-category"}
          className={this.props.classes.textFieldFull}
          value={this.state.category}
          onChange={this.handleChange('category')}
          validators={[]}
          errorMessages={[T.translate("cabinet.categorySelect")]}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText={T.translate("cabinet.categorySelect")}
          margin="normal"
        >
          {Boolean(this.props.categories) && this.props.categories.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </TextValidator>
        <div>
          <TextField
            id="select-currency"
            select
            label={T.translate("cabinet.itemCurrency")}
            name={"select-currency"}
            className={this.props.classes.textFieldSmall}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText={T.translate("cabinet.currencySelect")}
            margin="normal"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextValidator
            id={"amount"}
            label={T.translate("cabinet.itemAmount")}
            name={"amount"}
            className={this.props.classes.textFieldMedium}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            type={"number"}
            validators={[]}
            errorMessages={[T.translate("cabinet.graterThen0")]}
            InputLabelProps={{
              shrink: true,
            }}
            margin={"normal"}
          />
        </div>
        <TextField
          id={"count"}
          label={T.translate("cabinet.itemCount")}
          className={this.props.classes.textFieldFull}
          value={this.state.count}
          onChange={this.handleChange('count')}
          errortext={this.state.error}
          InputLabelProps={{
            shrink: true,
          }}
          margin={"normal"}
        />
        <div className={this.props.classes.textFieldFull}>
          <DownshiftMultiple
            selectedValues={this.state.tags}
            inputValues={this.props.tags}
            handleTagChange={this.handleTagChange}
          />
        </div>
        <div className={this.props.classes.imageArea}>
          { imageArea() }
        </div>
        <div>
          <Button
            variant="contained"
            color="default"
            className={this.props.classes.button}
            type={"submit"}
          >
            {T.translate("common.saveButton")}
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
          {this.props.item ?
            <Button
              variant="contained"
              color="secondary"
              className={this.props.classes.button}
              onClick={this.handleDeleteButton}
            >
              {T.translate("common.deleteButton")}
              <DeleteIcon className={this.props.classes.rightIcon} />
            </Button>
            : ''}
        </div>
      </ValidatorForm>
    )
  };
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-around',
  },
  textFieldFull: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
    display: "inline-flex"
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
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    height: "75vh"
  },
  imageArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
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

MainItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainItemForm);
