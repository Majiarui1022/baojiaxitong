import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'
export default class AuthorityManage extends Component {
    render() {
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={List} path="/menu/setting/authorityManage/list"></Route>
                <Route component={Detail} path="/menu/setting/authorityManage/detail/:id"></Route>
                <Redirect to="/menu/setting/authorityManage/list" from="/menu/setting/authorityManage" exact/>
              </Switch>
           </div>
        )
    }
}
