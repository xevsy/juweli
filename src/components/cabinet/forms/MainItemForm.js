import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import FileUploader from "react-firebase-file-uploader";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { storage } from '../../../firebase/firebase';
import DownshiftMultiple from '../partial/DownshiftMultiple'
import Switch from '@material-ui/core/Switch/Switch'
import Typography from '@material-ui/core/Typography/Typography'

// const imageThumbnail = require('image-thumbnail');

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
    this.handleClearButton = this.handleClearButton.bind(this);

    this.state = {
      title: props.item ? props.item.title : '',
      description: props.item ? props.item.description : '',
      category: props.item ? props.item.category : 'dd',
      currency: props.item ? props.item.currency : 'UAH',
      amount: props.item ? props.item.amount : 0,
      count: props.item ? props.item.count : 0,
      image: props.item ? props.item.image : '',
      isUploading: false,
      progress: 0,
      imageUrl: "",
      files: [],
      error: '',
      auth: props.auth,
      tags: props.item ? props.item.tags : [],
      published: props.item ? props.item.published : true,
    }

    if (props.item) {
      storage
        .ref("images")
        .child(props.item.image)
        .getDownloadURL().then((url) => this.setState({'imageUrl': url}));
    }
  }

  handleToggle = () => {
    const { published } = this.state;

    this.setState({ published: !published });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageUrl: url }));
  };

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

  handleClearButton = event => {
    this.setState({
      title: '',
      description: '',
      category: '',
      currency: 'UAH',
      amount: 0,
      count: 0,
      image: '',
      tags: [],
      published: true,
    });
  }

  handleDeleteButton = event => {
    this.props.onHandleDelete({});
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
      category: this.state.category,
      currency: this.state.currency,
      amount: this.state.amount,
      count: this.state.count,
      image: this.state.image,
      author_id: this.state.auth.uid,
      tags: this.state.tags,
    });
  }

  render() {
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.onFormSubmit}
        onError={errors => console.log(errors)}
      >
        <div>
          <Typography>
            Published
          </Typography>
          <Switch
            onChange={this.handleToggle}
            checked={this.state.published}
          />
        </div>
        <TextValidator
          id={"title"}
          label={"Title"}
          className={this.props.classes.textFieldFull}
          name={"title"}
          value={this.state.title}
          onChange={this.handleChange('title')}
          validators={['required']}
          errorMessages={['this field is required']}
          margin={"normal"}
        />
        <TextField
          id={"description"}
          label={"Description"}
          multiline
          rowsMax={"4"}
          className={this.props.classes.textFieldFull}
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin={"normal"}
        />
        <TextValidator
          id="select-category"
          select
          label="Select category"
          name={"select-category"}
          className={this.props.classes.textFieldFull}
          value={this.state.category}
          onChange={this.handleChange('category')}
          validators={[]}
          errorMessages={['please select category']}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Please select your category"
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
            label="Select"
            name={"select-currency"}
            className={this.props.classes.textFieldSmall}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText="Please select your currency"
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
            label={"Amount"}
            name={"amount"}
            className={this.props.classes.textFieldMedium}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            type={"number"}
            validators={[]}
            errorMessages={['this field should be grater then 0']}
            InputLabelProps={{
              shrink: true,
            }}
            margin={"normal"}
          />
        </div>
        <TextField
          id={"count"}
          label={"Count"}
          className={this.props.classes.textFieldFull}
          value={this.state.count}
          onChange={this.handleChange('count')}
          errortext={this.state.error}
          type={"number"}
          InputLabelProps={{
            shrink: true,
          }}
          margin={"normal"}
        />
        <DownshiftMultiple
          selectedValues={this.state.tags}
          inputValues={this.props.tags}
          handleTagChange={this.handleTagChange}
        />
        <div>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.image ?
            <Card className={this.props.classes.card}>
              <CardMedia
                component="img"
                className={this.props.classes.media}
                height="140"
                width="140"
                src={this.state.imageUrl}
                image={this.state.imageUrl}
                title="Contemplative Reptile"
              />
            </Card> : ''
          }
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={storage.ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="default"
            className={this.props.classes.button}
            type={"submit"}
          >
            Save
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            onClick={this.handleClearButton}
          >
            Clear
            <Icon className={this.props.classes.rightIcon}>clear</Icon>
          </Button>
          {this.props.item ?
            <Button
              variant="contained"
              color="secondary"
              className={this.props.classes.button}
              onClick={this.handleDeleteButton}
            >
              Delete
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

MainItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainItemForm);
