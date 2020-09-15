import React, { Component } from 'react'

import {NavLink} from 'react-router-dom'
import './index.scss'
export default class SettingHeader extends Component {
    goLink = () =>{
        // console.log(this)
        this.props.fatprops.history.push("/menu/setting/organization/detail")
    }
    authorityD = () =>{
        this.props.fatprops.history.push("/menu/setting/authorityManage/detail/-1")
    }
    addper = () =>{
        this.props.fatprops.history.push("/menu/setting/staff/addper")
        
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <div className="SettingHeader">
                    <div className="Demand-left-tab-list lf">
                        <ul>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/setting/staff">
                                    <span>员工管理</span>
                                </NavLink>

                            </li>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/setting/organization">
                                    <span>组织架构</span>
                                </NavLink>
                            </li>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/setting/authorityManage">
                                    <span>权限管理</span>
                                </NavLink>
                            </li>  
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/setting/historyp/0/true">
                                    <span>历史记录</span>
                                </NavLink>
                            </li>    
                        </ul>
                    </div>

                    <div className="rf userIcon">
                        {
                            this.props.fatprops.location.pathname == "/menu/setting/organization/list"
                                ?
                                <img src={[require('../../../assets/product/set.png')]} alt="" onClick={this.goLink}/>
                                :
                                this.props.fatprops.location.pathname == "/menu/setting/staff/list" 
                                ?
                                <img src={[require('../../../assets/product/add.png')]} alt="" onClick={this.addper}/>
                                :
                                this.props.fatprops.location.pathname == "/menu/setting/authorityManage/list" 
                                ?
                                <img src={[require('../../../assets/product/add.png')]} alt="" onClick={this.authorityD}/>
                                :
                                null

                        }
                    </div>
                </div>
            </div>
        )
    }
}
