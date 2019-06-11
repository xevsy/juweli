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
import T from 'i18n-react'

class MainMenu extends React.Component {
  render() {
    return (
      <MenuList>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.dashboard")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/categories">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.categoriesList")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/newCategory">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.addCategory")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/newTag">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.addTag")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/tags">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.tagsList")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/newProduct">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.addProduct")} />
          </ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} component={Link} to="/cabinet/currency">
          <ListItem>
            <ListItemIcon className={this.props.classes.icon}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.primary }} inset primary={T.translate("cabinet.currencyTitle")} />
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
    language: state.language,
  }
};

export default connect(mapStateToProps)(withStyles(styles)(MainMenu));
