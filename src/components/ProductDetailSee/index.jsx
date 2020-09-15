import React, { Component } from 'react'
import { Form, Input, Button , Select , Space ,message, Modal} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

const { Option } = Select;

export default class index extends Component {
  formFis = React.createRef()
  constructor(props){
    super(props)
    this.state = {
      sumShow : {
        status : true,
        name :'我的清单',
      },
      marketlist :[],
      proDetail :props.formInitValues,
      visible : false,
      datalist : [],
      departmentlist :[],
      selectIndex : null,
      initdata : []
    }
  }

    //重新分配弹窗
    initp = () =>{
      console.log(this.props)
      this.setState({
        visible: true,
      });
    }

    //生成成本
    createpro = () =>{
      this.put("p/v1/create_cost/" + this.state.proDetail.id + '/').then((res)=>{
        if(res.data.error){
          message.error(res.data.error)
        }else if(res.data.msg){
          message.success('生成成功')
        }else{
          message.error('请求失败')
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    closepro = () =>{
      console.log(this.state.proDetail.status)
      if(this.state.proDetail.status == 4 || this.state.proDetail.status == 5){
        this.put("p/v1/charge/" + this.state.proDetail.id + '/',{status:0}).then((res)=>{
          if(res.data.error){
            message.error(res.data.error)
          }else if(res.data.msg){
            message.success('成功关闭')
            history.goBack();  //返回上一页这段代码
          }else{
            message.error('请求失败')
          }
        }).catch((err)=>{
          console.log(err)
        })
      }else if(this.state.proDetail.status == 0){
        this.put("p/v1/charge/" + this.state.proDetail.id + '/',{status:4}).then((res)=>{
          if(res.data.error){
            message.error(res.data.error)
          }else if(res.data.msg){
            message.success('成功激活')
            history.goBack();  //返回上一页这段代码
          }else{
            message.error('请求失败')
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
    //重新分配确定
    PonFinish = val =>{
      console.log(val)
      if(this.state.selectIndex === null){
        message.error("请选择负责人");
        return
      }
      var arr = [];
      
      for(var i in val.users){
        var obj
        if(this.state.selectIndex == i){
          obj = {
            id : val.users[i].id ? val.users[i].id : 0,
            user : val.users[i].department,
            is_manage : true
          }
        }else{
          obj = {
            id : val.users[i].id ? val.users[i].id : 0,
            user : val.users[i].department,
            is_manage : false
          }
        }
        arr.push(obj)
      }
        this.put('p/v1/change_users/' + this.state.proDetail.id + '/', {project_users :arr}).then((res)=>{
          console.log(res)
          if(res.data.error){
            message.error(res.data.error)
          }else if(res.data.msg){
            message.success('保存成功')
            this.setState({
              visible: false,
            });
          }else{
            message.error('请求失败')
          }
        }).catch((err)=>{
          console.log(err)
        })
    }

    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };


    //获取所有部门列表  获取项目分配人员列表
    departMentList = () =>{
      this.get('u/v1/departmentlist/').then((res)=>{
        console.log(res)
        this.setState({
          departmentlist : res.data
        },()=>{
          this.get('p/v1/change_users/' + this.state.proDetail.id + '/').then((res)=>{
            if(res.data.project_users){
              var arr = [];
              for(var i in res.data.project_users){
                var obj = {
                  id : res.data.project_users[i].id,
                  user : res.data.project_users[i].user.department.id,
                  department : res.data.project_users[i].user.id
                }
                if(res.data.project_users[i].is_manage === true){
                  this.setState({
                    selectIndex : i
                  },()=>{
                    console.log(this.state.selectIndex)
                  })
                }
                //选择部门  显示人员
                this.selectPer(res.data.project_users[i].user.department.id,i)
                arr.push(obj)
              }
              this.setState({
                initdata : arr
              },()=>{
                console.log(this.state.initdata)
              })
            }
          }).catch((err)=>{
            console.log(err)
          })
        })
      }).catch((err)=>{
        console.log(err)
      })

     

    }

    //选择部门回调
    selectPer = (e,value) => {
      for(var i in this.state.departmentlist){
        if(this.state.departmentlist[i].id === e){
          var arr = this.state.datalist;
          arr[value] = this.state.departmentlist[i].department_users
          this.setState({
            datalist : arr
          },()=>{
            console.log(this.state.datalist)
          })
        }
      }
    }

    //选择负责人
    selectFu = (e,value) =>{
      this.setState({
        selectIndex : value
      })
    }
    getdadadada = () =>{
      this.put('p/v1/myproject/' + this.props.proid + '/').then((res)=>{
        console.log(res)
        if(res.data.msg === "success"){
          this.setState({
            proDetail :{
              ...this.state.proDetail,
              status_ : "进行中"
            }
          },()=>{
            this.formFis.current.setFieldsValue({
              status_: "进行中",
            })
            message.success('项目已开始');
          })

          
        }else{
          message.error(res.data.error);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }


    //项目重新开始
    removtstart = () =>{
      this.put('p/v1/pfinish/' + this.props.proid + '/',{status : 2}).then((res)=>{
        console.log(res)
        if(res.data.msg === "success"){
          this.setState({
            proDetail :{
              ...this.state.proDetail,
              status_ : "进行中"
            }
            
          },()=>{
            this.formFis.current.setFieldsValue({
              status_: "进行中",
            })
            message.success('项目已开始');
          })
        }else{
          message.error(res.data.error);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }

    //项目完成
    overPro = () => {
      this.put('p/v1/pfinish/' + this.props.proid + '/',{status : 3}).then((res)=>{
        console.log(res)
        if(res.data.msg === "success"){
          this.setState({
            proDetail :{
              ...this.state.proDetail,
              status_ : "已完成"
            }
          },()=>{
            this.formFis.current.setFieldsValue({
              status_: "已完成",
            })
            message.success('项目已完成');
          })
        }else{
          message.error(res.data.error);
        }
      }).catch((err)=>{
        console.log(err)
      })
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
     //获取人员列表(销售)
     getusers = () =>{
      this.get('u/v1/all_users/').then((res)=>{
        console.log(res)
        this.setState({
          marketlist : res.data
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    componentDidMount(){
      this.getusers();
      this.departMentList()
    
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
              
                console.log(this.state.proDetail)

        return (
            <div className='fox'>
              {/* {this.state.proDetail.category} */}
              <Form
                {...layout}
                name="basic"
                initialValues={this.state.proDetail}
                validateMessages={this.validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formFis}
              >
                <Form.Item
                  label="项目编号"
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
                  label="项目状态"
                  name="status_"
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
                  name="category" 
                  label="项目类型" 
                  rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={this.onGenderChange}
                        allowClear
                    >
                        <Option value="1">软件项目</Option>
                        <Option value="2">软硬件项目</Option>
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
                  name="email"
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
                  name="sell_phone"
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
                      required: true,
                      type: 'email',  
                    },
                  ]}
                >
                  <Input />
                </Form.Item>


                <Form.Item
                  label="需求介绍"
                  name="info"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>



                  {
                      this.props.Butt.name === '指派到我' 
                        ? 
                            <Form.Item {...tailLayout}>
                              {
                                this.state.proDetail.status_ === "未开始" ?
                                  <Button type="primary" onClick={this.getdadadada}>
                                      开始
                                  </Button>
                                  :
                                  this.state.proDetail.status_ === "已完成" ?
                                  <Button type="primary" onClick={this.removtstart}>重新开始</Button>
                                  :
                                  <>
                                    <Button type="primary" >
                                      <Link to={'/menu/product/ProductMy/bordercollie/' + this.props.proid}>新增/编辑</Link>
                                    </Button>
                                    <Button 
                                    type="primary" 
                                    style={this.props.Butt.status === true ?{background: '#4662f0'} : {background:'rgba(153, 153, 153, 1)'}} 
                                    disabled={this.props.Butt.status === true ?'' : 'disabled'}
                                    onClick={this.overPro}>
                                        完成
                                    </Button>
                                  </>
                              }
                                
                               
                              
                                
                            </Form.Item>
                        :
                        this.props.Butt.name === '负责项目' 
                        ? 
                            <Form.Item {...tailLayout}>
                                <Button type="primary" onClick={this.initp}>
                                    重新分配
                                </Button>
                                <Button type="primary" onClick={this.createpro}>
                                    生成成本
                                </Button>
                                <Button type="primary" onClick={this.closepro}>{this.state.proDetail.status == 0 ? '激活' : '关闭'}</Button>
                            </Form.Item>
                        :
                        this.props.Butt.name === '我的清单' 
                        ? 
                            <Form.Item {...tailLayout}>
                                <Button type="primary">
                                    编辑
                                </Button>
                                <Button type="primary">
                                    生成报价单
                                </Button>
                                
                            </Form.Item>
                        :
                            null
                  }
                 

                 
              </Form>
              <Modal
                title="需求分配"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                className="fenpei"
                width={580}
                >
                   <Form 
                   name="dynamic_form_nest_item" 
                   initialValues={{users : this.state.initdata}} 
                   onFinish={this.PonFinish} 
                   autoComplete="off">
                    <Form.List name="users">
                        {(yjlist, { add, remove, }) => {
                            console.log(yjlist)
                            return (
                                <div>
                                    {
                                    yjlist.map((field, index) => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                            <Form.Item
                                                {...field}
                                                className="type"
                                                label="部门"
                                                name={[field.name, 'user']}
                                                fieldKey={[field.fieldKey, 'user']}
                                                rules={[{ required: true, message: '部门不能为空' }]}
                                            >
                                                <Select
                                                    placeholder="选择部门"
                                                    allowClear
                                                    onChange={(e) => this.selectPer(e,index)}
                                                >
                                                  {
                                                    (this.state.departmentlist || []).map(item =>{
                                                      return(
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                      )
                                                    })
                                                  }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                className="quantiyty"
                                                {...field}
                                                label="人员"
                                                name={[field.name, 'department']}
                                                fieldKey={[field.fieldKey, 'department']}
                                                rules={[{ required: true, message: '人员不能为空' }]}
                                            >
                                                <Select
                                                    placeholder="选择人员"
                                                    allowClear
                                                >
                                                  {
                                                    (this.state.datalist[index] || []).map(item =>{
                                                      return(
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                      )
                                                    })
                                                  }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item>
                                              <div className="" className={this.state.selectIndex == index ? 'active fu-user-but' : 'fu-user-but'} onClick={(e) =>this.selectFu(e,index)}>
                                                <span>负责人</span>
                                              </div>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={(e) => {
                                                  if(this.state.selectIndex === index){
                                                    this.setState({
                                                      selectIndex : null
                                                    })
                                                  }else{
                                                    if(this.state.selectIndex > index){
                                                      var a = this.state.selectIndex-1;
                                                      this.setState({
                                                        selectIndex : a
                                                      })
                                                    }
                                                  }
                                                  console.log(index);
                                                  var arr = this.state.datalist
                                                  arr = arr.splice(index,1);
                                                  
                                                  this.setState({
                                                    datalist :arr
                                                  },()=>{
                                                    remove(field.name);
                                                  })
                                                }}
                                            />
                                        </Space>
                                    ))}

                                    <Form.Item>
                                        {/* <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            block
                                        >
                                            <PlusOutlined /> Add field
                                        </Button> */}

                                        <div>
                                            <Button  
                                                type="primary"
                                                onClick={() => {
                                                  var arr = this.state.datalist;
                                                  arr.push([])
                                                  this.setState({
                                                    datalist : arr
                                                  },()=>{
                                                    add();
                                                  })
                                                }}
                                            >新增
                                            </Button>
                                            <Button type="primary" htmlType="submit">保存</Button>
                                        </div>
                                    </Form.Item>
                                    
                                </div>
                            );
                        }}
                    </Form.List>
                  </Form>
              </Modal>
            </div>

        )
    }
}

