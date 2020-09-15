import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import List from './List'
import Detail from './Detail'
export default class QutationMy extends Component {
    render() {
        
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={List} path="/menu/qutation/My/list"></Route>
                <Route component={Detail} path="/menu/qutation/My/detail/:id"></Route>


                <Redirect to="/menu/qutation/My/list" from="/menu/qutation/My" exact/>
              
              </Switch> 
           </div>
        )
    }
}
