
import "babel-polyfill"
import React from 'react'
import { render } from 'react-dom'

//BrowserRouter HashRouter
import { HashRouter as Router  , Route } from 'react-router-dom'

import App from './App'

//ant 
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//public 
import './index.scss';
import "./axios"

render(
  <Router>
    
    <Route component={App} path="/"/>   
  </Router>,
    document.querySelector("#root")
)
