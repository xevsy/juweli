import { withStyles } from '@material-ui/core'
import React from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import keycode from 'keycode';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip/Chip'
import TextField from '@material-ui/core/TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import T from 'i18n-react'

class DownshiftMultiple extends React.Component {

  state = {
    inputValue: '',
    selectedItem: this.props.selectedValues ? this.props.selectedValues : [],
  };

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

   renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
     const isHighlighted = highlightedIndex === index;
     const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

     return (
       <MenuItem
         {...itemProps}
         key={suggestion.name}
         selected={isHighlighted}
         component="div"
         style={{
           fontWeight: isSelected ? 500 : 400,
         }}
       >
        {suggestion.name}
      </MenuItem>
    );
  }

   getSuggestions(value) {
     const inputLength = value.length;
     let count = 0;
     return inputLength === 0
       ? []
       : this.props.inputValues.filter(suggestion => {
         const keep =
           count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === value;

         if (keep) {
           count += 1;
         }

         return keep;
      });
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    });

    this.props.handleTagChange(selectedItem);
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      this.props.handleTagChange(selectedItem);
      return { selectedItem };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => (
          <div className={classes.container}>
            {this.renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: T.translate("cabinet.itemTagsSelect"),
              }),
              label: T.translate("cabinet.itemTags"),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue2).map((suggestion, index) =>
                  this.renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.name }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
  inputValues: PropTypes.array.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(DownshiftMultiple);

