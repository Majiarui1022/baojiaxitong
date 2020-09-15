import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'
export default class Organization extends Component {
    componentDidMount(){
        console.log(this.props.location.pathname)
    }
    render() {
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={List} path="/menu/setting/organization/list"></Route>
                <Route component={Detail} path="/menu/setting/organization/detail"></Route>
                <Redirect to="/menu/setting/organization/list" from="/menu/setting/organization" exact/>
              </Switch>
           </div>
        )
    }
}
