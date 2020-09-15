import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {NavLink} from 'react-router-dom'



export default class List extends Component {
  state = {
    datalist : [],
    current : 1,
    count : 1,
    purlist : []
  }
    cancel = page =>{
      console.log(page)
      this.setState({
        current : page
      },()=>{
        this.getList()
      })
    }
    getList = () =>{
      this.get('u/v1/all_users/').then((res)=>{
        this.setState({
          purlist : res.data
        })
      }).catch((err)=>{

      })
      this.get('u/v1/department/').then((res)=>{
        console.log(res)
        for(var i in res.data){
          res.data[i].key = res.data[i].id
        }
        this.setState({
            count : res.data.count,
            datalist : res.data
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    componentDidMount(){
      this.getList()
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width:140,
                key : 'id'
            },
            {
                title: '部门',
                dataIndex: 'name',
                width:140,
                key : 'name'
            },
              {
                title: '部门负责人',
                dataIndex: 'user',
                key : 'user',
                render : (text, row, index)=>{
                  const obj = {
                    children : text,
                    props :{}
                  } ;
                  for(var i in this.state.purlist){
                    if(row.user === this.state.purlist[i].id){
                      obj.children = this.state.purlist[i].name
                    }
                  }
                  return obj
                }
              },
          ];
          const paginationData = {
            pageSize: 9,            //每页9条
            showQuickJumper : true,
            onChange: this.cancel,
            showSizeChanger:false,
            current:this.state.current
          }
        return (
            <div className="InventoryMyList-box-pad">
                <div className="Product-tab-list-box">
                    <Table 
                    columns={columns} 
                    dataSource={this.state.datalist} 
                    pagination={paginationData}/>
                </div>
            </div>
        )
    }
}
