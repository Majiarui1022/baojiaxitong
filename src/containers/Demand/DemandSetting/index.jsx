import React, { Component } from 'react'

import DemandModel from '../DemandModel'
import History from '../../../components/History'
import './index.scss'

export default class DemandSetting extends Component {
    render() {
        return (
            <div className="DemandSetting-fat">
                <div className="DemandSetting-box-fat">
                    <DemandModel />
                    <History />
                </div>
            </div>
        )
    }
}
