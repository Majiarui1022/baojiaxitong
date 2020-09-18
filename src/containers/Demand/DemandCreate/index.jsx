import React, { Component } from 'react'

import './index.scss';

import DemandModel from '../DemandModel'


export default class DemandCreate extends Component {
    
    render() {
      
        return (
            <div className="DemandCreate-box-pad">
                <div className="DemandCreate-box-fat">
                    <DemandModel datailCategory={false} disSta={false}></DemandModel>
                </div>
            </div>
        )
    }
}
