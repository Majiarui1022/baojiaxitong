import React, { Component } from 'react'

import ProductDetailSee from '../../../../components/ProductDetailSee';
import ProductMyDetailTab from '../../ProductMy/ProductMyDetailTab'
import History from '../../../../components/History'
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
export default class ResponDetail extends Component {
    state = {
        butStatus :{
            status : true,         //项目是否已经开始
            name: '负责项目',        //子组件按钮显示条件
        },
        showChange : true,          //是否显示表格编辑
        historylist :[],
        formInitValues:{}
    }
    getDetail = () =>{
        this.get('p/v1/charge/' + this.props.match.params.id + '/').then((res)=>{
            
            console.log(res)
            // res.data.status = res.data.status == 0 ? '已关闭' : res.data.status == 4 ? '进行中' : ''
            this.setState({
                formInitValues : res.data
            })
        }).catch((err)=>{
            console.log(err)
        })

        this.get('p/v1/history/?p=1&project=' + this.props.match.params.id).then((res)=>{
            console.log(res);
            if(res.data.results.length < 5){
                this.setState({
                    historylist : res.data.results
                })
            }else{
                this.setState({
                    historylist : res.data.results.splice(0,6)
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
        this.getDetail()
    }
    // componentWillReceiveProps(data){
    //     console.log(data)
    // }
    render() {
        const Demo = () =>{
            return(
                <ProductDetailSee formInitValues={this.state.formInitValues} Butt={this.state.butStatus}></ProductDetailSee>
            )
        }
        return (
            <div className="ResponDetail-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">项目信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span>{this.state.formInitValues.name}</span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">
                            <Demo />
                            {
                                this.state.butStatus.status 
                                    ? 
                                    <ProductMyDetailTab 
                                        prodetail = {this.props} 
                                        designs={this.state.formInitValues.designs} 
                                        ShowSum={{status:true}} ShowTaChe={this.state.showChange}
                                    ></ProductMyDetailTab>
                                    :
                                    null
                            }
                            <History quire={{status:true,id:this.props.match.params.id}}  historylist={this.state.historylist}></History>
                        </div>
                </div>
            </div>
        )
    }
}
