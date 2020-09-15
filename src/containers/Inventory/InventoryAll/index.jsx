import React, { Component } from 'react'
import {Route ,Switch , Redirect} from 'react-router-dom'

import List from './List'
import Detail from './Detail'


import './index.scss'
export default class InventoryAll extends Component {
    render() {
        return (
            <div className="InventortAllList-falt-fox">
            <Switch>
                <Route component={List} path="/menu/inventory/all/list"></Route>
                <Route component={Detail} path="/menu/inventory/all/detail/:id"></Route>

                <Redirect to="/menu/inventory/all/list" from="/menu/inventory/all" exact/>
            </Switch>
        </div>
        )
    }
}
