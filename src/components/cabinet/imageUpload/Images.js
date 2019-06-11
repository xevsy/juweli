import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import Card from '@material-ui/core/Card/Card'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const Images = (props) =>
  props.images.map((image, i) =>
    <div key={i} className={props.classes.fadein}>
      <div
        onClick={() => props.removeImage(image.public_id)}
        className={props.classes.delete}
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
      <Card className={props.classes.card}>
        <CardMedia
          component="img"
          className={props.classes.media}
          height="140"
          width="140"
          src={image.url}
          image={image.url}
          title=""
        />
      </Card>
    </div>
  )


const styles = theme => ({
  media: {
    objectFit: 'cover',
  },
  card: {
    maxWidth: 345,
  },
  fadein: {
    animation: "fadein 2s"
  },
  // delete: {
  //   position: "relative",
  //   top: "16px",
  //   right: "15px"
  // }
});

Images.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Images)