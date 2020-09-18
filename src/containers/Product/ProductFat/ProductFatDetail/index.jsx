import React, { Component } from 'react'
import { Form, Input, Button, Select, Modal ,message,Space} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import './index.scss'
import History from '../../../../components/History'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
import DemandModel from '../../../Demand/DemandModel'
const history = creatHistory();//返回上一页这段代码

const { Option } = Select;


export default class ProductFatDetail extends Component {
  state = {
    visible: false,
    closeProduct: false,
    productTui: false,
    historylist: [],
    //表单默认值 
    formInitValues : {
      "id": '',
      "xm_code": "", //项目标号
      "name": "", //项目名称
      "status": "", //状态
      "category": "",
      "client": "", //客户
      "linkman": "", //联系人
      "phone": "", //联系人电话
      "email": "", //联系人邮箱
      "sell_linkman": "", //销售
      "sell_phone": "", //电话
      "sell_email": "", //邮箱
      "info": "",// 介绍
    },
    datalist : [],
    departmentlist :[],
    selectIndex : null,
  };


  //选择部门回调
  selectPer = (e,value) => {
    console.log(e,value);
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

   //获取所有部门列表  获取项目分配人员列表
   departMentList = () =>{
    this.get('u/v1/departmentlist/').then((res)=>{
      console.log(res)
      this.setState({
        departmentlist : res.data
      })
    }).catch((err)=>{
      console.log(err)
    })

  }
  //选择负责人
  selectFu = (e,value) =>{
    this.setState({
      selectIndex : value
    })
  }

  onGenderChange = value => {
    console.log(value)
  };


  //选择部门回调
  handleChange = value => {
    console.log(value)
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  shoCloseProduct = () => {
    this.setState({
      closeProduct: true,
    });
  };

  showProductTui = () => {
    this.setState({
      productTui: true,
    });
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
          user : val.users[i].department,
          is_manage : true
        }
      }else{
        obj = {
          user : val.users[i].department,
          is_manage : false
        }
      }
      arr.push(obj)
    }
      this.put('p/v1/allocation/' + this.state.formInitValues.id + '/', {manages :arr}).then((res)=>{
        console.log(res)
        if(res.data.error){
          message.error(res.data.error)
        }else if(res.data.msg){
          message.success('分配成功')
          history.goBack();  //返回上一页这段代码
        }else{
          message.error('请求失败')
        }
      }).catch((err)=>{
        console.log(err)
      })
  }


  CloseFailProduct = () => {
    this.setState({
      closeProduct: false,
    });
  }




  //点击确定关闭弹窗
  closepro = e => {
    console.log(e);
    this.setState({
      closeProduct: false,
    });
  };

  //点击取消关闭需求分配弹窗
  closefp = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  //项目退回关闭
  closeproTui = e => {
    console.log(e);
    this.setState({
      productTui: false,
    });
  }

  onFinish = values => {
    console.log('Success:', values);
    let obj = {
      cause : values.removepro
    }
    if(values.removepro){
      this.put("p/v1/projectback/" + this.props.match.params.id + '/',obj).then((res)=>{
        console.log(res)
        if(res.data.msg ==="success"){
          message.success('项目已退回');
          this.setState({
            productTui : false
          })
          history.goBack();  //返回上一页这段代码
        }else if(res.data.error){
          message.error(res.data.error);
        }else{
          message.error('请求失败');
        }
     
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      this.put("p/v1/projectclose/" + this.props.match.params.id + '/').then((res)=>{
        console.log(res)
        if(res.data.msg ==="success"){
          message.success('项目已关闭');
          this.setState({
            closeProduct : false
          })
        }else if(res.data.error){
          message.error(res.data.error);
        }else{
          message.error('请求失败');
        }
        
      }).catch((err)=>{
        console.log(err)
      })
    }
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
  //未指派项目详情
  getDetail = () => {
    console.log(this.props)
    this.get("p/v1/unproject/" + this.props.match.params.id + '/').then((res) => {
      this.setState({
        formInitValues : res.data
      })

    }).catch((err) => {
      console.log(err)
    })
    
    this.get("p/v1/history/?p=1&project=" + this.props.match.params.id).then((res) => {
      console.log(res)
      for(var i in res.data.results){
        res.data.results[i].key  = res.data.results[i].id
      }
      if(res.data.results.length < 5){
        this.setState({
          historylist : res.data.results
        })
      }else{
        this.setState({
          historylist : res.data.results.splice(0,6)
        })
      }
     
    }).catch((err) => {
      console.log(err)
    })

    
  }
  //返回上一页
  golinkform = () =>{
    history.goBack();  //返回上一页这段代码
  }
  componentWillMount() {
    this.getDetail();
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





    const Demo = () => {
      const onFinish = values => {
        console.log('Success:', values);
      };

      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

      return (
        <Form
          {...layout}
          name="basic"
          initialValues={this.state.formInitValues}
          validateMessages={this.validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            label="项目状态"
            name="status"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="category" label="项目类型" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.onGenderChange}
              allowClear
            >
              <Option value="1">male</Option>
              <Option value="2">female</Option>
              <Option value="3">other</Option>
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
              onChange={this.onGenderChange}
              allowClear
            >
              <Option value="1">销售人员一</Option>
              <Option value="2">销售人员二</Option>
              <Option value="3">销售人员三</Option>
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
            <Button type="primary" onClick={this.showModal}>
              分配
                  </Button>
            <Button type="primary" onClick={this.showProductTui}>
              退回
                  </Button>
            <Button type="primary" onClick={this.shoCloseProduct}>
              关闭
            </Button>
          </Form.Item>
        </Form>
      );
    };
    return (
      <div className="Product-My-Detail-fax">
        <div className="form-list-cont">
          <div className="DemandCreate-tit-fax">
            <h2 className="tit-name lf">项目信息</h2>
            <div className="link-name lf" onClick={this.golinkform}>
              <span>{this.state.formInitValues.name}</span>
              <img src={[require("../../../../assets/contentmenu/back.png")]} alt="" />
            </div>
          </div>
          <div className="DemandCreeate-cont-list">

            <DemandModel datailCategory={true} disSta={true}/>
            <Form>
              <Form.Item {...tailLayout}>
                <Button type="primary" onClick={this.showModal}>
                  分配
                      </Button>
                <Button type="primary" onClick={this.showProductTui}>
                  退回
                      </Button>
                <Button type="primary" onClick={this.shoCloseProduct}>
                  关闭
                </Button>
              </Form.Item>
            </Form>
            {/* <Demo /> */}
            <History quire={{status:true,id:this.props.match.params.id}} historylist={this.state.historylist}></History>



            <Modal
              title="项目分配"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
              className="fenpei"
              width={580}
            >
               <Form 
                   name="dynamic_form_nest_item" 
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

            <Modal
              title="Basic Modal"
              visible={this.state.closeProduct}
              title="项目关闭"
              footer={null}
              closable
              onCancel={this.closepro}
              className="modal-fat-fox"
            >
              <Form
                validateMessages={this.validateMessages}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}>
                <Form.Item name="closepro" rules={[{ required: true, message : '关闭原因不能为空' }]}>
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button style={{ float: "right" }} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
              </Form>
            </Modal>

            <Modal
              title="Basic Modal"
              visible={this.state.productTui}
              title="项目退回"
              footer={null}
              closable
              onCancel={this.closeproTui}
              className="modal-fat-fox"
            >
              <Form
                validateMessages={this.validateMessages}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}>
                <Form.Item name="removepro" rules={[{ required: true ,message :"退回原因不能为空"}]}>
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button style={{ float: "right" }} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}
