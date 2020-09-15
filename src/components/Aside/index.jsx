import React, { Component } from 'react'

import {NavLink} from 'react-router-dom'


import './index.scss'
export default class Aside extends Component {
    clearlogin = () =>{
        console.log(this.props)
        // this.props.poshistory.push({pathname : '/user/resetpass/'})
        this.props.pos.history.push({
            pathname : '/user/login'
        })
        sessionStorage.clear();
    }
    render() {
        return (
            <div className="index-aside">
                <div className="logo">
                    <img src={[require("../../assets/login/logo.png")]} alt=""/>
                </div>
                <div className="aside-list">
                    <ul>
                        <li>
                            <NavLink 
                                to="/menu/demand"
                                activeClassName="active" 
                            >
                                <img src={[require("../../assets/contentmenu/onec.png")]} alt=""/>
                            </NavLink>
                            <div className="list-tit-name">
                                <span>需求</span>
                            </div>
                        </li>
                        <li>
                            <NavLink 
                                to="/menu/product"
                                activeClassName="active" 
                            >
                                <img src={[require("../../assets/contentmenu/two.png")]} alt=""/>
                            </NavLink>
                            <div className="list-tit-name">
                                <span>项目</span>
                            </div>
                        </li>
                        <li>
                            <NavLink 
                                to="/menu/inventory"
                                activeClassName="active" 
                            >
                                <img src={[require("../../assets/contentmenu/three.png")]} alt=""/>
                            </NavLink>
                            <div className="list-tit-name">
                                <span>成本清单</span>
                            </div>
                                
                        </li>
                        <li>

                        <NavLink 
                                to="/menu/qutation"
                                activeClassName="active" 
                            >
                                <img src={[require("../../assets/contentmenu/four.png")]} alt=""/>
                            </NavLink>
                            <div className="list-tit-name">
                                <span>报价单</span>
                            </div>
                        </li>
                        <li>

                        <NavLink 
                                to="/menu/setting"
                                activeClassName="active" 
                            >
                                <img src={[require("../../assets/contentmenu/five.png")]} alt=""/>
                            </NavLink>
                            <div className="list-tit-name">
                                <span>设置</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="clear-login-fax" onClick={this.clearlogin}>
                    <img src={[require("../../assets/contentmenu/six.png")]} alt=""/>
                </div>
                
            </div>
        )
    }
}
