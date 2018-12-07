import React from 'react';
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import T from 'i18n-react'
import { store } from '../../store/configureStore'
import { getNestedCategories } from '../../actions/categories'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.state = {
      selectedIndex: 0,
      nestedMenu: []
    };
  }
  onHandleClick = (categoryId) => {
    this.setState({ selectedIndex: categoryId });
    this.props.onHandleClick(categoryId);
  }
  componentDidMount = () => {
    store.dispatch(getNestedCategories());
  }
  render() {
    return (
      <div>
        <h3>{T.translate("common.categories")}</h3>
        <List>
        {this.props.categories.all.map((category) => {
          if (category.parentId === 0) {
            return (
              <ListItem button dense disableGutters
                        key={category.id}
                        onClick={() => this.onHandleClick(category.id)}
                        selected={this.state.selectedIndex === category.id}
              >
                <ListItemText classes={{primary: this.props.classes.primary}} inset primary={category.title}/>
              </ListItem>
            )
          } else {
            return (
              <ListItem button dense disableGutters
                        key={category.id}
                        onClick={() => this.onHandleClick(category.id)}
                        selected={this.state.selectedIndex === category.id}
              >
                <ListItemText classes={{primary: this.props.classes.primary}} inset primary={category.title}/>
              </ListItem>
            )
          }
         })}
        </List>
      </div>
    )
  }
}

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {
    padding: 0
  },
  icon: {},
});

SidebarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarMenu);