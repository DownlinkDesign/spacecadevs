import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Layout from './components/Layout'
import Blogs from './components/Blogs'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Blogs} />
    <Route path='signin' component={SignIn} />
    <Route path='signup' component={SignUp} />
    <Redirect from="*" to="/" />
  </Route>
)
