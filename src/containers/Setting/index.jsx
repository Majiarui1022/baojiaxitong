import React, { Component } from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'

import './index.scss'
import SettingHeader from './SettingHeader'
import Staff from './Staff'
import Organization from './Organization'
import AuthorityManage from './AuthorityManage'
import Historyp from './Historyp'
export default class Setting extends Component {
    render() {
        console.log(this)
        return (
            <div className="Product-fat-box">
                <div className="Product-tit-header">
                    <SettingHeader fatprops = {this.props}></SettingHeader>
                </div>
                <Switch>
                    <Route render = {()=>(<Staff />)}path='/menu/setting/staff'></Route>
                    <Route component={Organization} path='/menu/setting/organization'></Route>
                    <Route component={AuthorityManage} path='/menu/setting/authorityManage'></Route>
                    <Route component={Historyp} path='/menu/setting/historyp/:id/:status'></Route>
                    
                    <Redirect to="/menu/setting/staff" from="/menu/setting" exact/>
                </Switch>
            </div>
        )
    }
}
