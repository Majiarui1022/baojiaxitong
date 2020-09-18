import React, { Component } from 'react'

import {NavLink } from 'react-router-dom'

import './index.scss'
export default class ProductHeader extends Component {
    render() {
        return (
            <div>
                  <div className="DemandHeader">
                <div className="Demand-left-tab-list lf">
                    <ul>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductMy">
                                    <span>指派到我</span>
                            </NavLink>
                            
                        </li>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductFat">
                                <span>分配</span>
                            </NavLink>
                        </li>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductRespon">
                                <span>清单</span>
                            </NavLink>
                        </li>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductRespon">
                                <span>基础报价</span>
                            </NavLink>
                        </li>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductRespon">
                                <span>子项目审核</span>
                            </NavLink>
                        </li>
                        <li className="tab-name lf">
                            <NavLink 
                                className="tab-info" 
                                activeClassName="active" 
                                to="/menu/product/ProductRespon">
                                <span>基础报价审核</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}
