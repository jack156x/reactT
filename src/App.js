import React, { Component } from 'react'
import Router from "./router/index"
import { Provider } from "react-redux"
import store from "./redux/index"
export default class App extends Component {
  render () {
    return (
      <div className="wrapper">
        <Provider store={store}>
          <Router></Router>
        </Provider>
      </div>
    )
  }
}