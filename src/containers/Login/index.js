import React, { Component } from 'react'

import {Route , Redirect , Switch} from 'react-router-dom'

import './index.scss'

import UserLogin from './UserLogin'
import ForgetPass from './ForgetPass'
import NotFound from '../NotFound'
import ResetPass from './ResetPass'

export default class Login extends Component {
    render() {
        return (
            <div className="Login-bac-bj">
                <img src={[require("../../assets/login/logo.png")]}  className="logo" alt=""/>
                <div className="login-cont-fat">
                    <div className="login-tit-name">
                        <p>控福智能报价服务系统</p>
                    </div>
                    <div className="login-fat-box">
                        <div className="login-left lf"></div>
                        <div className="login-right lf">
                            <Switch>
                                <Route component={UserLogin} path="/user/login" />
                                <Route component={ForgetPass} path="/user/forgetpass" />
                                <Route component={ResetPass} path="/user/resetpass/:id"/>



                                <Route component={NotFound} path="404" />
                                <Redirect to="/404"/>
                            </Switch>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
