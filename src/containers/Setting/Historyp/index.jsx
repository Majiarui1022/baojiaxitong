import React, { Component } from 'react'
import { Form, Input, Button , Select, message } from 'antd';
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
const { Option } = Select;
export default class Historyp extends Component {
    state = {
        historylist :[],
        name : ''
      }
      golinkform = () =>{
        history.goBack();  //返回上一页这段代码
      }
      getlist = () =>{
        this.get("p/v1/" + this.state.name + "/?p=1&project=" +  this.props.match.params.id).then((res)=>{
            console.log(res);
            this.setState({
                historylist : res.data.results
            })
        }).catch((err)=>{
            console.log(err)
        })
      }
      componentDidMount(){
          if(this.props.match.params.id <= 0)return
          if(this.props.match.params.status == "true"){
            this.setState({
                name : 'history'
            },()=>{
                this.getlist();
            })
          }else{
            this.setState({
                name : 'pricehistory'
            },()=>{
                this.getlist();
            })
          }
      }
     
    render() {
        return (
            <div className="pro-falt-fox">
                <div className="Historyp-My-Detail-fax">
                    <div className="form-list-cont">
                        <div className="DemandCreate-tit-fax">
                            <h2 className="tit-name lf">历史记录</h2>
                            <div className="link-name lf" onClick={this.golinkform}>
                                <span></span>
                                <img src={[require("../../../assets/contentmenu/back.png")]} alt="" />
                            </div>
                        </div>  
                        <div className="DemandCreeate-cont-list">
                            <div className='Staff-fox'>
                                <div className="history-fax-box">
                                    <div className="history-list-fax">
                                        <ul>
                                            {
                                                (this.state.historylist || []).map((item,index)=>{
                                                    return(
                                                        <li key={item.id}>
                                                            <i>{index + 1}、</i>
                                                            <span>{item.create_time} {item.info}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
