import React from 'react'
import Header from '../Header'
import { connect } from 'react-redux'
import MainItemForm from './forms/MainItemForm'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { startEditMainItem, startRemoveMainItem, startSetMainItems } from '../../actions/items'
import { withStyles } from '@material-ui/core/styles'
import { storage } from '../../firebase/firebase'
import MainMenu from './MainMenu'
import { startSetCategories } from '../../actions/categories'
import { store } from '../../index'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import classNames from 'classnames'

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
    }

    if (props.item) {
      storage
        .ref("images")
        .child(props.item.image)
        .getDownloadURL().then((url) => this.setState({'imageUrl': url}));
    }
  }

  componentDidMount() {
    store.dispatch(startSetCategories());
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Header/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <MainMenu/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h1>Edit item {this.props.item.title}</h1>
                <MainItemForm
                  item={this.props.item}
                  categories={this.props.categories}
                  auth={this.props.auth}
                  onFormSubmit={this.props.onFormSubmit}
                  onHandleChange={this.props.onHandleChange}
                  onHandleDelete={this.props.onHandleDelete}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <h2>Preview</h2>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    height="140"
                    image={this.state.imageUrl}
                    title="Juweli"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {this.props.item.title}
                    </Typography>
                    <Typography component="p">
                      {this.props.item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
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
    item: state.products.find((item) => item.id === props.match.params.id),
    categories: state.categories,
    auth: state.auth,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFormSubmit: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(startSetMainItems());
    },
    onHandleChange: item => {
      dispatch(startEditMainItem(props.match.params.id, item));
      dispatch(startSetMainItems());
    },
    onHandleDelete: () => {
      dispatch(startRemoveMainItem(props.match.params.id));
      props.history.push('/cabinet');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(EditItem));
