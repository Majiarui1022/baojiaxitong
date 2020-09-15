import React, { Component } from 'react'
import { Transfer, Button, Input, message } from 'antd';
import './index.scss'
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
export default class Detail extends Component {
    state = {
        mockData: [],
        targetKeys: [],
        name :'',
        proID : 0
      };
    
      componentDidMount() {
        this.getMock();
        if(this.props.match.params.id > 0){
          this.get("u/v1/group/" + this.props.match.params.id + '/').then((res)=>{
            console.log(res)
            var arr = [];
            for(var i in res.data.permissions){
              arr.push(res.data.permissions[i].id)
            }
            this.setState({
              name : res.data.name,
              targetKeys : arr,
              proID : res.data.id
            })
          }).catch((err)=>{
                console.log(err)
          })
        }
      }
    
      getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
        //   mockData.push(data);
        }
        // this.setState({ mockData, targetKeys },()=>{
        //     console.log(this.state)
        // });
        


        //62 权限组列表
        this.get("u/v1/permissions/").then((res)=>{

            console.log(res.data)
            var mockData = [];
            for(var i in res.data){
                const obj = {
                    key : res.data[i].id,
                    title : res.data[i].name,
                    description: res.data[i].name
                }
                mockData.push(obj)
            }
            this.setState({ mockData },()=>{
                console.log(this.state)
            });
        }).catch((err)=>{
            console.log(err)
        })

      };
    
      settingData = () =>{
          console.log(this.state)
            var obj = {
                name : this.state.name,
                permissions : this.state.targetKeys
            }
            if(this.state.proID < 1){
              this.post("u/v1/group/",obj).then((res)=>{
                console.log(res)
                if(res.data.msg === "success"){
                  message.success("新增成功")
                  history.goBack();  //返回上一页这段代码
                }else if(res.data.error){
                  message.error(res.data.error)
                }else{
                  message.error("请求失败")
                }
              }).catch((err)=>{
                    console.log(err)
              })
            }else{
              this.put("u/v1/group/" + this.props.match.params.id + '/',obj).then((res)=>{
                console.log(res)
                if(res.data.msg === "success"){
                  message.success("修改成功")
                  history.goBack();  //返回上一页这段代码
                }else if(res.data.error){
                  message.error(res.data.error)
                }else{
                  message.error("请求失败")
                }
              }).catch((err)=>{
                    console.log(err)
              })
            }
          
      }
      golinkform = () =>{
        history.goBack();  //返回上一页这段代码
      }
      onChange = ({ target: { value } }) => {
        this.setState({
            name : value
        })
    };


      handleChange = targetKeys => {
        this.setState({ targetKeys });
      };
    
      renderFooter = () => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
          reload
        </Button>
      );
    render() {
           
        return (
            <div className="authority-My-Detail-fax">
                <div className="form-list-cont">
                    <div className="DemandCreate-tit-fax">
                        <h2 className="tit-name lf">{this.props.match.params.id > 0 ? '查看分组' : '新增分组'} </h2>
                        <div className="link-name lf" onClick={this.golinkform}>
                            <span>{this.state.name}</span>
                            <img src={[require("../../../../assets/contentmenu/back.png")]} alt="" />
                        </div>
                    </div>
                    <div className="DemandCreeate-cont-list">
                        <div className='Staff-fox'>
                           <div className="class-name-fax">
                                <div className="init-word">
                                    <label>组名</label>
                                    
                                    <Input value={this.state.name}  onChange={this.onChange}/>
                                </div>
                           </div>
                           <div className="transfer-fat">
                           <Transfer
                                dataSource={this.state.mockData}
                                listStyle={{
                                width: 300,
                                height: 328,
                                }}
                                operations={['新增', '减去']}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={item =>`${item.description}`}
                            />
                            <Button type="primary" onClick={this.settingData}>保存</Button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
