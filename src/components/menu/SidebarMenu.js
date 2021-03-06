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
import { Link } from 'react-router-dom'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleToggleSubcategories = this.onHandleToggleSubcategories.bind(this);
    this.state = {
      open: true,
      nestedMenu: this.props.categories.nested
    };
  }
  onHandleToggleSubcategories = (categoryId) => {
    this.setState((state) => {
      return {open: !state.open[categoryId]}
    });
  }
  render() {
    return (
      <div>
        <h3>{T.translate("common.categories")}</h3>
        <List>
        {Object.keys(this.state.nestedMenu).map((categoryId) => {
          return (
            <div key={categoryId}>
              {!this.state.nestedMenu[categoryId].subcategory &&
                <ListItem button dense disableGutters  selected={this.props.category.id === categoryId}>
                  <Link to={"/category/" + categoryId}>
                    <ListItemText classes={{primary: this.props.classes.primary}} inset primary={this.state.nestedMenu[categoryId].title}/>
                  </Link>
                </ListItem>
              }
              {this.state.nestedMenu[categoryId].subcategory &&
                <div>
                  <ListItem button onClick={this.handleClick} dense disableGutters>
                    <ListItemText inset primary={this.state.nestedMenu[categoryId].title} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {Object.keys(this.state.nestedMenu[categoryId].subcategory).map((subCategoryId) => {
                        return (
                          <ListItem key={subCategoryId} button dense
                                    className={this.props.classes.nested}
                                    selected={this.props.category.id === subCategoryId}
                          >
                            <Link to={"/category/" + subCategoryId}>
                              <ListItemText inset primary={this.state.nestedMenu[categoryId].subcategory[subCategoryId].title} />
                            </Link>
                          </ListItem>
                        )
                      })
                      }
                    </List>
                  </Collapse>
                </div>
              }
            </div>
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
    paddingLeft: theme.spacing.unit * 2,
  },
});

SidebarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarMenu);