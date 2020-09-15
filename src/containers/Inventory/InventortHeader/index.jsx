import React, { Component } from 'react'

import {NavLink } from 'react-router-dom'

import './index.scss'
export default class InventortHeader extends Component {
    render() {
        return (
            <div className="InventortHeader">
                <div className="Demand-left-tab-list lf">
                    <ul>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/inventory/my">
                                    <span>我的清单</span>
                            </NavLink>
                            
                        </li>
                        <li className="tab-name lf">
                        <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/inventory/all">
                                <span>清单列表</span>
                                
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="Deamnd-right-tab-search rf">
                    <div className="search-init lf">
                        <div className="search-icn lf">
                            <img src={[require("../../../assets/contentmenu/demand/search.png")]} alt=""/>
                        </div>
                        <input type="number" placeholder="请输入需求编号或项目名称" className="lf"/>
                    </div>
                    <div className="search-but lf">
                        <button className="but-active">搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
