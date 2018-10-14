import React from 'react';
import MenuList from '@material-ui/core/MenuList/MenuList'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.state = {
      selectedIndex: 0,
    };
  }
  onHandleClick = (categoryId) => {
    this.setState({ selectedIndex: categoryId });
    this.props.onHandleClick(categoryId);
  }
  render() {
    return (
      <div>
        <h3>Разделы</h3>
        <List>
        {this.props.categories.map((category) => {
          return(
            <ListItem button dense disableGutters
                  key={category.id}
                  onClick={() => this.onHandleClick(category.id)} selected={this.state.selectedIndex === category.id}
            >
              <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={category.title} />
            </ListItem>
          )})}
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