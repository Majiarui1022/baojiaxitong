import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'

export default class QutationAll extends Component {
    render() {
        return (
            <div className="pro-falt-fox">
                <Switch>
                    <Route component={List} path="/menu/qutation/all/list"></Route>
                    <Route component={Detail} path="/menu/qutation/all/detail/:id"></Route>
                    
                    <Redirect to="/menu/qutation/all/list" from="/menu/qutation/all" exact/>
                </Switch>
            </div>
        )
    }
}
