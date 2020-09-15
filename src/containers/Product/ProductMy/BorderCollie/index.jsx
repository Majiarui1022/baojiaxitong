import React, { Component } from 'react'

import {Input , Select , Button , message , Form , Space} from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons';

import './index.scss'

import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class BorderCollie extends Component {
    state = {
        datas :[]
    }
    handleChange(value) {
        console.log(`selected ${value}`);
      }
      getdata = () =>{
          console.log(this.props)
          this.get('p/v1/design/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            this.setState({
                datas : res.data.designs
            })
          }).catch((err)=>{
            console.log(err)
          })
      }
      golinkform = () =>{
        history.goBack();  //返回上一页这段代码
      }
      componentDidMount(){
          this.getdata()
      }
    render() {
        const Demo = () => {
            const onFinish = values => {
                console.log('Received values of form:', values);
                this.put('p/v1/design/' + this.props.match.params.id + '/',{designs :values.users}).then((res)=>{
                    console.log(res)
                    if(res.data.error){
                        message.error(res.data.error);
                    }else if(res.data.msg === "success"){
                        message.success('保存成功');
                        history.goBack();  //返回上一页这段代码
                    }else{
                        message.error('请求错误');
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            };
            return (
                <Form name="dynamic_form_nest_item" initialValues={{users:this.state.datas}} onFinish={onFinish} autoComplete="off">
                    <Form.List name="users">
                        {(yjlist, { add, remove, }) => {
                            console.log(yjlist)
                            return (
                                <div>
                                    {yjlist.map((field, index) => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                            <span className="num">{index + 1}</span>


                                            <Form.Item
                                                {...field}
                                                className="content"
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={[{ required: true, message: '内容不能为空' }]}
                                            >
                                                <Input placeholder="请输入内容" />
                                            </Form.Item>

                                            
                                            <Form.Item
                                                {...field}
                                                className="type"
                                                name={[field.name, 'category']}
                                                fieldKey={[field.fieldKey, 'category']}
                                                rules={[{ required: true, message: '类型不能为空' }]}
                                            >
                                                <Select
                                                    placeholder="请选择类型"
                                                    allowClear
                                                >
                                                    <Option value={2}>软件项目</Option>
                                                    <Option value={1}>硬件项目</Option>
                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={(e) => {
                                                    console.log(e)
                                                    remove(field.name);
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

                                        <div className="close-fat-but">
                                            <Button  
                                                type="primary"
                                                onClick={() => {
                                                    add();
                                                }}
                                                block
                                            >新增
                                            </Button>
                                            <Button  type="primary" htmlType="submit">保存</Button>
                                        </div>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                </Form>
            );
        };
        return (
            <div className="BorderCollie-fat-fox">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">软硬件信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span></span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">

                            <div className="tab">
                                <div className="th">
                                    <div className="td num"></div>
                                    <div className="td content">内容</div>
                                    <div className="td type">类型</div>
                                </div>
                                <div className="tr">
                                    <Demo/>
                                </div>
                            </div>


                            
                        </div>
                </div>
            </div>
       
       )
    }
}
