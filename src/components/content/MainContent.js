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

class MainContent extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={0}>
        <Grid container>
        {this.props.items.length > 0 && this.props.items.map((item) => {
          return (
            <Grid item xs={12} sm={6} key={item.id}>
              <ItemTeaser
                item={item}
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
});

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
  return {
    items: state.products,
    role: state.auth.role,
    language: state.language,
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