import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import List from '@material-ui/core/List/List'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem/ListItem'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Grid from '@material-ui/core/Grid/Grid'


const Bucket = (props) => {
  const onBucketClickRemove = (id) => {
    props.onBucketClickRemove(id);
  }
  return (
    <Paper className={props.classes.paper} elevation={10} >
      <Grid container spacing={16}>
        <h3>Корзина</h3>
        <div className={props.classes.root}>
          <List>
            {props.bucket && props.bucket.map((item) => {
              return (
                <ListItem key={item.id}>
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
      </Grid>
    </Paper>
  )
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#E0E0E0',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#EFEBE9',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

export default withStyles(styles)(Bucket);