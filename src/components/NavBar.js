import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import FeaturedPlayListSharp from '@material-ui/icons/FeaturedPlayListSharp'
import Badge from '@material-ui/core/Badge/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import headerStyle from "../styles/jss/material-kit-react/components/headerStyle.jsx"
import classNames from 'classnames'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.headerColorChange = this.headerColorChange.bind(this);
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
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
    const { anchorEl } = this.state;
    const bucketSize = this.props.bucket !== undefined ? this.props.bucket.length : 0;

    const {
      classes,
      color,
      fixed,
      absolute
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
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
              varian={"title"}
              color={"inherit"}
              className={classes.flex}
              //onClick={this.props.startSetMainItems}
            >
              Juweli
            </Typography>
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
              varian={"title"}
              color={"inherit"}
            >
              <IconButton
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {this.props.auth.displayName ?
                this.props.auth.displayName : ''}
            </Typography>
            {this.props.auth.uid !== undefined ?
              <Button color="inherit" onClick={this.props.startLogout}>Logout</Button> :
              <Button color="inherit" onClick={this.props.startLogin}>Login</Button>
            }
          </ToolBar>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            component={Link}
            to={"/profile"}
          >
            Profile
          </MenuItem>
          <MenuItem
            component={Link}
            to={"/cabinet"}
          >
            Кабинет
          </MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          { this.props.auth.uid !== undefined ?
            <MenuItem onClick={this.props.startLogout}>Logout</MenuItem> :
            <MenuItem onClick={this.props.startLogin}>Login</MenuItem>
          }
        </Menu>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
});

const ConnectedNavBar =  connect((state) => {
  return {
    auth: state.auth,
    products: state.products,
    bucket: state.bucket,
  }
})(NavBar);

export default withStyles(headerStyle)(ConnectedNavBar);
