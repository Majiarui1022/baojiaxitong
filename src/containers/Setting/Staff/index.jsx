import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'
import Addper from './addper'
export default class Staff extends Component {
    componentDidMount(){
    }
    render() {
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={List} path="/menu/setting/staff/list"></Route>
                <Route component={Detail} path="/menu/setting/staff/detail/:id"></Route>
                <Route component={Addper} path="/menu/setting/staff/addper"></Route>


                <Redirect to="/menu/setting/staff/list" from="/menu/setting/staff" exact/>
              
              </Switch> 
           </div>
        )
    }
}
