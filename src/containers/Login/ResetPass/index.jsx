import React, { Component } from 'react'

import { Input, Space , Button } from 'antd';

import './index.scss'
export default class ResetPass extends Component {
    state = {
        passErr :'',
        configPassErr : '',
        pass : '',
        configpas : ''
    }
    configpass = (e) =>{
        this.setState({
            configpas : e.target.value
        })
    }
    passChange = (e) =>{
        this.setState({
            pass : e.target.value
        })
    }
    resetpas = () =>{
        console.log(this.state.pass.length)
        if(6 <= this.state.pass.length && this.state.pass.length <= 18){
            console.log(this.state.configpas)
            console.log(this.state.pass)
            if(this.state.pass !== this.state.configpas){
                this.setState({
                    passErr : '',
                    configPassErr :'两次输入密码不一致'
                })
            }else{
                this.put('u/v1/pwd_set/' + this.props.match.params.id + '/',{password:this.state.pass,password2:this.state.configpas}).then((res)=>{
                    console.log(res)
                    if(res.data.error){
                        this.setState({
                            configPassErr : res.data.error
                        })
                    }else if(res.data.msg == "success"){
                        this.props.history.push('/user/login/')
                    }
                  }).catch((err)=>{
                    console.log(err)
                  })
            }
        }else{
            this.setState({
                passErr : '请输入6-18位字符'
            })
        }
    }
    render() {
        return (
            <div className="user-ResetPass-fat">
            <div className="login-tit">
                <span className="label-name">重置密码</span>
            </div>
         
            <div className="user-info">
                <div className="user-email user-cord">
                    <div className="user-icn lf">
                        <img src={[require("../../../assets/login/pass.png")]} alt="" />
                    </div>
                    <div className="lf init">
                        <Space direction="vertical">
                            <Input.Password  placeholder="请输入您的密码" onChange= {(event)=>{this.passChange(event)}}/>
                        </Space>
                    </div>
                </div>
                <p className="err-info">{this.state.passErr}</p>
                <div className="user-email user-cord">
                    <div className="user-icn lf">
                        <img src={[require("../../../assets/login/pass.png")]} alt="" />
                    </div>
                    <div className="lf init">
                        <Space direction="vertical">
                            <Input.Password placeholder="请再次输入您的密码" onChange= {(event) => {this.configpass(event)}}/>
                        </Space>
                    </div>
                </div>
                <p className="err-info">{this.state.configPassErr}</p>
            </div>
            <div className="forget-pass">
                <span></span>
            </div>
            <div className="footer-but but-active">
                <Button type="primary" onClick={this.resetpas}>确认</Button>
            </div>
        </div>
        )
    }
}
