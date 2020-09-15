import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'
export default class QutationToAudit extends Component {
    render() {
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={List} path="/menu/qutation/audit/list"></Route>
                <Route component={Detail} path="/menu/qutation/audit/detail/:id"></Route>
                <Redirect to="/menu/qutation/audit/list" from="/menu/qutation/audit" exact/>
              </Switch>
           </div>
        )
    }
}
