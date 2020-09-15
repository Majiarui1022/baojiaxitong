

//   Fragment 渲染出来就是一个空组件
import React, { Component , Fragment} from 'react'
// import PropTypes from 'prop-types'

import {Route , Redirect , Switch} from 'react-router-dom'


import Login from './containers/Login'
import NotFound from './containers/NotFound'
import ContentMenu from './containers/ContentMenu'

export default class App extends Component {

    componentDidMount(){
      console.log()
     
    }
    
    render() {
   
        return (
          <Fragment>
            <Switch>
              <Route component={Login} path="/user"/> 
              <Route component={NotFound} path="/404"/> 
              <Route component={ContentMenu} path="/menu" />
              
              <Redirect to="/user/login" from="/" exact/>
              <Redirect to="/404"/>
            </Switch>
          </Fragment>
        )
    }
}

