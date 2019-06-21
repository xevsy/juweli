import React from 'react'
import connect from 'react-redux/es/connect/connect'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import classNames from 'classnames'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import T from 'i18n-react'
import { store } from '../../store/configureStore'
import { getOrders } from '../../actions/orders'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table/Table'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableHead from '@material-ui/core/TableHead/TableHead'
import Link from '@material-ui/core/Link/Link'
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment'

class OrdersList extends React.Component {
  componentDidMount() {
    store.dispatch(getOrders())
  }

  render () {
    const {classes, orders} = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <MainMenu path={this.props.path}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <h1>{T.translate("cabinet.ordersList")}</h1>
                {orders.map((order) => {
                    return (
                      <ExpansionPanel key={order.id}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={order.id}
                        >
                          <Table>
                            <TableBody>
                              <TableRow key={order.id}>
                                <TableCell align="left" scope="row">{moment(order.createAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell align="left" scope="row">{order.fio}</TableCell>
                                <TableCell align="left" scope="row">{order.phone}</TableCell>
                                <TableCell align="left" scope="row">{order.email}</TableCell>
                                <TableCell align="left" scope="row">{order.deliveryBranch}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">{T.translate("order.count")}</TableCell>
                                <TableCell align="left">{T.translate("order.title")}</TableCell>
                                <TableCell align="left">{T.translate("order.identifier")}</TableCell>
                                <TableCell align="left">{T.translate("order.link")}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.order.map((item) => {
                                return (
                                  <TableRow key={item.id}>
                                    <TableCell align="left" scope="row">{item.bucket}</TableCell>
                                    <TableCell align="left" scope="row">{item.title}</TableCell>
                                    <TableCell align="left" scope="row">{item.identifier}</TableCell>
                                    <TableCell align="left" scope="row"><Link component={RouterLink} to={"/cabinet/edit/"+item.id} target="_blank">{T.translate("order.goto")}</Link></TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      // <ListItem key={order.id}>
                      //   <ListItemIcon>
                      //     <DraftsIcon />
                      //   </ListItemIcon>
                      //   <ListItemText inset primary={order.name} />
                      //   <ListItemSecondaryAction>
                      //     <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onHandleDelete(order.id)}>
                      //       <DeleteIcon />
                      //     </IconButton>
                      //   </ListItemSecondaryAction>
                      // </ListItem>
                    )
                  }
                )}
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiExpansionPanelSummary);

const mapStateToProps = (state, props) => {
  return {
    orders: state.orders,
    language: state.language,
    path: props.match.path,
  }
};

const mapDispatchToProps= (dispatch) => {
  return {
    onHandleDelete: (orderId) => {
      //dispatch(startRemoveTag(tagId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(OrdersList));
