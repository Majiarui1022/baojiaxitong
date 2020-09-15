import React, { Component } from 'react'
import { Form, Input, Button , Select,Modal, message} from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'

import CompileTab from '../CompileTab'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
const { TextArea } = Input;

export default class DetailForm extends Component {
      constructor (){
        super()
        this.state = {
            sumShow : {
                status : true,
                name :'我的清单'
              },
              changeValues : true,
              formInitValues :{},
              visible: false,
              perstatus : false,
              initTextarea : {
                notong :''
              },
              auditUsers : [],
              marketlist : []
        }
    }
     //报价单下载
     onLoadpdf = () =>{
       console.log(this.props)
       this.get("p/v1/pdf/" + this.props.FatProp.match.params.id +'/').then((res)=>{
        console.log(res)
        if(res.status === 200){ if(res.status == 200){
          window.open(res.config.url); 
        }
        }else if(res.data.error){
          message.error(res.data.error)
        }else{
          message.error('下载失败')
        }
       }).catch((err)=>{
        console.log(err)
       })
     }
     showper = () =>{

      let obj = {
        status : 9,
        cause  : ''
      }
      this.put("p/v1/price/" + this.state.formInitValues.id + '/' , obj).then((res)=>{
         console.log(res)

         if(res.data.msg === "success"){
           message.success("操作成功");
           history.goBack();  //返回上一页这段代码
         }else{
           message.success(res.data.error)
         }
      }).catch((err)=>{
         console.log(err)
      })
     }
     

    showModal = () =>{
      this.setState({
        visible: true,
      })
    }
    closeModal = () =>{
      this.setState({
        visible: false,
        perstatus : false
      })
    }
      onSetChange = () =>{
        console.log(this.props)
        this.props.FatProp.history.push('/menu/inventory/my/Detailset/' + this.props.detail.id);

      }

     onGenderChange = value => {
         console.log(value)
       };
       onFinish = values => {
         console.log('Success:', values);
       };
     
       onFinishFailed = errorInfo => {
         console.log('Failed:', errorInfo);
       };
       validateMessages = {
         required: '${label}不能为空',
         types: {
           email: '${label}不是一个有效的地址',
           number: '${label} is not a validate number!',
         },
       };


       //未通过提交
       textonChange = val =>{
         console.log(val)
         console.log(this.state.formInitValues.status)
         let obj = {
           status : 8,
           cause  : val.notong
         }
         this.put("p/v1/price/" + this.state.formInitValues.id + '/' , obj).then((res)=>{
            console.log(res)

            if(res.data.msg === "success"){
              message.success("操作成功");
              history.goBack();  //返回上一页这段代码
            }else{
              message.error(res.data.error)
            }
         }).catch((err)=>{
            console.log(err)
         })
       }

       //通过提交
       sucper = val =>{
         console.log(val)
         console.log(this.state.formInitValues.status)
         let obj = {
           user  : val.notong,
           project : this.state.formInitValues.id
         }
         this.post("p/v1/create_price/",obj).then((res)=>{
            console.log(res);
            
            if(res.data.msg === "success"){
              this.setState({
                perstatus : false
              },()=>{
                message.success("提交成功");
                history.goBack();  //返回上一页这段代码
              })
            }else if(res.data.error){
              message.error(res.data.error)
            }else{
              message.error('提交失败')
            }

         }).catch((err)=>{
           console.log(err)
         })
       }
       createbao = () =>{
        this.setState({
          perstatus : true
         })
       }
       componentWillReceiveProps(data){
         console.log(data)
         this.setState({
          formInitValues : data.detail
         })
       }
       componentDidMount(){
         this.get("u/v1/audit_users/").then((res)=>{
            this.setState({
              auditUsers : res.data
            })
         }).catch((err)=>{
            console.log(err)
         })

           //获取人员列表(销售)
            this.get('u/v1/all_users/').then((res)=>{
              console.log(res)
              this.setState({
                marketlist : res.data
              })
            }).catch((err)=>{
              console.log(err)
            })
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
                  };
                
                  const onFinishFailed = errorInfo => {
                    console.log('Failed:', errorInfo);
                  };
                
              const Demo = () =>{
                return(
                  <Form
                  {...layout}
                  name="basic"
                  initialValues={this.state.formInitValues}
                  validateMessages={this.validateMessages}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >

                  <Form.Item
                    label="成本编号"
                    name="xm_code"
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
                    label="负责人"
                    name="principal"
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
                  >
                </Form.Item>
  
              <Form.Item  name="category" label="项目类型" rules={[{ required: true }]}>
                  <Select
                      placeholder="Select a option and change input text above"
                      onChange={this.onGenderChange}
                      allowClear
                  >
                  </Select>
              </Form.Item>

                    
              


                  <Form.Item
                    label="项目名称"
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
                    label="客户名称"
                    name="client"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item
                    label="联系人"
                    name="linkman"
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
                    label="联系电话"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: '联系电话不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
  
                  <Form.Item
                    label="邮箱地址"
                    name="sell_email"
                    rules={[
                      {
                        type: 'email',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
  
  
                  <Form.Item name="sell_linkman" label="销售" rules={[{ required: true }]}>
                      <Select
                          placeholder="Select a option and change input text above"
                          onChange={this.onGenderChange}
                          allowClear
                      >
                          {
                          this.state.marketlist.map(item =>{
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                  </Form.Item>
  
                  
                  <Form.Item
                    label="联系电话"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: '联系电话不能为空',
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
  
  
                  <Form.Item
                    label="交货期"
                    name="delivery"
                    rules={[
                      {
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="保质期"
                    name="warranty"
                    rules={[
                      {
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="有效期"
                    name="indate"
                    rules={[
                      {
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                    
                  <Form.Item>
                  </Form.Item>
               
                    {
                        this.props.Butt.name === '指派到我' 
                          ? 
                              <Form.Item {...tailLayout}>
                                  <Button type="primary">
                                      开始
                                  </Button>
                                  <Button type="primary">新增/编辑</Button>
                                  <Button 
                                  type="primary" 
                                  style={this.props.Butt.status === true ?{background: '#4662f0'} : {background:'rgba(153, 153, 153, 1)'}} 
                                  disabled={this.props.Butt.status === true ?'' : 'disabled'}>
                                      完成
                                  </Button>
                                  
                              </Form.Item>
                          :
                          this.props.Butt.name === '负责项目' 
                          ? 
                              <Form.Item {...tailLayout}>
                                  <Button type="primary">
                                      重新分配
                                  </Button>
                                  <Button type="primary">
                                      生成成本
                                  </Button>
                                  <Button type="primary">
                                      关闭
                                  </Button>
                                  
                              </Form.Item>
                          :
                          this.props.Butt.name === '我的清单' 
                          ? 
                              <Form.Item {...tailLayout}>
                                  <Button type="primary" onClick={this.onSetChange.bind(this)}>
                                      <Link>编辑</Link>
                                  </Button>
                                  <Button type="primary" onClick={this.createbao}>
                                      生成报价单
                                  </Button>
                                  
                              </Form.Item>
                          :

                          this.props.Butt.name === '待审核报价单' 
                          ? 
                          <Form.Item {...tailLayout}>
                              <Button type="primary" onClick={this.showper}>
                                  通过
                              </Button>
                              <Button type="primary" onClick={this.showModal}>
                                  未通过
                              </Button>
                              
                          </Form.Item>
                          :
                          this.props.Butt.name === '报价单' 
                          ? 
                          <Form.Item {...tailLayout}>
                              <Button type="primary" onClick={this.onLoadpdf}>
                                  下载
                              </Button>
                          </Form.Item>
                          :
                              null
                    }
                </Form>
              
                )
              }
          return (
              <div className='fox'>
                <Demo />
                <CompileTab propsfat = {this.props}  values = {this.state.formInitValues} ShowSum = {this.state.sumShow} SetVal = {this.state.changeValues}></CompileTab>
  
                <Modal
                  title="未通过原因"
                  wrapClassName="noprofat"
                  visible={this.state.visible}
                  footer={null}
                  onCancel={this.closeModal}
                >
                 <Form
                   {...layout}
                   name="asdasd"
                   initialValues={this.state.initTextarea}
                   validateMessages={this.validateMessages}
                   onFinish={this.textonChange}
                   onFinishFailed={onFinishFailed}
                  >
                    <Form.Item 
                      name="notong"
                      rules={[
                        {
                          required: true,
                          message : '未通过原因不能为空'
                        },
                      ]}
                    >
                      <TextArea placeholder="请输入未通过原因"/>
  
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        提交
                      </Button>
                    </Form.Item>
                 </Form>
                </Modal>


                <Modal
                  title="提交审核"
                  wrapClassName="noprofat"
                  visible={this.state.perstatus}
                  footer={null}
                  onCancel={this.closeModal}
                >
                 <Form
                   {...layout}
                   name="asdasd"
                   validateMessages={this.validateMessages}
                   onFinish={this.sucper}
                   onFinishFailed={onFinishFailed}
                  >
                    <Form.Item 
                      name="notong"
                      label="人员："
                      rules={[
                        {
                          required: true,
                          message : '审核人员不能为空'
                        },
                      ]}
                    >
                      <Select>
                        {
                          this.state.auditUsers.map(item=>{
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
  
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        提交
                      </Button>
                      <Button onClick={this.closeModal} type="primary">
                        取消
                      </Button>
                    </Form.Item>
                 </Form>
                </Modal>
              </div>
          )
      }
}
