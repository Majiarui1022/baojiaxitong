import React, { Component } from 'react'

import {NavLink} from 'react-router-dom'
import './index.scss'
export default class QutationHeader extends Component {
    render() {
        return (
            <div>
                <div className="QutationHeader">
                    <div className="Demand-left-tab-list lf">
                        <ul>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/qutation/My">
                                    <span>我的报价单</span>
                                </NavLink>

                            </li>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/qutation/audit">
                                    <span>待审核报价单</span>
                                </NavLink>
                            </li>
                            <li className="tab-name lf">
                                <NavLink
                                    className="tab-info"
                                    activeClassName="active"
                                    to="/menu/qutation/all">
                                    <span>所有报价单</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
