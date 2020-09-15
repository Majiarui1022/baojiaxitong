import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {NavLink} from 'react-router-dom'

export default class List extends Component {
    state = {
      current : 1,
      count : 1,
      List :[]
    }
    cancel = page =>{
        console.log(page)
        this.setState({
          current : page
        },()=>{
          this.getlist()
        })
    }


    getlist = () =>{
      this.get('u/v1/user/?p=' + this.state.current).then((res)=>{
        console.log(res.data)
        for(var i in res.data.results){
          res.data.results[i].key = res.data.results[i].id
        }
        this.setState({
          count : res.data.count,
          List : res.data.results
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    componentDidMount(){
      this.getlist()
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            },
            {
              title: '账号',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '职位',
              dataIndex: 'post',
              key: 'post',
            },
            {
                title: '部门',
                dataIndex: 'department',
                key: 'department',
            },
              {
                title: '日期',
                dataIndex: 'create_time',
                key: 'create_time',
              },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <NavLink to={'/menu/setting/staff/detail/' + record.id}>修改</NavLink>
                </Space>
              ),
            },
          ];
          
          const data = [
            {
              id: '1',
              num: 'KF0007',
              name: '姓名',
              zhiwei: '摸鱼工程师',
              bumen : '技术部',
              timer : '2020-06-12',
              key:'1'
            }
          ];
          const paginationData = {
            pageSize: 9,            //每页9条
            showQuickJumper : true,
            onChange: this.cancel,
            showSizeChanger:false,
            total:this.state.count,
            current:this.state.current
          }
        return (
            <div className="InventoryMyList-box-pad">
                <div className="Product-tab-list-box">
                    <Table 
                    columns={columns} 
                    dataSource={this.state.List} 
                    pagination={paginationData}/>
                </div>
            </div>
        )
    }
}
