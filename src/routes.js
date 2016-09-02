import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Layout from './components/Layout'
import Splash from './components/Splash'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Splash} />
    <Redirect from="*" to="/" />
  </Route>
)
