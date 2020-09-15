import React, { Component } from 'react'


import './index.scss'
export default class NotFound extends Component {
    render() {
        return (
            <div className="NotFound-fat">
                <div className="NotFound-content">
                    <img src={[require("../../assets/contentmenu/notfound.png")]} alt=""/>
                    <p>您访问的界面不存在</p>
                </div>
            </div>
        )
    }
}
