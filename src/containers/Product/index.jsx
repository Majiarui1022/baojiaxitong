import React, { Component } from 'react'
import {Route ,Switch , Redirect} from 'react-router-dom'


import './index.scss'

import ProductHeader from './ProductHeader'

import ProductMy from './ProductMy'
import ProductFat from './ProductFat'
import ProductRespon from './ProductRespon'

export default class Product extends Component {
    render() {
        return (
            <div className="Product-fat-box">
                <div className="Product-tit-header">
                    <ProductHeader></ProductHeader>
                </div>
                <Switch>
                    <Route component={ProductMy} path='/menu/product/ProductMy'></Route>
                    <Route component={ProductFat} path='/menu/product/ProductFat'></Route>
                    <Route component={ProductRespon} path='/menu/product/ProductRespon'></Route>
                    
                    <Redirect to="/menu/product/ProductMy/ProductMyList" from="/menu/product" exact/>
                </Switch>
            </div>
        )
    }
}
