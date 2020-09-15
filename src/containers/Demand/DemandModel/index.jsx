import React, { Component } from 'react'
import { Form, Input, Button , Select ,Modal , message} from 'antd';
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

const { Option } = Select;

export default class DemandModel extends Component {
    createFormRef = React.createRef();
    state = { 
      visible: false,
      
      //表单默认值
      formInitValues : {
        category : "",
        name : '',
        client : '',
        linkman : '',
        phone : '',
        email : '',
        sell_linkman : '',
        sell_phone : '',
        sell_email : '',
        info : ''
      },

      marketlist :[]

    };

    
    
     
    
   
      linkmanchange = value =>{
        this.createFormRef.current.setFieldsValue({
            sell_linkman: value,
        })

        for(var i in this.state.marketlist){
          if(this.state.marketlist[i].id == value){
            this.createFormRef.current.setFieldsValue({
              sell_phone : this.state.marketlist[i].phone,
              sell_email : this.state.marketlist[i].email
            })
          }
        }
      }


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

      //新增需求
      createDemand = value =>{
        console.log(value);
        this.post('p/v1/need/',value).then((res)=>{
          console.log(res)
          if(res.data.msg === "success"){
            message.success('新增成功');
            history.goBack();  //返回上一页这段代码
          }else if(res.data.error){
            message.error(res.data.error);
          }else{
            message.error('操作失败');
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
      componentDidMount(){
        this.getusers()
      }
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

          const Demo = () => {
            const onFinish = values => {
              console.log('Success:', values);
              this.createDemand(values)
            };
          
            const onFinishFailed = errorInfo => {
              console.log('Failed:', errorInfo);
            };
          
            return (
              <Form
                {...layout}
                name="basic"
                ref={this.createFormRef}
                initialValues={this.state.formInitValues}
                validateMessages={this.validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >

            <Form.Item  name="category" label="项目类型" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value={2}>软件项目</Option>
                    <Option value={1}>软硬件项目</Option>
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
                        onChange={this.linkmanchange}
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

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            );
          };
        return (
            <div className="form-list-cont">
                <div className="DemandCreate-tit-fax">
                        <h2 className="tit-name lf">新增需求</h2>
                        <div className="link-name lf" onClick={this.golinkform}>
                            <span></span>
                            <img src={[require("../../../assets/contentmenu/back.png")]} alt=""/>
                        </div>
                    </div>
                    <div className="DemandCreeate-cont-list">
                        <Demo />
                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            title="需求分配"
                            footer={null}
                            className="modal-fat-fox"
                            >
                             <Form 
                                validateMessages={this.validateMessages}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}>
                                <Form.Item name="shou" label="部门" rules={[{ required: true }]}>
                                    <Select
                                        onChange={this.onGenderChange}
                                        allowClear
                                    >
                                        <Option value="1">销售人员一</Option>
                                        <Option value="2">销售人员二</Option>
                                        <Option value="3">销售人员三</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="shou" label="人员" rules={[{ required: true }]}>
                                    <Select
                                        onChange={this.onGenderChange}
                                        allowClear
                                    >
                                        <Option value="1">销售人员一</Option>
                                        <Option value="2">销售人员二</Option>
                                        <Option value="3">销售人员三</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Button style={{float:"right"}} type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                            </Modal>

                            <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            title="项目关闭"
                            footer={null}
                            className="modal-fat-fox"
                            >
                             <Form 
                                validateMessages={this.validateMessages}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}>
                                <Form.Item name="关闭原因" label="关闭原因" rules={[{ required: true }]}>
                                    <Input.TextArea />
                                </Form.Item>
                           
                                <Form.Item>
                                    <Button style={{float:"right"}} type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                            </Modal>
                    </div>
            </div>
        )
    }
}
