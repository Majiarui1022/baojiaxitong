import React, { Component } from 'react'
import {Link } from 'react-router-dom'

import './index.scss'
export default class History extends Component {
    render() {
        console.log(this.props.quire)
        return (
            <div className="history-fax-box">
                <div className="history-tit-fax">
                    <h2 className="tit-name lf">历史记录</h2>
                    <Link to={"/menu/setting/historyp/" + this.props.quire.id + '/' + this.props.quire.status} className="rf">更多</Link>
                </div>
                <div className="history-list-fax">
                    <ul>
                        {
                            this.props.historylist.map((item,index)=>{
                                return(
                                    <li key={item.id}>
                                        <i>{index + 1}、</i>
                                        <span>{item.create_time} {item.info}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
