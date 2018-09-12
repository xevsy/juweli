import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import MenuList from '@material-ui/core/MenuList/MenuList'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import SendIcon from '@material-ui/icons/Send'
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
      <Paper className={this.props.classes.paper} elevation={10}>
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
              <ListItemIcon className={this.props.classes.icon}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={category.title} />
            </MenuItem>
          )})}
        </MenuList>
      </Paper>
    )
  }
}

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#EFEBE9',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

SidebarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarMenu);