import React from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TableRow from '@material-ui/core/TableRow/TableRow'
import Table from '@material-ui/core/Table/Table'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableHead from '@material-ui/core/TableHead/TableHead'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import classNames from 'classnames'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import IconButton from '@material-ui/core/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeItemsFromBucket } from '../../actions/bucket'
import { addMessage } from '../../actions/message'
import T from 'i18n-react'
import ApplyOrderForm from '../forms/ApplyOrderForm'

class BucketItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {

    const { classes, currency } = this.props;

    const rows = [
      { id: 'count', numeric: false, disablePadding: true, label: T.translate("common.bucketCount") },
      { id: 'title', numeric: false, disablePadding: false, label: T.translate("common.bucketItem") },
      { id: 'price', numeric: false, disablePadding: false, label: T.translate("common.bucketItemPrice") + ' (UAH)' },
      { id: 'sum_price', numeric: false, disablePadding: false, label: T.translate("common.bucketItemTotal") + ' (UAH)' },
    ];

    const numSelected = this.state.selected.length;

    return (
      <Paper className={classNames(classes.paper)} elevation={0}>
        <Grid container>
          <Toolbar
            className={classNames(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Typography color="inherit" variant="subheading">
                  {numSelected} {T.translate("common.selected")}
                </Typography>
              ) : (
                <Typography variant="inherit" id="tableTitle">
                  {T.translate("common.bucket")}
                </Typography>
              )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              {numSelected > 0 ? (
                <Tooltip title={T.translate("common.deleteButton")}>
                  <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onBucketClickRemoveItems(this.state.selected)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : ''}
            </div>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell/>
                  {rows.map(row => {
                    return (
                      <TableCell
                        key={row.id}
                        numeric={row.numeric}
                        padding={row.disablePadding ? 'none' : 'default'}
                      >
                        <Tooltip
                          title="Sort"
                          placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                          enterDelay={300}
                        >
                          <TableSortLabel
                          >
                            {row.label}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    );
                  }, this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.bucket.map((item) => {
                  const isSelected = this.isSelected(item.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={true}
                      tabIndex={-1}
                      key={item.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell scope="row">
                        <img
                          src={item.imageUrl}
                          alt={"test something"}
                          className={
                            classes.imgRaised +
                            " " +
                            classes.imgRounded +
                            " " +
                            classes.imgFluid
                          }
                        />
                      </TableCell>
                      <TableCell scope="row">
                        {item.bucket}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{(item.amount * currency[item.currency.toLowerCase()]).toFixed(2)}</TableCell>
                      <TableCell>{(item.bucket * item.amount * currency[item.currency.toLowerCase()]).toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Toolbar>
              <ApplyOrderForm bucket={this.props.bucket} />
            </Toolbar>
          </div>
        </Grid>
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    // paddingRight: theme.spacing.unit,
    width: "100%"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#EFEBE9',
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: "100%"
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  imgFluid: {
    width: "50px",
    height: "auto"
  },
  imgRounded: {
    borderRadius: "6px !important"
  },
  imgRoundedCircle: {
    borderRadius: "50% !important"
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
});

BucketItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
  return {
    bucket: state.bucket,
    language: state.language,
    currency: state.currency,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBucketClickRemoveItems: items => {
      dispatch(removeItemsFromBucket(items));
      dispatch(addMessage(T.translate("messages.itemsRemoved") + items.length, 'info'));
    }
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(withStyles(styles)(BucketItems));