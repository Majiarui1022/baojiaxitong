import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {NavLink as Link} from 'react-router-dom'


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
  

getlist = ()=>{
    this.get('p/v1/all_price/?p=' + this.state.current).then((res)=>{
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
            title: '项目编号',
            dataIndex: 'pp_code',
            key: 'pp_code',
          },
          {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '项目类型',
            dataIndex: 'category',
            key: 'category',
          },
          {
              title: '客户名称',
              dataIndex: 'client',
              key: 'client',
          },
            {
              title: '项目负责人',
              dataIndex: 'principal',
              key: 'principal',
            },
            {
              title: '销售',
              dataIndex: 'sell_linkman',
              key: 'sell_linkman',
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render : (text, row, index) => {
              const obj = {
                children : row.status == 7 ? '待审核' : row.status == 8 ? '未通过' : row.status == 9 ? '通过'  : '',
                 props :{}
              };
              return obj
            }
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
                <Link to={"/menu/qutation/all/detail/" + record.id}>查看</Link>
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
