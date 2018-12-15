import React from 'react';
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import Collapse from '@material-ui/core/Collapse'
import T from 'i18n-react'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.state = {
      selectedIndex: 0,
      open: true,
      nestedMenu: this.props.categories.nested
    };
  }
  onHandleClick = (categoryId) => {
    this.setState({ selectedIndex: categoryId });
    this.props.onHandleClick(categoryId);
  }
  render() {
    return (
      <div>
        <h3>{T.translate("common.categories")}</h3>
        <List>
          <ListItem button onClick={this.handleClick} dense disableGutters>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button dense className={this.props.classes.nested}>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        {Object.keys(this.state.nestedMenu).map((categoryId) => {
          return (
            <ListItem button dense disableGutters
                      key={categoryId}
                      onClick={() => this.onHandleClick(categoryId)}
                      selected={this.state.selectedIndex === categoryId}
            >
              <ListItemText classes={{primary: this.props.classes.primary}} inset primary={this.state.nestedMenu[categoryId].title}/>
            </ListItem>
          )
        })}
        </List>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

SidebarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarMenu);