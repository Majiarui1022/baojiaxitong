import React, { Component } from 'react'
import { Input, Space , Button } from 'antd';

import './index.scss'
export default class ForgetPass extends Component {
    
   
    state = {
        emailErr:'',
        codeErr:'',
        emailDetail :'',
        codeDetail :'',
        codeid : '',
        timer : null,
        countdowntimer : null
    }
    getcode = () =>{
        if(this.EMAILCONFIG(this.state.emailDetail) == 1 && !this.state.timer){
            this.postRequestBody('u/v1/email/',{email:this.state.emailDetail}).then((res)=>{
                if(res.data.error){
                    this.setState({
                        emailErr : res.data.error
                    })
                }else if(res.data.msg == "success"){
                    this.setState({
                        codeid :res.data.codeid,
                        timer : 59
                    })

                    this.countdowntimer = setInterval(()=>{
                        this.CountDown()
                    },1000)
                }
              }).catch((err)=>{
                console.log(err)
              })
        }
    }
    sendcode = () =>{
        if(this.state.codeDetail == ''){
            this.setState({
                codeErr : '验证码不能为空'
            })
            return
        }
        this.put('u/v1/email/' + this.state.codeid + '/',{code:this.state.codeDetail}).then((res)=>{
            if(res.data.error){
                this.setState({
                    codeErr : res.data.error
                })
            }else if(res.data.msg == "success"){
                this.props.history.push({pathname : '/user/resetpass/' + this.state.codeid})
            }
          }).catch((err)=>{
            console.log(err)
          })
    }
    CountDown = () =>{
            if(this.state.timer > 1){
                this.setState({
                    timer : this.state.timer - 1
                },()=>{
                    console.log(this.state.timer)
                })
            }else{
                this.setState({
                    timer : undefined
                })
                clearInterval(this.countdowntimer)
            }
    }
    changeEmail = (e) =>{
        this.setState({
            emailDetail : e.target.value
        },()=>{
            if(this.EMAILCONFIG(this.state.emailDetail) == 2){
                this.setState({
                    emailErr : '邮箱格式错误'
                })
            }else if(this.EMAILCONFIG(this.state.emailDetail) == 3){
                this.setState({
                    emailErr : '邮箱格式不能为空'
                })
            }else{
                this.setState({
                    emailErr : ''
                })
            }
        })
    }

    changeCode = (e) =>{
        this.setState({
            codeDetail : e.target.value
        })
    }
    /**
     * 邮箱验证
     * 		val : string
     *		1   输入正确
     * 		2	输入错误
     * 		3   输入空值
    */
    EMAILCONFIG = (val) =>{
        if(val == '' || val == null || val == undefined) return 3
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(reg.test(val)){
            return 1;
        }else{
            return 2;
        }
    }
    componentWillUnmount(){
        clearInterval(this.countdowntimer)
    }
    render() {
        return (
            <div className="user-forgetpass-fat">
            <div className="forgetpass-tit">
                <span className="label-name">忘记密码</span>
            </div>
            <div className="sendSuc">
                {
                    this.state.codeid ?
                    <span>验证码已发送至{this.state.emailDetail}</span>
                    :
                    null
                }
                </div>
            <div className="user-info">
                <div className="user-email user-cord">
                    <div className="user-icn lf">
                        <img src={[require("../../../assets/login/user.png")]} alt="" />
                    </div>
                    <div className="lf init">
                        <Space direction="vertical">
                            <Input placeholder="请输入您的邮箱" onChange={(event)=>{this.changeEmail(event)}}/>
                        </Space>
                    </div>
                </div>
                <p className="err-info">{this.state.emailErr}</p>
                <div className="user-email user-cord user-pass">
                    <div className="user-icn lf">
                        <img src={[require("../../../assets/login/code.png")]} alt="" />
                    </div>
                    <div className="lf init">
                        <Space direction="vertical">
                            <Input placeholder="请输入验证码" onChange={(event)=>{this.changeCode(event)}}/>
                        </Space>
                    </div>
                    <div className="lf getCode but-active" onClick={this.getcode}>
                        {this.state.timer === null ? '发送验证码' : this.state.timer === undefined ? '重新发送' : this.state.timer > 9 ? '重新发送' + this.state.timer : '重新发送0' + this.state.timer}
                    </div>
                </div>
                <p className="err-info">{this.state.codeErr}</p>
            </div>
            <div className="forget-pass">
                <span></span>
            </div>
            <div className="footer-but but-active">
                <Button type="primary" onClick={this.sendcode}>下一步</Button>
            </div>
        </div>
        )
    }
}
