import React, { Component } from 'react'


import {Route , Switch , Redirect} from 'react-router-dom'

import './index.scss'

import DemandHeader from './DemandHeader'
import DemandManager from './DemandManager'
import DemandCreate from './DemandCreate'
import DemandSetting from './DemandSetting'
import DemandDetail from './DemandDetail'
export default class Demand extends Component {
    render() {
        return (
            <div className="Demand-fat-box">
                <div className="Demand-tit-header">
                    <DemandHeader></DemandHeader>
                </div>
                <Switch>
                    <Route component={DemandManager} path="/menu/demand/demandmanager"></Route>
                    <Route component={DemandCreate} path="/menu/demand/demandmreate"></Route>
                    <Route component={DemandSetting} path="/menu/demand/demandsetting"></Route>

                    <Route component={DemandDetail} path="/menu/demand/detail/:id"></Route>
                    
                    <Redirect to="/menu/demand/demandmanager" from="/menu/demand" exact/>
                </Switch>
            </div>
        )
    }
}
