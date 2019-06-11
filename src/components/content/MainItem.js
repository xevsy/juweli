import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';


class MainItem extends React.PureComponent {

  render() {
    const { classes } = this.props;
    let images = [];
    if (this.props.item.images) {
      this.props.item.images.length > 0 && this.props.item.images.map((image) => {
        images.push({original: image.url, thumbnail: image.url})
      });
    }
    return (
      <Paper className={classes.paper} elevation={0}>
        <Grid container>
          <ImageGallery items={images} />
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

MainItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainItem);