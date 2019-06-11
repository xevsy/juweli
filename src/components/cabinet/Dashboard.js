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
import { getItemsAll, startRemoveMainItem } from '../../actions/items'
import { Link } from 'react-router-dom'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import List from '@material-ui/core/List/List'
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import T from 'i18n-react'
import { store }  from '../../store/configureStore'

class Dashboard extends React.Component {

  componentDidMount() {
    store.dispatch(getItemsAll())
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
          <div>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <MainMenu/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Paper className={classes.paper}>
                  <h1>{T.translate("cabinet.dashboard")}</h1>
                  <List>
                  {this.props.items.map((item) => {
                    return (
                      <ListItem key={item.id}>
                          <ListItemIcon>
                            <DraftsIcon />
                          </ListItemIcon>
                          <Link to={"/cabinet/edit/" + item.id} >
                            <ListItemText inset primary={item.title} />
                          </Link>
                          <ListItemSecondaryAction>
                            <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onHandleDelete(item.id, item.image)}>
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
            </Grid>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.products,
    categories: state.categories.all,
    language: state.language,
  }
};

const mapDispatchToProps= (dispatch) => {
  return {
    onHandleDelete: (itemId, image) => {
      dispatch(startRemoveMainItem(itemId, {image: image}))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(Dashboard));
