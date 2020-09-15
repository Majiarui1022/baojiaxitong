import React, { Component } from 'react';
import {Switch , Route , Redirect} from 'react-router-dom';
import './index.scss'
import ResponList from './ResponList'
import ResponDetail from './ResponDetail'
import PesponSetting from './PesponSetting'
export default class ProductRespon extends Component {
   
    render() {
       
        return (
            <div className="ProductRespon-box-pad">
              <Switch>
                  <Route component={ResponList} path='/menu/product/ProductRespon/responList'></Route>
                  <Route component={ResponDetail} path='/menu/product/ProductRespon/responDetail/:id'></Route>
                  <Route component={PesponSetting} path='/menu/product/ProductRespon/pesponsetting/:id'></Route>
                 <Redirect to="/menu/product/ProductRespon/responList" from="/menu/product/ProductRespon" exact/>
              </Switch>
            </div>
        )
    }
}
