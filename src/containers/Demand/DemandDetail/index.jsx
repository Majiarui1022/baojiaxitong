import React, { Component } from 'react'

import { Form, Input, Button , Select ,Modal ,message} from 'antd';
import './index.scss';
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
import History from '../../../components/History'
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;

export default class DemandDetail extends Component {
    
    formRef = React.createRef();
    firmRefTwo = React.createRef();
    state = {
        visible: false,
        projectStatus :false,
        //表单默认值
        formInitValues: {
            category: "",
            name: '',
            client: '',
            linkman: '',
            phone: '',
            email: '',
            sell_linkman: '',
            sell_phone: '',
            sell_email: '',
            info: '',
            state : '',
            xq_code : ''
        },
        changeStatus : false,
        marketlist: [],
        allocation : '未分配',
        id:'',
        departMent :[],
        perList:[],
        historylist :[]
    };
 

    //选择部门
    selectBu = value =>{
        for(var i in this.state.departMent){
            if(this.state.departMent[i].id == value){
                this.firmRefTwo.current.setFieldsValue({
                    renyuan: '',
                })
                this.setState({
                    perList : this.state.departMent[i].department_users
                },()=>{
                })
            }
        }
    }

    //选择人员
    selectPer = value =>{
        console.log(value)
    }
    linkmanchange = value => {
         this.formRef.current.setFieldsValue({
            sell_linkman: value,
        })
        for (var i in this.state.marketlist) {
            if (this.state.marketlist[i].id == value) {
                this.formRef.current.setFieldsValue({
                    sell_phone: this.state.marketlist[i].phone,
                    sell_email: this.state.marketlist[i].email
                })
            }
        }
    }

    //打开分配弹窗
    showModal = () => {
        if(this.state.allocation == '未分配' || this.state.allocation == '退回'){
            this.setState({
                visible: true,
            });
        }else{
            message.info('此需求已分配');
        }
       
    };

    //打开关闭弹窗
    openDigio = () =>{

        if(this.state.changeStatus){
            this.setState({
                changeStatus : false
            })
        }else{
            this.setState({
                projectStatus : true
            })
        }
       
    }
    // 关闭 关闭弹窗
    handleProject = e => {
        this.setState({
            projectStatus: false,
        });
    };

    //点击确定关闭弹窗
    // handleOk = e => {
    //     console.log(e);
    //     this.setState({
    //         visible: false,
    //     });
    // };

    // 点击icn关闭弹窗
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    

    onFinish = values => {
        console.log('Success:', values);
        const hide =  message.loading('请稍后',0)
        this.put('p/v1/allot/'+ this.props.match.params.id + '/',{supervisor:values.renyuan}).then((res) => {
            this.setState({
                visible: false,
                allocation : '已分配'
            },()=>{
                hide()
                message.success('分配成功')
            });
            
        }).catch((err) => {
            console.log(err)
        })

    };

    onFinishProject = value =>{
        this.put('p/v1/projectclose/'+ this.props.match.params.id + '/').then((res) => {
            if(res.data.error){
                message.error(res.data.error);
            }else if(res.data.msg){
                this.setState({
                    projectStatus: false,
                },()=>{
                    message.success('已关闭');
                });
            }
           
            
        }).catch((err) => {
            console.log(err)
        })
    }

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
    getusers = () => {
        this.get('u/v1/all_users/').then((res) => {
            this.setState({
                marketlist: res.data
            },()=>{
            this.getDepartMentlist()
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    //获取部门列表
    getDepartMentlist = () =>{ 
        this.get('u/v1/departmentlist/').then((res) => {
            console.log(res)
            this.setState({
                departMent : res.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    //新增需求
    createDemand = value => {
        console.log(value);
        this.put('p/v1/need/' + this.props.match.params.id + '/', value).then((res) => {
            
            this.formRef.current.setFieldsValue(value)
            if(res.data.msg === "success"){
                message.success('修改成功');
                history.goBack();  //返回上一页这段代码
              }else if(res.data.error === "error"){
                message.error(res.data.error);
              }else{
                message.error('操作失败');
              }

        }).catch((err) => {
            console.log(err)
        })
    }

    //编辑需求
    settingDemand = () =>{
        this.setState({
            changeStatus : true
        })
    }

    //返回上一页
    golinkform = () =>{
        history.goBack();  //返回上一页这段代码
    }
    
    componentDidMount() {
        this.getusers();
        this.get("p/v1/need/" + this.props.match.params.id + '/').then((res)=>{
            console.log(res);
            this.setState({
                formInitValues:{
                    category: res.data.category,
                    name: res.data.name,
                    client:  res.data.client,
                    linkman:  res.data.linkman,
                    phone:  res.data.phone,
                    email:  res.data.email,
                    sell_phone:  res.data.sell_phone,
                    sell_email:  res.data.sell_email,
                    info:  res.data.info,
                    sell_linkman:  res.data.sell_linkman.id,
                    state : res.data.state,
                    xq_code : res.data.xq_code
                },
                allocation : res.data.state,
                id : res.data.id
            })

            this.get("p/v1/history/?p=1&project=" +  res.data.id).then((res)=>{
                console.log(res)
                if(res.data.results > 5){
                    this.setState({
                        historylist : res.data.results.slice(0,6)
                    })
                }else{
                    this.setState({
                        historylist :  res.data.results
                    })
                }
            }).catch((err)=>{
                console.log(err)
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
                    ref={this.formRef}
                    initialValues={this.state.formInitValues}
                    validateMessages={this.validateMessages}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    right
                >
                    <Form.Item
                        label="需求编号"
                        name="xq_code"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input 
                            disabled={!this.state.changeStatus}
                        />
                    </Form.Item>

                    <Form.Item
                        label="需求状态"
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input 
                            disabled={!this.state.changeStatus}
                        />
                    </Form.Item>


                    <Form.Item 
                    name="category"
                     label="项目类型" 
                     rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                            disabled={!this.state.changeStatus}
                        >
                            <Option value={1}>软件项目</Option>
                            <Option value={2}>软硬件项目</Option>
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
                        <Input 
                            disabled={!this.state.changeStatus}
                        />
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
                        <Input 
                            disabled={!this.state.changeStatus}
                        />
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
                         <Input 
                            disabled={!this.state.changeStatus}
                        />
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
                         <Input 
                            disabled={!this.state.changeStatus}
                            type="number"
                        />
                    </Form.Item>

                    <Form.Item
                        label="邮箱地址"
                        name="email"
                    >
                         <Input 
                            disabled={!this.state.changeStatus}
                        />
                    </Form.Item>


                    <Form.Item name="sell_linkman" label="销售" >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.linkmanchange}
                            allowClear
                            disabled={!this.state.changeStatus}
                        >
                            {
                                this.state.marketlist.map(item => {
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
                    >
                         <Input 
                            disabled={!this.state.changeStatus}
                        />
                    </Form.Item>

                    <Form.Item
                        label="邮箱地址"
                        name="sell_email"
                    >
                         <Input 
                            disabled={!this.state.changeStatus}
                        />
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
                        <Input.TextArea 
                            disabled={!this.state.changeStatus}
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        {
                            this.state.changeStatus ? 
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                            :
                            <>
                                {
                                    this.state.allocation == '未分配' || this.state.allocation == '退回'?
                                    <Button type="primary" onClick={this.settingDemand}>
                                        编辑
                                    </Button>
                                    :
                                    null
                                }
                                <Button type="primary" onClick={this.showModal}>
                                    分配
                                </Button>
                            </>
                        }
                       
                      
                        <Button type="primary" onClick={this.openDigio}>
                            {this.state.changeStatus ? '取消' : '关闭'}
                        </Button>
                    </Form.Item>
                </Form>
            );
        };
        return (
            <div className="DemandChange-box-pad">
                <div className="DemandCreate-box-fat">
                    <div className="form-list-cont">
                        <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">需求信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span>{this.state.formInitValues.name}</span>
                                <img src={[require("../../../assets/contentmenu/back.png")]} alt="" />
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">
                            <Demo />

                            <History quire={{status:true,id:this.state.id}} historylist={this.state.historylist}/>

                            <Modal
                                title="Basic Modal"
                                visible={this.state.visible}
                                title="需求分配"
                                footer={null}
                                onCancel={this.handleCancel}
                                className="modal-fat-fox"
                            >
                                <Form
                                    ref={this.firmRefTwo}
                                    validateMessages={this.validateMessages}
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}>
                                    <Form.Item name="bumen" label="部门" rules={[{ required: true }]}>
                                        <Select
                                            onChange={this.selectBu}
                                            allowClear
                                        >
                                            
                                            {
                                                this.state.departMent.map(item =>{
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="renyuan" label="人员" rules={[{ required: true }]}>
                                       
                                        <Select
                                            onChange={this.selectPer}
                                            allowClear
                                        >
                                            {
                                                this.state.perList.map(item =>{
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button style={{ float: "right" }} type="primary" htmlType="submit">确定</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal
                                title="Basic Modal"
                                visible={this.state.projectStatus}
                                title="项目关闭"
                                footer={null}
                                onCancel={this.handleProject}
                                className="modal-fat-fox"
                            >
                                <Form
                                    validateMessages={this.validateMessages}
                                    onFinish={this.onFinishProject}
                                    onFinishFailed={this.onFinishFailed}>
                                    <Form.Item name="关闭原因" label="关闭原因" rules={[{ required: true }]}>
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
            </div>
        )
    }
}
