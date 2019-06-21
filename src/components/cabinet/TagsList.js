import React from 'react'
import connect from 'react-redux/es/connect/connect'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import classNames from 'classnames'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import T from 'i18n-react'
import { store } from '../../store/configureStore'
import { getTags, startRemoveTag } from '../../actions/tags'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import DraftsIcon from '@material-ui/icons/Drafts'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton/IconButton'
import List from '@material-ui/core/List/List'

class TagsList extends React.Component {
  componentDidMount() {
    store.dispatch(getTags())
  }

  render () {
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
                <h1>{T.translate("cabinet.tagsList")}</h1>
                <List>
                  {this.props.tags.map((tag) => {
                      return (
                        <ListItem key={tag.id}>
                          <ListItemIcon>
                            <DraftsIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={tag.name} />
                          <ListItemSecondaryAction>
                            <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onHandleDelete(tag.id)}>
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
    tags: state.tags,
    language: state.language,
    path: props.match.path,
  }
};

const mapDispatchToProps= (dispatch) => {
  return {
    onHandleDelete: (tagId) => {
      dispatch(startRemoveTag(tagId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(TagsList));
