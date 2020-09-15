import React, { Component } from 'react'
import { Form, Input, Button, Select, Space ,message} from 'antd';
import History from '../../../../components/History'
import './index.scss'

import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class DetailSet extends Component {
    myqdlist = React.createRef();
    state = {
        formInitValues: {},
        historylist: [],
        dataList: [

        ],
        sum: '',
        sumt: {
            status: false,   //false  代表未修改过  true  修改过 不能修改
            price: ''
        },
        marketlist :[]
    }


    barlist = (LIST) => {
        var lists = []
        for (var x in LIST.designs) {
            var arr = [...LIST.designs[x].element, ...LIST.designs[x].manpower,]
            var obj = {
                id:LIST.designs[x].id,
                name: LIST.designs[x].name,
                price: 0,
                num: LIST.designs[x].num,
                discount: LIST.designs[x].discount,
                priceT: 0
            }
            for (var i in arr) {
                if(arr[i].quoted_price > 0){
                    obj.price += Math.round(arr[i].quoted_price * arr[i].num * 1)
                }else{
                    obj.price += Math.round(arr[i].unit_price * arr[i].num * 1)
                }
            }
            obj.priceT +=  Math.round(obj.price * LIST.designs[x].num * LIST.designs[x].discount * 100)/100
            lists.push(obj)
        }
        this.setState({
            dataList: lists
        }, () => {
            var str = 0
            var strT = 0
            for (var i in this.state.dataList) {
                str += this.state.dataList[i].priceT;
                strT += this.state.dataList[i].priceT
            }
            this.setState({
                sum: Math.round(str*100)/100
            })
            if (this.state.sumt.status === false) {
                this.setState({
                    sumt: {
                        ...this.state.sumt,
                        price: strT
                    }
                }, () => {
                })
            }
        })
    }

    setSumPrice = e => {
        this.setState({
            sumt: {
                status: true,
                price: e.target.value
            }
        })
    }
    setdis = (e, index) => {
        var list = this.state.formInitValues;
        list.designs[index].discount = e.target.value;
        this.setState({
            formInitValues: list
        }, () => {
            this.barlist(this.state.formInitValues)
        })
    }

      //获取人员列表(销售)
      getusers = () => {
        this.get('u/v1/all_users/').then((res) => {
            console.log(res.data)
            this.setState({
                marketlist: res.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    getDetail = () => {
        this.get('p/v1/cost/' + this.props.match.params.id + '/').then((res) => {
            console.log(res);
            this.setState({
                formInitValues: res.data,
            },()=>{
                if(this.state.formInitValues.tax_price){
                    this.setState({
                        sumt: {
                            status : true,
                            price: this.state.formInitValues.tax_price
                        }
                    })
                }
               
            })
            this.barlist(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    setprice = (e, index, inx) => {
        var obj = this.state.formInitValues;
        obj.designs[index].element[inx].quoted_price = e.target.value;
        this.setState({
            formInitValues: obj
        }, () => {
            this.barlist(this.state.formInitValues)
        })
    }


    setpriceT = (e, index, inx) => {
        var obj = this.state.formInitValues;
        obj.designs[index].manpower[inx].quoted_price = e.target.value;
        this.setState({
            formInitValues: obj
        }, () => {
            this.barlist(this.state.formInitValues)
        })
    }
    onSetChange = () => {

    }

    golinkform = () =>{
        history.goBack();  //返回上一页这段代码
    }

    linkmanchange = value => {
        this.myqdlist.current.setFieldsValue({
            myqdlist: value,
        })
        for(var i in this.state.marketlist){
            if(this.state.marketlist[i].id == value){
              this.myqdlist.current.setFieldsValue({
                sell_phone : this.state.marketlist[i].phone,
                sell_email : this.state.marketlist[i].email
              })
            }
          }
    }

    validateMessages =  {
        required: '${label}不能为空',
        types: {
          email: '${label}不是一个有效的地址',
          number: '${label} is not a validate number!',
        },
    };


    componentDidMount() {
        this.getusers();
        this.getDetail();
       
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
        const onFinish = values => {
            console.log('Success:', values);
            console.log(this.state.formInitValues.designs)
            var designs = [];
            var pdetails = [];
            for(var i in this.state.dataList){
                var obj = {
                    id : this.state.dataList[i].id,
                    discount : this.state.dataList[i].discount,
                    pdetails : []
                }
                for(var j in this.state.formInitValues.designs){
                    var arr = [...this.state.formInitValues.designs[j].element,...this.state.formInitValues.designs[j].manpower]
                    for(var y in arr){
                        var objT = {
                            id : arr[y].id,
                            quoted_price : arr[y].quoted_price
                        }
                        obj.pdetails.push(objT)
                    }
                }
                designs.push(obj)
            }
            // for(var i in this.state.formInitValues.designs){
            //     var arr = [...this.state.formInitValues.designs[i].element,...this.state.formInitValues.designs[i].manpower]
            //     for(var i in arr){
            //         var obj = {
            //             id : arr[i].id,
            //             quoted_price : arr[i].quoted_price
            //         }
            //         pdetails.push(obj)
            //     }
            // }
            var objst = values;
            objst.designs = designs;
            objst.pdetails = pdetails;
            objst.tax_price = this.state.sumt.price
            this.put('p/v1/cost/' +  + this.props.match.params.id + '/',objst).then((res)=>{
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
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        
        return (
            <div className="Detailset-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                        <h2 className="tit-name lf">项目信息</h2>
                        <div className="link-name lf" onClick={this.golinkform}>
                            <span>{this.state.formInitValues.name}</span>
                            <img src={[require("../../../../assets/contentmenu/back.png")]} alt="" />
                        </div>
                    </div>
                    <div className="DemandCreeate-cont-list">
                        {
                            this.state.formInitValues.sell_linkman ?
                            <Form
                                {...layout}
                                ref={this.myqdlist}
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
                        <Input disabled={true}/>
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
                        <Input disabled={true}/>
                    </Form.Item>

                    <Form.Item
                    >
                    </Form.Item>

                    <Form.Item name="category" label="项目类型" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                            disabled={true}
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

                    <Form.Item
                        label="交货期"
                        name="delivery"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="保质期"
                        name="warranty"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="有效期"
                        name="indate"
                    >
                        <Input />
                    </Form.Item>




                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                    </Button>

                    </Form.Item>
                </Form>
                            :
                            null
                        }
                        <div className="tab-form-list lf">
                            <div className="tab-fir-lab">
                                <div className="tab-tit-fox">
                                    <span>报价基础</span>
                                </div>
                                <div className="tab-list-ms">
                                    <div className="row">
                                        <div className="list-x lf"></div>
                                        <div className="list-name lf">设备</div>
                                        <div className="list-price lf">单价</div>
                                        <div className="list-num lf">数量</div>
                                        <div className="list-zhe lf">折扣</div>
                                        <div className="list-sumprice lf">不含税优惠价</div>
                                    </div>

                                    {
                                        (this.state.dataList || []).map((item, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="list-x lf">{index + 1}、</div>
                                                    <div className="list-name lf">{item.name}</div>
                                                    <div className="list-price lf">{item.price}</div>
                                                    <div className="list-num lf">{item.num}</div>
                                                    <div className="list-zhe lf">
                                                        <Input type="number" value={item.discount} onChange={(e) => this.setdis(e, index)} />
                                                    </div>
                                                    <div className="list-sumprice lf">{item.priceT}</div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <Form.List name="designs"> */}
                                    {/* {(fields, { add, remove }) => {
                                    console.log(fields)
                                    return(
                                        <div>
                                            {
                                                fields.map((item,index)=>{
                                                    <Space key={item.key}>
                                                        
                                                    </Space>
                                                })
                                            }
                                        </div>
                                    )
                                } }
                            
                                */}
                                    {/* </Form.List> */}
                                    <div className="row">
                                        <div className="list-x lf">{this.state.dataList.length + 1}、</div>
                                        <div className="list-name lf">不含税总价</div>
                                        <div className="list-zong lf">{Math.round(this.state.sum*100)/100}</div>
                                    </div>

                                    <div className="row">
                                        <div className="list-x lf">{this.state.dataList.length + 2}、</div>
                                        <div className="list-name lf">含税优惠总价/含税总价</div>
                                        <div className="list-zong lf">
                                            <Input value={Math.round(this.state.sumt.price*100)/100} onChange={e => this.setSumPrice(e)} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {
                                (this.state.formInitValues.designs || []).map((item, index) => {
                                    return (
                                        <div className="tab-fir-lab" key={item.id}>
                                            <div className="tab-tit-fox">
                                                <span>{item.name}</span>
                                            </div>
                                            <div className="tab-list-ms">
                                                <div className="row">
                                                    <div className="category lf">类型</div>
                                                    <div className="list-name lf">部件名称</div>
                                                    <div className="barand lf">品牌</div>
                                                    <div className="size lf">规格</div>
                                                    <div className="num lf">数量</div>
                                                    <div className="price lf">成本单价</div>
                                                    <div className="price-ord lf">报价单价</div>
                                                    <div className="sum lf">小计</div>
                                                </div>

                                                {
                                                    (item.element || []).map((val, inx) => {
                                                        return (
                                                            <div key={val.id} className="row">
                                                                <div className="category lf">
                                                                    {
                                                                        val.category == 1 ? '标准原件' :
                                                                            val.category == 2 ? '非标准原件' :
                                                                                val.category == 5 ? '软件系统' :
                                                                                    val.category == 6 ? '设计' :
                                                                                        val.category == 7 ? '其他' :
                                                                                            ''
                                                                    }
                                                                </div>
                                                                <div className="list-name lf">{val.name}</div>
                                                                <div className="barand lf">{val.brand}</div>
                                                                <div className="size lf">{val.size}</div>
                                                                <div className="num lf">{val.num}</div>
                                                                <div className="price lf">{val.unit_price}</div>
                                                                <div className="price-ord lf">
                                                                    <Input type="number" value={val.quoted_price} onChange={e => this.setprice(e, index, inx)} />
                                                                </div>
                                                                <div className="sum lf">{ val.quoted_price > 0 ? Math.round(val.quoted_price * val.num*100)/100 : Math.round(val.unit_price * val.num*100)/100 }</div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                {
                                                    (item.manpower || []).map((luex, dex) => {
                                                        return (
                                                            <div className="row" key={luex.id}>
                                                                <div className="category lf">
                                                                    {
                                                                        luex.category == 1 ? '标准原件' :
                                                                            luex.category == 2 ? '非标准原件' :
                                                                                luex.category == 5 ? '软件系统' :
                                                                                    luex.category == 6 ? '设计' :
                                                                                        luex.category == 7 ? '其他' :
                                                                                            ''
                                                                    }
                                                                </div>
                                                                <div className="cont lf">{luex.name}</div>
                                                                <div className="num lf">{luex.num}</div>
                                                                <div className="price lf">{luex.unit_price}</div>
                                                                <div className="price-ord lf">
                                                                    <Input type="number" value={luex.quoted_price} onChange={e => this.setpriceT(e, index, dex)} />
                                                                </div>
                                                                <div className="sum lf">{luex.quoted_price > 0 ? Math.round(luex.quoted_price * luex.num * 100)/100 : Math.round(luex.unit_price * luex.num * 100)/100  }</div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }




                        </div>

                        <History  quire={{status:true,id:this.props.match.params.id}} historylist={this.state.historylist}></History>
                    </div>
                </div>
            </div>
        )
    }
}
