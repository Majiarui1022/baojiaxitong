import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {Link} from 'react-router-dom'

export default class List extends Component {
  state = {
    datalist : [],
    current : 1,
    count : 1
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
      
      this.get('u/v1/group/').then((res)=>{
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
      const renderContent = (value, row, index) => {
        var str = '';
        for(var i in value){
          str += value[i] + ' , '
        }
        const obj = {
          children: str,
          props: {},
        };
        console.log(value)
        return obj;
      };
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
                title: '用户名称',
                dataIndex: 'users',
                key : 'users',
                render :renderContent
              },
              {
                title: '操作',
                width:140,
                render : (text, record) => (
                  <Space size="middle">
                    <Link to={'/menu/setting/authorityManage/detail/' + record.id}>查看</Link>
                  </Space>
                ),
              }
          ];
          
          const data = [
            {
              id: '1',
              bumen : '技术部',
              timer : '产品部',
              key:'1'
            }
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
