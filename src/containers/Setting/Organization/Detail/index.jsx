import React, { Component } from 'react'
import { Input , Select , Button , Modal , message , Form , Space} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class Detail extends Component {
    state = {
        datas :[],
        userList : []
    }
    showDeleteConfirm = () =>{
        Modal.confirm({
            title: '确认删除此项目吗?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                console.log('关闭')
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
      }
    getdata = () =>{
        console.log(this.props)
        this.get('u/v1/department/').then((res)=>{
          console.log(res)
          this.setState({
              datas : res.data
          })
        }).catch((err)=>{
          console.log(err)
        })


        this.get('u/v1/all_users/').then((res)=>{
            console.log(res)
            this.setState({
                userList : res.data
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
                for(var i in values.users){
                    if(values.users[i].user == ""){
                        values.users[i].user = 0
                    }
                }
                this.post('u/v1/department/',{departments :values.users}).then((res)=>{
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
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                            >
                                                <Input placeholder="请选择部门" />
                                            </Form.Item>

                                            
                                            <Form.Item
                                                {...field}
                                                className="type"
                                                name={[field.name, 'user']}
                                                fieldKey={[field.fieldKey, 'user']}
                                                rules={[]}
                                            >
                                                <Select
                                                    placeholder="请选择负责人"
                                                    allowClear
                                                >
                                                    {
                                                        this.state.userList.map(item=>{
                                                            return(
                                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                                            )
                                                        })
                                                    }
                                                    
                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={(e) => {
                                                    console.log(field)
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
            <div className="Organization-fat-fox">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">编辑架构</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span></span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">

                            <div className="tab">
                                <div className="th">
                                    <div className="td num">序号</div>
                                    <div className="td content">部门</div>
                                    <div className="td type">部门负责人</div>
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
