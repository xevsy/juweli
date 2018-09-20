import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({
  isAuth,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect to={"/"} />
    )
  ) } />
);

const mapPropsToState = (state) => ({
  isAuth: !!state.auth.uid
})

export default connect(mapPropsToState)(PrivateRoute);