import React, { Component } from 'react';
import {Switch , Route , Redirect} from 'react-router-dom';
import './index.scss'

import ProductMyList from './ProductMyList'
import ProductMyDetail from './ProductMyDetail'
import BorderCollie from './BorderCollie'
import AddPre from './AddPre'
export default class ProductMy extends Component {
    
    render() {
        
        return (
           <div className="pro-falt-fox">
              <Switch>
                <Route component={ProductMyList} path="/menu/product/ProductMy/ProductMyList"></Route>
                <Route component={ProductMyDetail} path="/menu/product/ProductMy/ProductMyDetail/:id"></Route>
                <Route component={BorderCollie} path="/menu/product/ProductMy/bordercollie/:id"></Route>
                <Route component={AddPre} path="/menu/product/ProductMy/addpre/:id"></Route>


                <Redirect to="/menu/product/ProductMy/ProductMyList" from="/menu/product/ProductMy" exact/>
              
              </Switch>
           </div>
        )
    }
}
