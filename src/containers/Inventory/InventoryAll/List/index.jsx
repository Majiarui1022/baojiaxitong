import React, { Component } from 'react'
import { Table, Space} from 'antd';
import {Link} from 'react-router-dom'

import './index.scss'
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
      this.get('p/v1/all_cost/?p=' + this.state.current).then((res)=>{
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
              dataIndex: 'xm_code',
              key: 'xm_code',
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
                title: '日期',
                dataIndex: 'date',
                key: 'date',
              },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <Link to={"/menu/inventory/all/detail/" + record.id}>查看</Link>
                </Space>
              ),
            },
          ];
          
          const data = [
            {
              id: '1',
              num: 'XQ20200602-002',
              age: '流媒体后视镜产线测试项目2',
              status: '未分配',
              name : '控福（上海）智能科技有限公司2',
              phoneuser:'张三2',
              createuser :'王麻子',
              timer : '2020-06-12',
              key:'1'
            },
            {
                id: '2',
                num: 'XQ20200602-003',
                age: '流媒体后视镜产线测试项目3',
                status: '未分配3',
                name : '控福（上海）智能科技有限公司3',
                phoneuser:'张三3',
                createuser :'王麻子',
                timer : '2020-06-02',
                key:'2'
              },
              {
                id: '3',
                num: 'XQ20200602-003',
                age: '流媒体后视镜产线测试项目流媒体后视镜产线测试项目',
                status: '未分配',
                name : '控福（上海）智能科技有限公司',
                phoneuser:'张三',
                createuser :'王麻子',
                timer : '2020-06-22',
                key:'3'
              },
              {
                id: '4',
                num: 'XQ20200602-001',
                age: '流媒体后视镜产线测试项目',
                status: '未分配',
                name : '控福（上海）智能科技有限公司',
                phoneuser:'张三',
                createuser :'王麻子',
                timer : '2020-06-22',
                key:'4'
              },
              {
                id: '5',
                num: 'XQ20200602-001',
                age: '流媒体后视镜产线测试项目',
                status: '未分配',
                name : '控福（上海）智能科技有限公司',
                phoneuser:'张三',
                createuser :'王麻子',
                timer : '2020-06-22',
                key:'5'
              },
              {
                id: '6',
                num: 'XQ20200602-001',
                age: '流媒体后视镜产线测试项目',
                status: '未分配',
                name : '控福（上海）智能科技有限公司',
                phoneuser:'张三',
                createuser :'王麻子',
                timer : '2020-06-22',
                key:'6'
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
