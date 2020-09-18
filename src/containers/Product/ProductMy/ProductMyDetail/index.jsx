import React, { Component } from 'react'
import './index.scss'
import History from '../../../../components/History'
import ProductDetailSee from '../../../../components/ProductDetailSee'
import ProductMyDetailTab from '../ProductMyDetailTab'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
import DemandModel from '../../../Demand/DemandModel'
const history = creatHistory();//返回上一页这段代码
export default class ProductMyDetail extends Component {
    state = {
        butStatus :{
            status : true,         //项目是否已经开始
            name: '指派到我',        //子组件按钮显示条件
        },
        formInitValues :{
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
            xm_code:''
        },
        tabList :[],
        historylist:[],
    }
    getProductTail = () =>{
        this.get('p/v1/myproject/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            for(var i in res.data.designs){
                var a = 0;
                var b = 0;
                var c = 0;
                var f = 0;
                for(var j in res.data.designs[i].element){
                    res.data.designs[i].element[j].key = res.data.designs[i].element[j].id
                }
                for(var x in res.data.designs[i].manpower){
                    res.data.designs[i].manpower[x].key = res.data.designs[i].manpower[x].id
                }
              }
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
                    sell_linkman:  res.data.sell_linkman,
                    status_ : res.data.status == 1 ? '未开始' : res.data.status == 2 ? '进行中' : res.data.status == 3 ? '已完成' : '',
                    principal : res.data.principal,
                    xm_code : res.data.xm_code
                },
                tabList : res.data.designs
            },()=>{
            })
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    //历史记录
    getHistory = () =>{
        this.get("p/v1/history/?p=1&project=" +  this.props.match.params.id).then((res)=>{
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
    }
    //返回上一页
    golinkform = () =>{
        history.goBack();  //返回上一页这段代码
    }
    componentDidMount(){
        this.getProductTail();
        this.getHistory()
    }
    render() {
        const Demo = () => {
            return(
                <ProductDetailSee proid = {this.props.match.params.id } formInitValues={this.state.formInitValues} Butt={this.state.butStatus}></ProductDetailSee>
            )
        }
        return (
            <div className="Product-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">项目信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span>{this.state.formInitValues.name}</span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">
                                <DemandModel datailCategory={true} disSta={true}/>
                            {
                                this.state.butStatus.status 
                                    ? 
                                    <ProductMyDetailTab 
                                        designs={this.state.tabList} 
                                        ShowSum={{status:false}} 
                                        prodetail = {this.props} 
                                    ></ProductMyDetailTab>
                                    :
                                    null
                            }
                            <History quire={{status:true,id:this.props.match.params.id}} historylist={this.state.historylist}></History>
                        </div>
                </div>
            </div>
        )
    }
}
