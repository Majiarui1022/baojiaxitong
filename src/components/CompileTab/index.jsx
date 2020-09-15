import React, { Component } from 'react'

import {Link } from 'react-router-dom'
import { Table, Input } from 'antd';

import './index.scss'
export default class CompileTab extends Component {
    state = {
      tabList : [],
      dataList:[]
    }
    componentWillReceiveProps(data){
      console.log(data);
      if( data.values == undefined)return
      for(var i in data.values.designs){
        for(var j in data.values.designs[i].element){
            data.values.designs[i].element[j].key = data.values.designs[i].element[j].id
        }
        for(var x in data.values.designs[i].manpower){
            data.values.designs[i].manpower[x].key = data.values.designs[i].manpower[x].id
        }
      }
      this.setState({
        tabList : data.values.designs
      },()=>{
        var LIST = this.state.tabList
        var lists = []
        var str = 0
        for (var x in LIST) {
            var arr = [...LIST[x].element, ...LIST[x].manpower,]
            var obj = {
                id:x * 1 + 1,
                name: LIST[x].name,
                price: 0,
                num: LIST[x].num,
                discount: LIST[x].discount,
                priceT: 0,
                key:x * 1 + 1 
            }
            for (var i in arr) {
                if(arr[i].quoted_price > 0){
                    obj.price += Math.round(arr[i].quoted_price * arr[i].num * 1)
                }else{
                    obj.price += Math.round(arr[i].unit_price * arr[i].num * 1)
                }
            }
            obj.priceT +=  Math.round(obj.price * LIST[x].num * LIST[x].discount * 100)/100
            lists.push(obj)
        }
        for (var i in lists) {
          str += lists[i].priceT;
        }
        var objTwo = {
          id:lists.length+1,
          name: '不含税总价',
          price:str,
          num: 0,
          discount: 0,
          priceT: 0,
          key:lists.length+1
        }
        lists.push(objTwo)

        var objThree = {
          id:lists.length+1,
          name: '含税优惠总价/含税优惠价',
          price:data.values.tax_price,
          num: 0,
          discount: 0,
          priceT: 0,
          key:lists.length+1
        }
        lists.push(objThree)
        console.log(lists)
        this.setState({
            dataList: lists
        }, () => {
          console.log(this.state.dataList)
            // var str = 0
            // var strT = 0
            // for (var i in this.state.dataList) {
            //     str += this.state.dataList[i].priceT;
            //     strT += this.state.dataList[i].priceT
            // }
            // this.setState({
            //     sum: Math.round(str*100)/100
            // })
            // if (this.state.sumt.status === false) {
            //     this.setState({
            //         sumt: {
            //             ...this.state.sumt,
            //             price: strT
            //         }
            //     }, () => {
            //     })
            // }
        })
      })
      
    }
    componentWillUnmount() {
      this.setState = ()=>false;
    }
    render() {
        const renderContent = (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            return obj;
          };
          const renderContentTwo = (value , row , indx) => {
            const obj = {
              children: value,
              props: {},
            };
            if(row.num == 0){
              obj.props.colSpan = 5;
            }
            return obj;
          }

          const renderContentThree = (value , row , indx) => {
            const obj = {
              children: value,
              props: {},
            };
            if(row.num == 0){
              obj.props.colSpan = 0;
            }
            return obj;
          }
          
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
              title: '成本单价(元)',
              dataIndex: 'unit_price',
              width:150,
              render: renderContent,
            },
            {
              title: '报价单价',
              dataIndex: 'quoted_price',
              width:150,
              render: renderContent,
            },
            {
              title: '小计',
              dataIndex: '',
              width:150,
              render: (text, row, index) => {
                  const obj = {
                    children :  Math.round(row.quoted_price ? row.quoted_price * row.num * 100: row.unit_price * row.num * 100)/100,
                    props :{}
                }
                  return obj;
                },
              },
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
        
          if(this.props.ShowSum.status){
            columns = [...columns , ...arr];
            columnsjichu = [...columnsjichu , ...arr];
          }
          const titlesum = [
            {
              title: '序号',
              dataIndex: 'id',
              render:renderContent,
            },
            {
              title: '设备',
              dataIndex: 'name',
              render:renderContent,
            },
            {
              title: '单价',
              dataIndex: 'price',
              render:renderContentTwo,
            },
            {
              title: '数量',
              dataIndex: 'num',
              render:renderContentThree,
            },
            {
              title: '折扣',
              dataIndex: 'discount',
              render:renderContentThree,
            },
            {
              title: '不含税优惠价',
              dataIndex: 'priceT',
              render:renderContentThree,
            },
          ]
        return (
            <div className="product-info-content">

              <div className="row-menu">
                <div className="row-menu-tit but-active">
                  <div className="title-name">报价基础</div>
                </div>
                <div className="row-menu-conent">
                  <Table columns={titlesum} pagination={false} bordered dataSource={this.state.dataList} />
                </div>
              </div>



              {
                (this.state.tabList || []).map(item =>{
                  return(
                    <div className="row-menu" key={item.id}>
                      <div className="row-menu-tit but-active">
                          <div className="title-name">{item.name}（数量：{item.num}）</div>
                          {/* {
                                  item.element.length > 0  || item.manpower.length > 0 ? 
                                    <Link className="setting-but" to={'/menu/product/ProductMy/addpre/' + item.id}>
                                      <img src={[require("../../assets/product/chs.png")]} alt=""/>
                                      <span>编辑</span>
                                    </Link>
                                  : null
                          } */}
                        
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
                                <>
                                 <p className="init-word">
                                    <span>还未添加部件，</span>
                                    <Link to={'/menu/product/ProductMy/addpre/' + item.id}>前往添加</Link>
                                </p>
                                </>
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
