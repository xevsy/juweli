import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'

const Buttons = (props) => <div className={classNames(props.classes.buttons, props.classes.fadein)}>
  <div className={props.classes.button}>
    <label htmlFor='multi'>
      <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
    </label>
    <input type='file' id='multi' onChange={props.onChange} multiple style={{visibility: "hidden", position: "absolute"}}/>
  </div>
</div>

const styles = theme => ({
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    height: "45vh"
  },
  fadein: {
    animation: "fadein 2s"
  },
  button: {
    margin: "0 10vw"
  }
});

export default withStyles(styles)(Buttons);
