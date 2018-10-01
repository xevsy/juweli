import CustomSnackBar from './CustomSnackBar'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import React from 'react'
import * as PropTypes from 'prop-types'

class MessageSnackBar extends React.Component {
  render () {
    const props = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={2000}
        onClose={this.props.handleMessageClose}
      >
        <CustomSnackBar
          onClose={this.props.handleMessageClose}
          open={props.open}
          message={props.message}
          variant={props.status}
        />
      </Snackbar>
    )
  }
}

MessageSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
  handleMessageClose: PropTypes.func,
}

export default MessageSnackBar;