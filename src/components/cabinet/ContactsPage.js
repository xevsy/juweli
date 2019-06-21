import React from 'react'
import Header from '../grid/Header'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import MainMenu from './MainMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import componentsStyle from '../../styles/jss/material-kit-react/views/components'
import T from 'i18n-react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Button from '@material-ui/core/Button/Button'
import Icon from '@material-ui/core/Icon/Icon'
import { getMainContacts, setMainContacts } from '../../actions/contacts'
import { store }  from '../../store/configureStore'

class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: (this.props.contacts ? this.props.contacts: '<p></p>')
    }
  }

  editorConfiguration = {
    config: {
      height: 500
    }
  };

  componentDidMount() {
    store.dispatch(getMainContacts());
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
                <h1>{T.translate("cabinet.contacts")}</h1>
                <CKEditor
                  editor={ ClassicEditor }
                  config={ this.editorConfiguration }
                  onChange={ ( event, editor ) => this.setState({data: editor.getData()}) }
                  data={this.state.data}
                />
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    className={this.props.classes.button}
                    onClick={() => this.props.onFormSubmit(this.state.data)}
                  >
                    {T.translate("common.saveButton")}
                    <Icon className={this.props.classes.rightIcon}>save</Icon>
                  </Button>
                </div>
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

const mapStateToProps = (state, props) => {
  return {
    language: state.language,
    path: props.match.path,
    contacts: state.contacts,
  }
};

const mapDispatchToProps= (dispatch) => {
  return {
    onFormSubmit: data => {
      dispatch(setMainContacts(data));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(ContactsPage));
