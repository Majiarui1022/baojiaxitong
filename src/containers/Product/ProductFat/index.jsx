import React, { Component } from 'react';

import { Route , Switch , Redirect} from 'react-router-dom'

import productFatList from './productFatList'
import ProductFatDetail from './ProductFatDetail'

import './index.scss'

export default class ProductFat extends Component {
   render () {
     return (
       <div className="pro-falt-fox">
          <Switch>
            <Route component={productFatList} path="/menu/product/ProductFat/productFatList"></Route>
            <Route component={ProductFatDetail} path="/menu/product/ProductFat/productFatDetail/:id"></Route>
            
            <Redirect to="/menu/product/ProductFat/productFatList" from="/menu/product/ProductFat" exact/>
          </Switch>
       </div>
     )
   }
}
