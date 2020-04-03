import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid/Grid'
import { addItemToBucket } from '../../actions/bucket'
import ItemTeaser from '../block/ItemTeaser'
import { addMessage } from '../../actions/message'
import T from 'i18n-react'
import Typography from '@material-ui/core/Typography/Typography'
import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'

class MainContent extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={0}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {this.props.category.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.props.category.description}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={this.props.category.images ? this.props.category.images[0].url : ''}
            title={this.props.category.title}/>
        </Card>
        <Grid container>
        {this.props.items.length > 0 && this.props.items.map((item) => {
          return (
            <Grid item xs={12} sm={6} key={item.id}>
              <ItemTeaser
                item={item}
                currency={this.props.currency}
                role={this.props.role}
                onBucketClick={() => this.props.onBucketClick(item)}
              />
            </Grid>
          )
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
    borderRadius: 0,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state, props) => {
  return  {
    role: state.auth.role,
    language: state.language,
    currency: state.currency,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBucketClick: item => {
      dispatch(addItemToBucket(item));
      dispatch(addMessage(item.title + T.translate("messages.itemAdded"), 'success'))
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(styles)(MainContent));