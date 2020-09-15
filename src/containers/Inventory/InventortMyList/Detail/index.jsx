import React, { Component } from 'react'
import './index.scss'
import History from '../../../../components/History'
import DetailForm from '../../../../components/DetailForm'
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

export default class Detail extends Component {
    state = {
        butStatus :{
            status : true,         //项目是否已经开始
            name: '我的清单',        //子组件按钮显示条件
        },
        sumShow : {
            status : true,
            name :'我的清单'
        },
        historylist :[],
        detail : {}
    }
    getDetail = () =>{
        this.get('p/v1/cost/' + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            this.setState({
                detail : res.data
            })
        }).catch((err)=>{
            console.log(err)
        })



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
        this.getDetail()
    }
    render() {

        return (
            <div className="Detail-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">项目信息</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span>{this.state.detail.name}</span>
                                <img src={[require("../../../../assets/contentmenu/back.png")]} alt=""/>
                            </div>
                        </div>
                        <div className="DemandCreeate-cont-list">

                            <DetailForm FatProp={this.props}  detail={this.state.detail} Butt={this.state.butStatus}></DetailForm>
                            {/* {
                                this.state.butStatus.status 
                                    ? 
                                    <CompileTab ShowSum = {this.state.sumShow}></CompileTab>
                                    :
                                    null
                            } */}
                            <History quire={{status:true,id:this.props.match.params.id}} historylist={this.state.historylist}></History>
                        </div>
                </div>
            </div>
        )
    }
}
