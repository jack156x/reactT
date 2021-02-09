import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"

function RouterView (props) {
  let { routes } = props;
  let routerArr = routes && routes.filter((item, index) => !item.redirect)  //不是重定向的
  let redirectArr = routes && routes.filter((item, index) => item.redirect).map((item, index) => <Redirect from={item.path} to={item.redirect} key={index} />)
  return <Switch>
    {
      routerArr && routerArr.map((item, index) => {
        return <Route path={item.path} key={index} render={(props) => {
          return <item.component  {...props} child={item.children} />
        }} />
      }).concat(redirectArr)
    }
  </Switch>
}
export default RouterView;