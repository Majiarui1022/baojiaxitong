import React, { Component } from 'react'

import {Link } from 'react-router-dom'
import { Table } from 'antd';

import './index.scss'
export default class ProductMyDetailTab extends Component {
    state = {
      tabList : []
    }
    componentWillReceiveProps(data){
      console.log(data);
      this.setState({
        tabList : data.designs
      })
      // for(var i in res.data.designs){
      //   var eleOneCon = 0;
      //   var eleTweCon = 0;
      //   var manOneCon = 0;
      //   var manTweCon = 0;
      //   for(var j in res.data.designs[i].element){
      //   }
      // }
     
    }
    componentWillUnmount() {
      this.setState = ()=>false;
    }
  
  
    render() {
      console.log(this.props)
        const renderContent = (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            return obj;
          };
          
          var columns = [
            {
              title: '类型',
              dataIndex: 'category',
              width:105,
              render: (text, row, index) => {
                  const obj = {
                    children : row.category == 1 ? '标准原件' : row.category == 2 ? '非标准原件' : row.category == 5 ? '软件系统' : row.category == 6 ? '设计' : row.category == 1 ? '其他' : '',
                    props :{}
                };
                // if(row.consts){
                //     obj.props.rowSpan = row.consts
                // }else{
                //     obj.props.rowSpan = 0
                // }
                // if(index == 0 || index == 2 || index == 4){
                //     obj.props.rowSpan = index + 3
                // // }else if(index === 3){
                // //     obj.props.rowSpan = 2
                // }else{
                //     obj.props.rowSpan = 0
                // }
                  return obj;
              },
            },
            {
              title: '部件名称',
              dataIndex: 'name',
              render: renderContent,
            },
            {
              title: '品牌',
              dataIndex: 'brand',
              render:renderContent,
            },
            {
              title: '规格',
              dataIndex: 'size',
              render: renderContent,
            },
            {
              title: '数量',
              dataIndex: 'num',
              width:80,
              render: renderContent,
            },
          ];

          var arr = [
            {
              title: '成本单价',
              dataIndex: 'unit_price',
              width:124,
              render: renderContent,
            },
            {
              title: '小计',
              dataIndex: 'sum',
              width:124,
              render: (text, row, index) => {
                  const obj = {
                    children : Math.round(row.num * row.unit_price*100)/100,
                    props :{}
                };
                  return obj;
              },
            },
          ]



          
          const dataTwo = [
            {
              "key":1,
              "id": 2,
              "category": '标准原件',
              "name": "Joseph Harris",
              "brand": "@hML",
              "size": "^2Sbq8",
              "num": 1,
              "consts" :1
            },
            {
              "key":2,
              "id": 1,
              "category": '非标准原件',
              "name": "Donald Jones",
              "brand": "22ye[@U",
              "size": "FnUO",
              "num": 2,
              "consts" :1
            }
          ]

          var columnsjichu = [
            {
              title: '类型',
              dataIndex: 'category',
              width:105,
              render: (text, row, index) => {
                  const obj = {
                    children : row.category == 1 ? '标准原件' : row.category == 2 ? '非标准原件' : row.category == 5 ? '软件系统' : row.category == 6 ? '设计' : row.category == 1 ? '其他' : '',
                    props :{}
                };
                // if(row.consts){
                //     obj.props.rowSpan = row.consts
                // }else{
                //     obj.props.rowSpan = 0
                // }
                // if(index == 0 || index == 2 || index == 4){
                //     obj.props.rowSpan = index + 3
                // // }else if(index === 3){
                // //     obj.props.rowSpan = 2
                // }else{
                //     obj.props.rowSpan = 0
                // }
                  return obj;
              },
            },
            {
              title: '内容',
              dataIndex: 'name',
              render: renderContent,
            },
            {
              title: '工时（数量）',
              dataIndex: 'num',
              render:renderContent,
            },
          ]

          const data = [
            {
              "key" : 1,
              "id": 5,
              "category": 5,
              "name": "Scott Brown",
              "num": 1,
              "consts" :1

            },
            {
              "key" :2,
              "id": 6,
              "category": 6,
              "name": "Larry Johnson",
              "num": 1,
              "consts" :1
            }
          ]
          if(this.props.ShowSum.status){
            columns = [...columns , ...arr];
            columnsjichu = [...columnsjichu , ...arr];
          }
          
        return (
            <div className="product-info-content">

              {
                (this.state.tabList || []).map(item =>{

                  return(
                    <div className="row-menu" key={item.id}>
                      <div className="row-menu-tit but-active">
                          <div className="title-name">{item.name}</div>
                          {
                                  item.element.length > 0  || item.manpower.length > 0 ? 
                                    this.props.prodetail.match.path === "/menu/product/ProductRespon/responDetail/:id" ?
                                      <Link className="setting-but" to={'/menu/product/ProductRespon/pesponsetting/' + item.id}>
                                        <img src={[require("../../../../assets/product/chs.png")]} alt=""/>
                                        <span>编辑</span>
                                      </Link>
                                    :
                                    <Link className="setting-but" to={'/menu/product/ProductMy/addpre/' + item.id}>
                                      <img src={[require("../../../../assets/product/chs.png")]} alt=""/>
                                      <span>编辑</span>
                                    </Link>
                                  : null
                          }
                        
                      </div>
                      <div className="row-menu-conent">
    
                          {/* 添加了部件 */}
                          {
                              item.element.length > 0  || item.manpower.length > 0 ? 
                              <>
                                 <Table columns={columns} pagination={false} dataSource={item.element} bordered />
                                 <Table columns={columnsjichu} pagination={false} dataSource={item.manpower} bordered />
                              </>
                              : 
                                this.props.prodetail.match.path === "/menu/product/ProductMy/ProductMyDetail/:id" ?
                                  <>
                                  <p className="init-word">
                                      <span>还未添加部件，</span>
                                      <Link to={'/menu/product/ProductMy/addpre/' + item.id}>前往添加</Link>
                                  </p>
                                  </>
                                  :
                                  <></>
                          }
                               {/* 未添加部件 */}

                     
                         
                      </div>
                  </div>
                  )
                })
              }
            




             </div>
        )
    }
}
