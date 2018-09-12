import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card/Card'
import { red } from '@material-ui/core/colors'
import CardHeader from '@material-ui/core/CardHeader/CardHeader'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton/IconButton'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CardActions from '@material-ui/core/CardActions/CardActions'
import { addItemToBucket } from '../actions/bucket'

class MainContent extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={10}>
        <Grid container>
        {this.props.items.length > 0 && this.props.items.map((item) => {
          return (
            <Grid item xs={6} key={item.id}>
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.title}
                  subheader={item.updateAt}
                />
                <CardMedia
                  className={classes.media}
                  image={item.imageUrl}
                  title=""
                />
                <CardContent>
                  <Typography>
                    {item.description}
                  </Typography>
                  <Typography>
                    {item.amount} {item.currency}
                  </Typography>
                  <Typography>
                    На складе: {item.count}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton
                    className={classes.expand}
                    onClick={() => this.props.onBucketClick(item)}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        }
        )}
        </Grid>
      </Paper>
    )
  }
}

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#EFEBE9',
  },
  card: {
    maxWidth: 350,
    margin: 15
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
  return {
    items: state.products
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBucketClick: item => {
      dispatch(addItemToBucket(item));
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(styles)(MainContent));