import React, { Component } from 'react'
import { Form, Input, Button , Select, message } from 'antd';
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class Detail extends Component {
    state = {
       changeUserInfo : false,
       formInitValues :{},
       department : [],
       grouplist :[]
      }
      setUserInfo = values =>{
          console.log(values)
          if(values === "close"){
            this.setState({
                changeUserInfo : false
            })
          }else{
            this.setState({
                changeUserInfo : true
            })
          }
        //   if(!this.state.changeUserInfo){
        //     this.setState({
        //         changeUserInfo : true
        //     })
        //   }

      };
     onGenderChange = value => {
         console.log(value)
       };
       onFinish = values => {
         console.log('Success:', values);
       };
     
       onFinishFailed = errorInfo => {
         console.log('Failed:', errorInfo);
       };
       componentDidMount(){
           //人员详情
           this.get('u/v1/user/' + this.props.match.params.id + '/').then((res)=>{
                this.setState({
                    formInitValues : {
                        department :res.data.department,
                        email :res.data.email,
                        groups :res.data.groups,
                        name:res.data.name,
                        phone :res.data.phone,
                        post : res.data.post,
                        username :res.data.username,
                        id:res.data.id,
                    }
                },()=>{
                    console.log(this.state.formInitValues)
                })
           }).catch((err)=>{
                console.log(err)
           })
            //部门列表
           this.get('u/v1/alldepartment/').then((res)=>{
                this.setState({
                    department : res.data
                })
            }).catch((err)=>{
                console.log(err)
            })
            //权限列表
            this.get('u/v1/grouplist/').then((res)=>{
                this.setState({
                    grouplist : res.data
                })
            }).catch((err)=>{
                console.log(err)
            })
            

       }
       validateMessages = {
         required: '${label}不能为空',
         types: {
           email: '${label}不是一个有效的地址',
           number: '${label} is not a validate number!',
         },
       };
       //返回上一页
        golinkform = () =>{
            history.goBack();  //返回上一页这段代码
        }
    render() {
            const layout = {
                labelCol: {
                  span: 20,
                },
                wrapperCol: {
                  span: 16,
                },
              };
            const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
            };
            const onFinish = values => {
                console.log('Success:', values);
                
                this.put('u/v1/user/' + + this.props.match.params.id + '/',values).then((res)=>{
                    console.log(res)
                    if(res.data.msg === "success"){
                        message.success("修改成功")
                        history.goBack();  //返回上一页这段代码
                    }else if(res.data.error){
                        message.error(res.data.error)
                    }else{
                        message.error('修改失败')
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            };
            
            const onFinishFailed = errorInfo => {
                console.log('Failed:', errorInfo);
            };
        return (
            <div className="Staff-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                        <h2 className="tit-name lf">个人信息</h2>
                        <div className="link-name lf" onClick={this.golinkform}>
                            <span>{this.state.formInitValues.name}</span>
                            <img src={[require("../../../../assets/contentmenu/back.png")]} alt="" />
                        </div>
                    </div>  
                    <div className="DemandCreeate-cont-list">
                        <div className='Staff-fox'>
                            {
                                this.state.formInitValues.name ?
<Form
                                {...layout}
                                name="basic"
                                initialValues={this.state.formInitValues}
                                validateMessages={this.validateMessages}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="账号"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="联系电话"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '联系人不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>



                                <Form.Item
                                    label="邮箱地址"
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <div className="DemandCreate-tit-fax lf" style={{marginBottom:'20px'}}>
                                    <h2 className="tit-name lf">部门</h2>
                                </div>
                                <Form.Item
                                    label="部门"
                                    name="department"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                >
                                     <Select placeholder="请选择部门">
                                        {
                                            this.state.department.map(item=>{
                                                return (
                                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="职位"
                                    name="post"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                           
                                <div className="DemandCreate-tit-fax lf" style={{marginBottom:'20px'}}>
                                    <h2 className="tit-name lf">权限</h2>
                                </div>
                                    
                                <Form.Item
                                    label="权限"
                                    name="groups"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                            type: 'array'
                                        },
                                    ]}
                                >
                                        <Select mode="multiple" placeholder="可选择一个或者多个权限">
                                        {
                                            this.state.grouplist.map(item=>{
                                                return(
                                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <div className="DemandCreate-tit-fax lf" style={{marginBottom:'20px'}}>
                                    <h2 className="tit-name lf">密码设置</h2>
                                </div>
                                    
                                <Form.Item
                                    label="密码"
                                    name="password"
                                >
                                    <Input />
                                </Form.Item>
                                       
                                        
                                       
                                
                               
                                    
                                   


                                
                               
                                

                               
                                
                                {/* <Form.Item {...tailLayout}>
                                    {
                                        this.state.changeUserInfo ? 
                                            <Button 
                                                type="primary" 
                                                htmlType='submit'
                                            >
                                            保存
                                            </Button>
                                            :
                                            <Button 
                                                type="primary" 
                                                onClick={this.setUserInfo.bind(this,'change')}
                                            >
                                            编辑
                                            </Button>
                                    }
                                  <Button type="primary" onClick={this.setUserInfo.bind(this,'close')}>
                                      取消
                                  </Button>
                              </Form.Item> */}
                                <Form.Item {...tailLayout}>
                                    <Button 
                                        type="primary" 
                                        htmlType='submit'
                                    >
                                    保存
                                    </Button>
                                    <Button type="primary" onClick={this.setUserInfo.bind(this,'close')}>
                                        取消
                                    </Button>
                                </Form.Item>
                            </Form>
                        
                                :
                                null
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
