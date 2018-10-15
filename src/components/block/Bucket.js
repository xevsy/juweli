import React from 'react';
import List from '@material-ui/core/List/List'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem/ListItem'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton/IconButton'
import T from 'i18n-react'

const Bucket = (props) => {
  const onBucketClickRemove = (id) => {
    props.onBucketClickRemove(id);
  }
  return (
    <div className={props.classes.root}>
      <h3>{T.translate("common.bucket")}</h3>
      <div>
        <List>
          {props.bucket && props.bucket.map((item) => {
            return (
              <ListItem dense disableGutters divider key={item.id}>
                <ListItemText primary={item.bucket + ' x'} />
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => onBucketClickRemove(item.id)} >
                    <DeleteForeverIcon className={props.classes.icon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </div>
    </div>
  )
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#E0E0E0',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

export default withStyles(styles)(Bucket);