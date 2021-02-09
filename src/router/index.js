import React from 'react'
import { BrowserRouter } from "react-router-dom";
import RouterView from "./routerView";
import routes from "./routerConfig";
function RootRouter () {
  return <BrowserRouter>
    <RouterView routes={routes}></RouterView>
  </BrowserRouter>
}
export default RootRouter;