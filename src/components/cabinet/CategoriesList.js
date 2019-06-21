import React from 'react'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import DraftsIcon from '@material-ui/icons/Drafts'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItem from '@material-ui/core/ListItem/ListItem'
import IconButton from '@material-ui/core/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import List from '@material-ui/core/List/List'
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import T from 'i18n-react'
import { startRemoveMainCategory } from '../../actions/categories'

class CategoriesList extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <MainMenu path={this.props.path}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <h1>{T.translate("cabinet.dashboard")}</h1>
                <List>
                  {this.props.categories.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemIcon>
                            <DraftsIcon />
                          </ListItemIcon>
                          <Link to={"/cabinet/categories/edit/" + item.id} >
                            <ListItemText inset primary={item.title} />
                          </Link>
                          <ListItemSecondaryAction>
                            <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onHandleDelete(item.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    }
                  )}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.all,
    language: state.language,
    path: props.match.path
  }
};

const mapDispatchToProps= (dispatch) => {
  return {
    onHandleDelete: (itemId) => {
      dispatch(startRemoveMainCategory(itemId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(CategoriesList));
