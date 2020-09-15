import React, { Component } from 'react'

import {Input , Select , Button,Form , Space, message} from 'antd'


import './index.scss'

import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class PesponSetting extends Component {
    formlist = React.createRef();

    state = {
        bardlist :[],
        datalist : []
    }
    golinkform = () =>{
        history.goBack();  //返回上一页这段代码
    }
    closeWin = () =>{
        history.goBack();  //返回上一页这段代码
    }
    handleChange(value) {
    console.log(`selected ${value}`);
    }
    onFinish = values =>{
        console.log('success',values)
        var obj = {
            num : values.num,
            size : values.size,
            brand : values.brand,
            relevance : values.relevance,
            pdetails : [...values.users,...values.yuanjian]
        }
        this.put('p/v1/charge_design/' + this.props.match.params.id + '/',obj).then((res)=>{
            console.log(res)
            if(res.data.msg === "success"){
                message.success("修改成功")
                history.goBack();  //返回上一页这段代码
            }else if(res.data.error){
                message.error(res.data.error)
            }else{
                message.error("修改失败")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    onFinishFailed = values =>{
        console.log('error',values)
    }


    getlist = () =>{
        //项目产品硬件列表
        this.get('p/v1/designlist/?project=' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            this.setState({
                bardlist : res.data
            })
        }).catch((err)=>{
            console.log(err)
        })

        this.get('p/v1/charge_design/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            this.setState({
                datalist : res.data
            },()=>{
                // formlist
                this.formlist.current.setFieldsValue({
                     yuanjian : this.state.datalist.element,
                     users : this.state.datalist.manpower,
                     num : this.state.datalist.num
                })
                if(this.state.datalist.category == 2){
                    this.formlist.current.setFieldsValue({
                        brand : this.state.datalist.brand,
                        size : this.state.datalist.size,
                        num : this.state.datalist.num,
                        relevance : this.state.datalist.relevance
                   })
                    
                }
                // console.log(this.formlist.current)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getlist()
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };
         
        return (
            <div className="PesponSetting-fat-fox">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">软硬件信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span></span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">

                        <div className="row-menu-tit">{this.state.datalist.name}</div>
                            <Form
                                {...layout}
                                ref={this.formlist}
                                name="basic"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                                >
                                <div className="tab">
                                    <div className="th">
                                        <div className="td num"></div>
                                        <div className="td type">数量</div>
                                        {
                                            
                                            this.state.datalist.category == 2 ? 
                                            <>
                                                <div className="td content">关联硬件</div>
                                                <div className="td brand">品牌</div>
                                                <div className="td specification">规格</div>
                                            </>
                                            :
                                            <></>
                                        }
                                    </div>
                                    <div className="tr" style={{flexDirection: "initial"}}>
                                        <div className="td type">
                                            <Form.Item
                                                name="num"
                                                rules={[{ required: true, message:'数量不能为空'}]}
                                            >
                                                <Input defaultValue={1}  type="number"/>
                                            </Form.Item>
                                        </div>
                                        {
                                            this.state.datalist.category == 2 ? 
                                            <>
                                             <div className="td content">
                                                <Form.Item
                                                        name="relevance"
                                                    >
                                                        <Select style={{ width: 130 }} onChange={this.handleChange} disabled={true}>
                                                            {
                                                                this.state.bardlist.map(item=>{
                                                                    return(
                                                                        <Option value={item.id}>{item.name}</Option>
                                                                    )
                                                                })
                                                            }
                                                            
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            <div className="td brand">
                                                <Form.Item
                                                    name="brand"
                                                >
                                                    <Input />
                                                </Form.Item>    
                                            </div>
                                            <div className="td specification">
                                                    <Form.Item
                                                        name="size"
                                                    >
                                                        <Input />
                                                    </Form.Item>  
                                                </div>
                                    
                                            </>
                                            :
                                            <>
                                            </>
                                        }
                                       
                                    </div>
                                </div>



                                <div className="row-menu-tit">{this.state.datalist.name}-元件</div>
                                <div className="tab">
                                    <div className="th">
                                        <div className="td num"></div>
                                        <div className="td type">元件类型</div>
                                        <div className="td content">部件名称</div>
                                        <div className="td brand">品牌</div>
                                        <div className="td specification">规格</div>
                                        <div className="td quantiyty">数量</div>
                                        <div className="td price">单价</div>
                                        {/* <div className="td sum">小计</div> */}
                                    </div>
                                    <Form.List name="yuanjian">
                                        {(fields , {add , remove})=>{
                                            return(
                                                <div className="tr">
                                                    {fields.map((field , index)=>{
                                                        return(
                                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 26 }} align="start">
                                                            <div className="td num">1、</div>
                                                            <Form.Item
                                                                {...field}
                                                                className="type td"
                                                                name={[field.name, 'category']}
                                                                fieldKey={[field.fieldKey, 'category']}
                                                                rules={[{ required: true}]}
                                                            >
                                                                <Select
                                                                    placeholder="Select a option and change input text above"
                                                                    allowClear
                                                                    disabled={true}
                                                                >
                                                                    <Option value={1}>标准元件</Option>
                                                                    <Option value={2}>非标准原件</Option>
                                                                </Select>
                                                            </Form.Item>
            
                                                            <Form.Item
                                                                {...field}
                                                                className="content td"
                                                                name={[field.name, 'name']}
                                                                fieldKey={[field.fieldKey, 'name']}
                                                                rules={[{ required: true}]}
                                                            >
                                                                <Input disabled={true}/>
                                                            </Form.Item>
            
                                                            <Form.Item
                                                                {...field}
                                                                className="brand td"
                                                                name={[field.name, 'brand']}
                                                                fieldKey={[field.fieldKey, 'brand']}
                                                                rules={[{ required: true}]}
                                                            >
                                                                <Input  disabled={true}/>
                                                            </Form.Item>
            
                                                            <Form.Item
                                                                {...field}
                                                                className="specification td"
                                                                name={[field.name, 'size']}
                                                                fieldKey={[field.fieldKey, 'size']}
                                                                rules={[{ required: true}]}
                                                            >
                                                                <Input  disabled={true}/>
                                                            </Form.Item>
            
            
                                                            <Form.Item
                                                                {...field}
                                                                className="quantiyty td"
                                                                name={[field.name, 'num']}
                                                                fieldKey={[field.fieldKey, 'num']}
                                                                rules={[{ required: true, message:'数量不能为空'}]}
                                                            >
                                                                <Input type="number"/>
                                                            </Form.Item>
            
                                                            <Form.Item
                                                                {...field}
                                                                className="price td"
                                                                name={[field.name, 'unit_price']}
                                                                fieldKey={[field.fieldKey, 'unit_price']}
                                                                rules={[{ required: true , message : '请输入单价'}]}
                                                            >
                                                                <Input  type="number"/>
                                                            </Form.Item>
            
                                                            {/* <Form.Item
                                                                {...field}
                                                                className="sum td"
                                                                name={[field.name, 'unit_price * num']}
                                                                fieldKey={[field.fieldKey, 'unit_price * num']}
                                                            >
                                                                <Input />
                                                            </Form.Item> */}
                                                        </Space>
                                                        )   
                                                    })}
                                                </div>
                                            )
                                        }}
                                   </Form.List>
                               
                                </div>


                                <div className="row-menu-tit">{this.state.datalist.name}-人力</div>
                                <div className="tab">
                                    <div className="th">
                                        <div className="td num"></div>
                                        <div className="td type">类型</div>
                                        <div className="td faildcontent">内容</div>
                                        <div className="td quantiyty">数量</div>
                                        <div className="td price">单价</div>
                                        {/* <div className="td sum">小计</div> */}
                                    </div>

                                    <Form.List name="users">
                                        {(yjlist, { add, remove, }) => {
                                            console.log(yjlist)
                                            return (
                                                <div className="tr">
                                                    {
                                                    yjlist.map((field, index) => (
                                                        <Space 
                                                        key={field.key} 
                                                        style={{ display: 'flex', marginBottom: 26 }} align="start">
                                                            <div className="td num">1、</div>

                                                            <Form.Item
                                                                {...field}
                                                                className="type td"
                                                                name={[field.name, 'category']}
                                                                fieldKey={[field.fieldKey, 'category']}
                                                                rules={[{ required: true}]}
                                                            >
                                                                <Select
                                                                    placeholder="Select a option and change input text above"
                                                                    allowClear
                                                                    disabled={true}
                                                                >
                                                                    <Option value={5}>软件系统</Option>
                                                                    <Option value={6}>设计</Option>
                                                                    <Option value={7}>其他</Option>
                                                                </Select>
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...field}
                                                                className="td faildcontent"
                                                                name={[field.name, 'name']}
                                                                fieldKey={[field.fieldKey, 'name']}
                                                                rules={[{ required: true,}]}
                                                            >
                                                                <Input disabled={true}/>
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...field}
                                                                className="td quantiyty"
                                                                name={[field.name, 'num']}
                                                                fieldKey={[field.fieldKey, 'num']}
                                                                rules={[{ required: true, message:'数量不能为空'}]}
                                                            >
                                                                <Input  type="number"/>
                                                            </Form.Item>
                                                            <Form.Item
                                                                className="td price"
                                                                {...field}
                                                                name={[field.name, 'unit_price']}
                                                                fieldKey={[field.fieldKey, 'unit_price']}
                                                                rules={[{ required: true, message : '请输入单价'}]}
                                                            >
                                                                <Input  type="number"/>
                                                            </Form.Item>
                                                            {/* <Form.Item
                                                                className="td price"
                                                                {...field}
                                                                name={[field.name, 'id']}
                                                                fieldKey={[field.fieldKey, 'id']}
                                                            >
                                                                <Input />
                                                            </Form.Item> */}
                                                           
                                                        </Space>
                                                    ))}

                                                </div>
                                            );
                                        }}
                                    </Form.List>



                                  
                                </div>

                                <div className="close-fat-but">
                                    <Button type="primary" htmlType="submit">保存</Button>
                                    <Button type="primary" onClick={this.closeWin}>取消</Button>
                                </div>

                            </Form>
                        </div>
                </div>
            </div>
        )
    }
}
