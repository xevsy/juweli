import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Button from "../custom/Button.jsx";
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import FeaturedPlayListSharp from '@material-ui/icons/FeaturedPlayListSharp'
import Badge from '@material-ui/core/Badge/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import headerStyle from "../../styles/jss/material-kit-react/components/headerStyle.jsx"
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Hidden from '@material-ui/core/Hidden/Hidden'
import Drawer from '@material-ui/core/Drawer/Drawer'
import T from 'i18n-react'
import { getPublishedItemsAll } from '../../actions/items'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileOpen: false
    };

    this.headerColorChange = this.headerColorChange.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, mobileOpen } = this.state;
    const bucketSize = this.props.bucket !== undefined ? this.props.bucket.length : 0;

    const {
      classes,
      color,
      rightLinks,
      fixed,
      absolute
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed,
      CustomAppBar: 'CustomAppBar',
    });

    return (
      <div className={classes.root}>
        <AppBar className={appBarClasses}>
          <ToolBar className={classes.container}>
            <IconButton color="inherit" aria-label="Menu" onClick={this.handleClick}>
              <MenuIcon/>
            </IconButton>
            <Typography
              component={Link}
              to={"/"}
              varian={"h3"}
              color={"inherit"}
              className={classes.flex}
              onClick={this.props.resetCategories}
            >
              <h3>INDI</h3>
            </Typography>
            <Typography
              component={Link}
              to={"/"}
              varian={"h6"}
              color={"inherit"}
              className={classes.flex}
              onClick={this.props.resetCategories}
            >
              Авторские украшения <br/>из натуральных камней Индии
            </Typography>
            <Hidden smDown>
              <Typography
                component={Link}
                to={"/bucket"}
              >
                <IconButton aria-label="Cart">
                  <Badge badgeContent={bucketSize} color="primary" classes={{ badge: this.props.classes.badge }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Badge className={classes.margin} badgeContent={this.props.products.length} color="secondary">
                  <FeaturedPlayListSharp
                    color={"action"}
                  />
                </Badge>
              </Typography>
              <Typography
                varian={"h6"}
                color={"inherit"}
              >
                <IconButton
                  aria-haspopup={true}
                  color={"inherit"}
                >
                  <Avatar
                    alt={this.props.auth.displayName}
                    src={this.props.auth.photoURL}
                    className={classes.avatar}
                  />
                </IconButton>
                {this.props.auth.displayName ?
                  this.props.auth.displayName : this.props.auth.email}
              </Typography>
              {this.props.auth.uid !== undefined ?
                <Button color={"transparent"} onClick={this.props.startLogout}>{T.translate("auth.logout")}</Button> :
                <Button color={"transparent"} onClick={this.props.startLogin}>{T.translate("auth.login")}</Button>
              }
              <div>
                {rightLinks}
              </div>
              </Hidden>
              <Hidden smUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <Menu />
                </IconButton>
                {this.props.auth.uid !== undefined ?
                  <Button color={"transparent"} onClick={this.props.startLogout}>{T.translate("auth.logout")}</Button> :
                  <Button color={"transparent"} onClick={this.props.startLogin}>{T.translate("auth.login")}</Button>
                }
              </Hidden>
          </ToolBar>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
            >
              <div className={classes.appResponsive}>
                {rightLinks}
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
        <Hidden smDown implementation="css">
          <Menu
            id={"simple-menu"}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem
              component={Link}
              to={"/profile"}
            >
              {T.translate("menu.profile")}
            </MenuItem>
            { this.props.auth.role === 'admin' ?
            <MenuItem
              component={Link}
              to={"/cabinet"}
            >
              {T.translate("menu.cabinet")}
            </MenuItem> : '' }
            <MenuItem onClick={this.handleClose}>{T.translate("menu.account")}</MenuItem>
            { this.props.auth.uid !== undefined ?
              <MenuItem onClick={this.props.startLogout}>{T.translate("menu.logout")}</MenuItem> :
              <MenuItem onClick={this.props.startLogin}>{T.translate("menu.login")}</MenuItem>
            }
          </Menu>
        </Hidden>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    bucket: state.bucket,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCategories: () => {
      dispatch(getPublishedItemsAll());
    }
  }
};

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(headerStyle)(NavBar));
