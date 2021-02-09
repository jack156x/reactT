import React from 'react'
import Loadable from "react-loadable";

//懒加载(按需加载)
const loading = () => {
  return <div>
    {/* <img src={require("../img/timg (1).gif")} alt="" /> */}
  </div>
}
//一级
const Home = Loadable({
  loader: () => import("../views/home"),
  loading: loading,
})

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/",
    redirect: "/home"
  }
]
export default routes;