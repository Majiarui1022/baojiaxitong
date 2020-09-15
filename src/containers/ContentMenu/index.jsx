import React, { Component } from 'react'
import {Route  , Switch , Redirect} from 'react-router-dom'

import './index.scss'

import Aside from '../../components/Aside'
import Header from '../../components/Header'


import Demand from '../Demand'
import Product from '../Product'
import Inventory from '../Inventory'
import Qutation from '../Qutation'
import Setting from '../Setting'
export default class ContentMenu extends Component {
  
    render() {
        return (
            <div className="index-content-fat">
                <div className="cont-fixed-box">
                    <div className="cont-pad-position">
                        <div className="cont-aside lf">
                            <Aside pos={this.props}></Aside>
                        </div>
                        <div className="cont-section lf">
                            <Header></Header>
                            <div className="cont-menu-fax">
                                <Switch>
                                    <Route component={Demand} path="/menu/demand"></Route>
                                    <Route component={Product} path="/menu/product"></Route>
                                    <Route component={Inventory} path="/menu/inventory" />
                                    <Route component={Qutation} path="/menu/qutation" />
                                    <Route component={Setting} path="/menu/setting" />
                                    <Redirect to="/menu/demand/demandmanager" from="/menu/demand" exact/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
