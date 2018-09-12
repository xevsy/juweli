import React from 'react';
import { connect } from 'react-redux'
import Bucket from './Bucket'
import { removeItemFromBucket } from '../actions/bucket'

const RightSidebar = (props) => (
    <Bucket bucket={props.bucket} onBucketClickRemove={props.onBucketClickRemove}/>
);

const mapStateToProps = (state) => {
  return {
    bucket: state.bucket
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBucketClickRemove: id => {
      dispatch(removeItemFromBucket(id));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);