import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import MenuList from '@material-ui/core/MenuList/MenuList'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import SendIcon from '@material-ui/icons/Send'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class MainMenu extends React.Component {
  render() {
    return (
      <MenuList>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Dashboard" />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/newCategory">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Add new category" />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/newProduct">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Add new product" />
          </ListItem>
        </MenuItem>
      </MenuList>
    )
  }
}

const styles = theme => ({
  primary: {},
  icon: {},
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
});

const mapStateToProps = (state, props) => {
  return {
  }
};

export default connect(mapStateToProps)(withStyles(styles)(MainMenu));
