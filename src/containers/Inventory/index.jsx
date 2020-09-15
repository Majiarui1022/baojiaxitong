import React, { Component } from 'react'
import {Route ,Switch , Redirect} from 'react-router-dom'
import './index.scss'

import InventortMyList from './InventortMyList'
import InventoryAll from './InventoryAll'
import InventortHeader from './InventortHeader'
export default class Inventory extends Component {
    render() {
        return (
            <div className="Inventory-fat-box">
                <div className="Product-tit-header">
                    <InventortHeader></InventortHeader>
                </div>
                <Switch>
                    <Route component={InventortMyList} path='/menu/inventory/my'></Route>
                    <Route component={InventoryAll} path='/menu/inventory/all'></Route>

                    <Redirect to="/menu/inventory/my/list" from="/menu/inventory" exact/>
                </Switch>
            </div>
        )
    }
}
