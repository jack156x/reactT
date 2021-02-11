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
//如果router 文件中没有匹配路径需要跳转就需要withrouter
//注意： 要使用 withRouter 强制更新路由信息，否则可能会出现路由地址改变但页面没有相应改变的bug 。
// export default withRouter(RouterView);
export default RouterView