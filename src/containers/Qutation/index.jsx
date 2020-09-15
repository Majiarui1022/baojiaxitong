import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'

import QutationHeader from './QutationHeader'
import QutationMy from './QutationMy'
import QitatopmOut from './QutationToAudit'
import QuutationAll from './QutationAll'
import './index.scss'
export default class Qutation extends Component {
    render() {
        return (
            <div className="Product-fat-box">
                <div className="Product-tit-header">
                    <QutationHeader></QutationHeader>
                </div>
                <Switch>
                    <Route component={QutationMy} path='/menu/qutation/My'></Route>
                    <Route component={QitatopmOut} path='/menu/qutation/audit'></Route>
                    <Route component={QuutationAll} path='/menu/qutation/all'></Route>

                    <Redirect to="/menu/qutation/My/list" from="/menu/qutation" exact/>
                    
                </Switch>
            </div>
        )
    }
}
