import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {Link} from 'react-router-dom'

import './index.scss'
export default class ProductMyList extends Component {

    state = {
      current : 1,
      count : 1,
      list :[]
    }
    cancel = page =>{
        console.log(page);
        this.setState({
          current : page
        },()=>{
          this.getlist()
        })
    }
    getlist = () =>{
      this.get('p/v1/myproject/?p=' + this.state.current).then((res)=>{
        console.log(res.data)
        this.setState({
          count : res.data.count,
          list : res.data.results
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
              title: '项目编号',
              dataIndex: 'xm_code',
            },
            {
              title: '项目名称',
              dataIndex: 'name',
            },
            {
              title: '项目类型',
              dataIndex: 'category',
            },
            {
                title: '客户名称',
                dataIndex: 'client',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
              {
                title: '负责人',
                dataIndex: 'sell_linkman',
              },
              {
                title: '日期',
                dataIndex: 'date',
              },
            {
              title: '操作',
              render: (text, record) => (
                <Space size="middle">
                  <Link to={'/menu/product/ProductMy/ProductMyDetail/' + record.id}>查看</Link>
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
            <div className="Product-box-pad">
                <div className="Product-tab-list-box">
                    <Table 
                    columns={columns} 
                    dataSource={this.state.list} 
                    pagination={paginationData}/>
                </div>
            </div>
        )
    }
}
