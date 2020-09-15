import React, { Component } from 'react'
import {Route ,Switch , Redirect} from 'react-router-dom'

import List from './List'
import Detail from './Detail'
import Detailset from './DetailSet'

import './index.scss'

export default class InventortMyList extends Component {
    render() {
        return (
            <div className="InventortMyList-falt-fox">
                <Switch>
                    <Route component={List} path="/menu/inventory/my/list"></Route>
                    <Route component={Detail} path="/menu/inventory/my/detail/:id"></Route>
                    <Route component={Detailset} path="/menu/inventory/my/Detailset/:id"></Route>

                    <Redirect to="/menu/inventory/my/list" from="/menu/inventory/my/" exact/>
                </Switch>
            </div>
        )
    }
}
