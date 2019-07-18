import React from 'react';
import Paper from '@material-ui/core/Paper/Paper'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'


class MainItem extends React.PureComponent {

  state = { uah: 'UAH' };

  rawMarkup(content){
    return { __html: content };
  }

  render() {
    const { classes, item, currency } = this.props;
    let images = [];
    if (item.images) {
      item.images.length > 0 && item.images.map((image) => {
        images.push({original: image.url, thumbnail: image.url})
      });
    }
    return (
      <Paper className={classes.paper} elevation={0}>
        <Grid container>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title} / {item.identifier}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span dangerouslySetInnerHTML={this.rawMarkup(item.description)} />
              </Typography>
              {item.amount > 0 &&
                <Typography>
                  {(item.amount * currency[item.currency.toLowerCase()]).toFixed(2)} {this.state.uah}
                </Typography>
              }
            </CardContent>
            <ImageGallery items={images} />
          </Card>
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
    margin: 15,
  },
});

MainItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainItem);