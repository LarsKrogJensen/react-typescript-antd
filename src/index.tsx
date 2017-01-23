import * as React from "react"
import * as ReactDOM from "react-dom"
import './index.css';
import './theme.less'
//import 'antd/dist/antd.css';

import { App } from "./components/App"

import "es6-promise"; // promise pollyfill


ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
