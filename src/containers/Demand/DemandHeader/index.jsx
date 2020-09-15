import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'


import './index.scss'
export default class DemandHeader extends Component {
    render() {
        return (
            <div className="DemandHeader">
                <div className="Demand-left-tab-list lf">
                    <ul>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/demand/demandmanager">
                                    <span>需求管理</span>
                            </NavLink>
                            
                        </li>
                        <li className="tab-name lf">
                        <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/demand/demandmreate">
                                <span>新增需求</span>
                                
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="Deamnd-right-tab-search rf">
                    <div className="search-init lf">
                        <div className="search-icn lf">
                            <img src={[require("../../../assets/contentmenu/demand/search.png")]} alt=""/>
                        </div>
                        <input type="text" placeholder="请输入需求编号或项目名称" className="lf"/>
                    </div>
                    <div className="search-but lf">
                        <button className="but-active">搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
