import React, { Component } from 'react'
import { Input, Space , Button, message } from 'antd';

import {NavLink as Link} from 'react-router-dom'


import './index.scss'

export default class UserLogin extends Component {
    state = {
        userErr :'',
        passErr :'',
        username :'',
        password : '',
    }
    userLogin = () =>{

        if(this.state.username == '' || this.state.username.length < 6 || this.state.username.length > 16){
            this.setState({
                userErr : '请输入6-16位英文与数字的组合'
            })
            return
        }
        if(this.state.password == '' || this.state.password.length < 6 || this.state.password.length > 18){
            this.setState({
                userErr : '',
                passErr : '请输入6-18位字符'
            })
            return
        }
        this.postRequestBody('u/v1/login/',{username:this.state.username,password:this.state.password}).then((res)=>{
            console.log(res.data)
            this.setState({
                passErr : ''
            })
            if(res.data.code === "400"){
                message.error(res.data.error);
                return;
            }
            sessionStorage.setItem('userinfo',JSON.stringify(res.data))
            this.props.history.push('/menu/demand/demandmanager');
          }).catch((err)=>{
            console.log(err)
          })
    }
    changeuser = (e) =>{
        this.setState({
            username : e.target.value
        })
    }
    changepass = (e) =>{
        this.setState({
            password : e.target.value
        })
    }
    componentDidMount(){

    }
    render() {

        return (
            <div className="user-login-fat">
                <div className="login-tit">
                    <span className="label-name">用户登录</span>
                </div>
             
                <div className="user-info">
                    <div className="user-email user-cord">
                        <div className="user-icn lf">
                            <img src={[require("../../../assets/login/user.png")]} alt="" />
                        </div>
                        <div className="lf init">
                            <Space direction="vertical">
                                <Input placeholder="请输入您的账号" onChange={(event) =>{this.changeuser(event)}}/>
                            </Space>
                        </div>
                    </div>
                    <p className="err-info">{this.state.userErr}</p>
                    <div className="user-email user-cord">
                        <div className="user-icn lf">
                            <img src={[require("../../../assets/login/pass.png")]} alt="" />
                        </div>
                        <div className="lf init">
                            <Space direction="vertical">
                                <Input.Password placeholder="请输入您的密码" onChange={(event) => {this.changepass(event)}}/>
                            </Space>
                        </div>
                    </div>
                    <p className="err-info">{this.state.passErr}</p>
                </div>
                <div className="forget-pass">
                    <span>
                        <Link to="/user/forgetpass">忘记密码？</Link>
                    </span>
                </div>
                <div className="footer-but but-active">
                    <Button type="primary"  onClick={this.userLogin}>立即登录</Button>
                </div>
            </div>
        )
    }
}


