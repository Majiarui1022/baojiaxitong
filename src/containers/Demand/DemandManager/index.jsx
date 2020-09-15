import React, { Component } from 'react'
import { Table, Space } from 'antd';
import {Link} from 'react-router-dom'

import './index.scss'
export default class DemandManager extends Component {
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

    getlist = ()=>{
      this.get('p/v1/need/?p=' + this.state.current).then((res)=>{
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
              title: '需求编号',
              dataIndex: 'xq_code',
            },
            {
              title: '项目名称',
              dataIndex: 'name',
            },
            {
              title: '状态',
              dataIndex: 'status',
            },
            {
                title: '客户名称',
                dataIndex: 'client',
            },
            {
                title: '联系人',
                dataIndex: 'linkman',
            },
            {
                title: '销售',
                dataIndex: 'sell_linkman',
              },
              {
                title: '日期',
                dataIndex: 'date',
              },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <Link to={'/menu/demand/detail/' + record.id}>查看</Link>
                </Space>
              ),
            },
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
            <div className="DemandManager-box-pad">
                <div className="DemandManager-tab-list-box">
                    <Table 
                    columns={columns} 
                    dataSource={this.state.List} 
                    pagination={paginationData}/>
                </div>
            </div>
        )
    }
}
