import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import MenuList from '@material-ui/core/MenuList/MenuList'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import { Link } from 'react-router-dom'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  onHandleClick = (categoryId) => {
    this.props.onHandleClick(categoryId);
  }
  render() {
    return (
      <div>
        <h3>Разделы</h3>
        <MenuList>
        {this.props.categories.map((category) => {
          return(
            <MenuItem
              className={this.props.classes.menuItem}
              onClick={() => this.onHandleClick(category.id)}
              key={category.id}
              component={Link} to="/"
            >
              <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={category.title} />
            </MenuItem>
          )})}
        </MenuList>
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