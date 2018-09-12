import React from 'react';
import SidebarMenu from './SidebarMenu'
import { connect } from 'react-redux'
import { getItemsByCategory } from '../actions/items'

const LeftSidebar = (props) => (
  <SidebarMenu categories={props.categories} onHandleClick={props.onHandleClick}/>
);

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleClick: categoryId => {
      dispatch(getItemsByCategory(categoryId));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);