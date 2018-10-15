/*eslint-disable*/
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Button from "../custom/Button.jsx";

import headerLinksStyle from "../../styles/jss/material-kit-react/components/headerLinksStyle.jsx";
import T from 'i18n-react'

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title={T.translate("social.follow_facebook")}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={"transparent"}
            href={process.env.REACT_APP_FACEBOOK_LINK}
            target={"_blank"}
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id={"instagram-tooltip"}
          title={T.translate("social.follow_instagram")}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={"transparent"}
            href={process.env.REACT_APP_INSTAGRAMM_LINK}
            target={"_blank"}
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id={"language-ru-tooltip"}
          title={T.translate("social.language.ru")}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={"transparent"}
            className={classes.navLink}
            onClick={() => props.changeLanguage("ru")}
          >
            <img src="/images/ukraine.svg" width="18px" alt={T.translate("social.language.ru")} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id={"language-en-tooltip"}
          title={T.translate("social.language.en")}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={"transparent"}
            className={classes.navLink}
            onClick={() => props.changeLanguage("en")}
          >
            <img src="/images/england.svg" width="18px" alt={T.translate("social.language.en")} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
