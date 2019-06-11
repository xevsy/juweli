import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core'


const Spinner = () =>
  <div className='rolling'>
  <div className='spinner fadein'>
    <FontAwesomeIcon icon={faBowlingBall} size='5x' color='#3B5998'/>
  </div>
</div>;

const styles = theme => ({
  rolling: {
    position: "absolute",
    animation: "move 6s ease-out",
    filter: "drop-shadow(4px 4px 4px #999)"
  }
});

export default withStyles(styles)(Spinner);