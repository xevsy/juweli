import React from 'react'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import DraftsIcon from '@material-ui/icons/Drafts'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItem from '@material-ui/core/ListItem/ListItem'
import IconButton from '@material-ui/core/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { getItemsAll, startRemoveMainItem } from '../../actions/items'
import { Link } from 'react-router-dom'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import List from '@material-ui/core/List/List'
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import T from 'i18n-react'
import { store }  from '../../store/configureStore'
import TextField from '@material-ui/core/TextField/TextField'
import Pagination from "react-js-pagination"
import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    store.dispatch(getItemsAll())
    this.state = {
      initialItems: props.items,
      items: [],
      activePage: 1
    }
  }

  // componentDidMount() {
  //   store.dispatch(getItemsAll())
  // }

  componentWillMount() {
    this.setState({items: this.state.initialItems})
  }

  filterList = (event) => {
    let updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  render() {
    const {classes} = this.props;

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
                  <h1>{T.translate("cabinet.dashboard")}</h1>
                  <TextField
                    className={classes.textField}
                    placeholder={T.translate("common.search")}
                    margin="normal"
                    variant="outlined"
                    onChange={this.filterList}/>
                  {/*<Card className={classes.card}>*/}
                    {/*<CardContent>*/}
                      {/*<Pagination*/}
                        {/*activePage={this.state.activePage}*/}
                        {/*itemsCountPerPage={10}*/}
                        {/*totalItemsCount={450}*/}
                        {/*pageRangeDisplayed={5}*/}
                        {/*onChange={this.handlePageChange}*/}
                      {/*/>*/}
                    {/*</CardContent>*/}
                  {/*</Card>*/}
                  <List>
                  {this.state.items.map((item) => {
                    return (
                      <ListItem key={item.id}>
                          <ListItemIcon>
                            <DraftsIcon />
                          </ListItemIcon>
                          <Link to={"/cabinet/edit/" + item.id} >
                            <ListItemText inset primary={item.title} />
                          </Link>
                          <ListItemSecondaryAction>
                            <IconButton aria-label={T.translate("common.deleteButton")} onClick={() => this.props.onHandleDelete(item.id, item.image)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                    )
                    }
                  )}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    items: state.products,
    categories: state.categories.all,
    language: state.language,
    path: props.match.path
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleDelete: (itemId, image) => {
      dispatch(startRemoveMainItem(itemId, {image: image}))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(Dashboard));
