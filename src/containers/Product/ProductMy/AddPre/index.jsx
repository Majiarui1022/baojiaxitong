
import React, { Component } from 'react'

import { Input, Select, Button, Space, Form , message ,Upload ,InputNumber } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons';
import './index.scss'

import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

const { Option } = Select;
export default class AddPre extends Component {
    forma = React.createRef();
    state = {
        datas:{}
    }
    golinkform = () =>{
        history.goBack();  //返回上一页这段代码
    }
    //导出人力
    exportper = () =>{
        this.get('p/v1/manpower/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            if(res.status == 200){
                window.open(res.config.url); 
            }
       }).catch((err)=>{
            console.log(err)
       })
    }
    exportFile = () =>{
        this.get('p/v1/element/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            if(res.status == 200){
                window.open(res.config.url); 
            }
       }).catch((err)=>{
            console.log(err)
       })
    }
    getDetail= () =>{
       this.get('p/v1/details/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            this.setState({
                datas : res.data
                
            })
       }).catch((err)=>{
            console.log(err)
       })
    }
    componentDidMount(){
        this.getDetail()
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    
    render() {
        const _that = this
        const props = {
            name: 'file',
            action: 'http://192.168.0.26:8005/p/v1/element/',
            headers: {
                "Authorization" : 'JWT ' + (JSON.parse(sessionStorage.getItem('userinfo')).token)
            },
            onChange (info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                if(info.file.response.length > 0){
                    var arr = _that.forma.current.getFieldsValue('users').users;
                    arr = [...arr , ...info.file.response];
                    _that.forma.current.setFieldsValue({
                        users: arr,
                    })
                }
                
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };


          const propsPer = {
            name: 'file',
            action: 'http://192.168.0.26:8005/p/v1/manpower/',
            headers: {
                "Authorization" : 'JWT ' + (JSON.parse(sessionStorage.getItem('userinfo')).token)
            },
            onChange (info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                if(info.file.response.length > 0){
                    var arr = _that.forma.current.getFieldsValue('pass').pass;
                    arr = [...arr , ...info.file.response];
                    _that.forma.current.setFieldsValue({
                        pass: arr,
                    })
                }
                
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };



        const Demo = () => {
            const onFinish = values => {
                console.log('Received values of form:', values);
                var arr = [...values.pass , ...values.users];
                this.put('p/v1/details/' + this.props.match.params.id + '/',{details :arr}).then((res)=>{
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
                <Form 
                name="dynamic_form_nest_item" 
                ref={this.forma}
                initialValues={{users:this.state.datas.element,pass : this.state.datas.manpower}} 
                onFinish={onFinish} 
                autoComplete="off">
                    <Form.List name="users">
                        {(yjlist, { add, remove, }) => {
                            console.log(yjlist)
                            return (
                                <div>
                                    {
                                    yjlist.map((field, index) => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                            <span className="num">{index + 1}</span>

                                            <Form.Item
                                                {...field}
                                                className="type"
                                                name={[field.name, 'category']}
                                                fieldKey={[field.fieldKey, 'category']}
                                                rules={[{ required: true, message: '元件类型不能为空' }]}
                                            >
                                                <Select
                                                    allowClear
                                                >
                                                    <Option value={1}>标准元件</Option>
                                                    <Option value={2}>非标准元件</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                className="content"
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={[{ required: true, message: '部件名称不能为空' }]}
                                            >
                                                <Input maxLength="25" placeholder="最多输入25个字符"/>
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                className="brand"
                                                name={[field.name, 'brand']}
                                                fieldKey={[field.fieldKey, 'brand']}
                                                rules={[{ required: true, message: '品牌不能为空' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                className="specification"
                                                {...field}
                                                name={[field.name, 'size']}
                                                fieldKey={[field.fieldKey, 'size']}
                                                rules={[{ required: true, message: '规格不能为空' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                className="quantiyty"
                                                {...field}
                                                name={[field.name, 'num']}
                                                fieldKey={[field.fieldKey, 'num']}
                                                rules={[{ required: true, message: '数量不能为空' }]}
                                            >
                                                <InputNumber max={9999} precision={0}/>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={() => {
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
                                            >新增元件
                                            </Button>
                                            <Upload {...props}>
                                                <Button type="primary">导入元件</Button>
                                            </Upload>
                                            <Button type="primary" onClick={this.exportFile}>导出元件</Button>
                                        </div>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>

                    <div className="row-menu-tit">{this.state.datas.name}-人力</div>
                    <div className="tab">
                        <div className="th">
                            <div className="td num"></div>
                            <div className="td type">类型</div>
                            <div className="td faildcontent">内容</div>
                            <div className="td quantiyty">数量</div>
                        </div>
                        <Form.List name="pass">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                                <span className="num">{index + 1}</span>

                                                <Form.Item
                                                    {...field}
                                                    className="type"
                                                    name={[field.name, 'category']}
                                                    fieldKey={[field.fieldKey, 'category']}
                                                    rules={[{ required: true, message: '类型不能为空' }]}
                                                >
                                                    <Select
                                                        allowClear
                                                    >
                                                        <Option value={5}>软件系统</Option>
                                                        <Option value={6}>设计</Option>
                                                        <Option value={7}>其他</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    {...field}
                                                    className="faildcontent"
                                                    name={[field.name, 'name']}
                                                    fieldKey={[field.fieldKey, 'name']}
                                                    rules={[{ required: true, message: '内容不能为空' }]}
                                                >
                                                    <Input  maxLength="25" placeholder="最多输入25个字符"/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    className="quantiyty"
                                                    name={[field.name, 'num']}
                                                    fieldKey={[field.fieldKey, 'num']}
                                                    rules={[{ required: true, message: '数量不能为空' }]}
                                                >
                                                    <InputNumber max={9999}  precision={0}/>
                                                </Form.Item>
                                               
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </Space>
                                        ))}

                                        {/* <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                    console.log(this)
                                                }}
                                                block
                                            >
                                                <PlusOutlined /> Add field
                                            </Button>
                                        </Form.Item> */}
                                        <Form.Item>
                                            {/* <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button> */}
                                            <div className="close-fat-but">
                                                <Button type="primary" htmlType="submit">保存</Button>
                                                <Button 
                                                    type="primary"
                                                    onClick={() => {
                                                        add();
                                                        console.log(this)
                                                    }}
                                                    block
                                                >新增人力</Button>
                                                <Upload 
                                                    {...propsPer}
                                                >
                                                    <Button type="primary">导入人力</Button>
                                                </Upload>
                                                <Button type="primary" onClick={this.exportper}>导出人力</Button>
                                            </div>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>
                    </div>



                    

                    

                </Form>
            );
        };
        return (
            <div className="AddPre-fat-fox">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                        <h2 className="tit-name lf">软硬件信息</h2>
                        <div className="link-name lf" onClick={this.golinkform}>
                            <span></span>
                            <img src={[require("../../../../assets/contentmenu/back.png")]} alt="" />
                        </div>
                    </div>
                    <div className="DemandCreeate-cont-list">
                        <div className="DemandCreeate-scl">
                            <div className="row-menu-tit">{this.state.datas.name}-元件</div>
                            <div className="tab">
                                <div className="th">
                                    <div className="td num"></div>
                                    <div className="td type">元件类型</div>
                                    <div className="td content">部件名称</div>
                                    <div className="td brand">品牌</div>
                                    <div className="td specification">规格</div>
                                    <div className="td quantiyty">数量</div>
                                </div>
                                <Demo />
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
