import React, { Component } from 'react'



import './index.scss'
export default class Header extends Component {
    state = {
        userinfo : JSON.parse(sessionStorage.getItem('userinfo'))
    }
    componentDidMount(){
        console.log()
    }
    render() {
        return (
            <div className="header">
                <div className="user-info rf">
                    <div className="user-head lf">

                    </div>
                    <div className="user-name lf">
                        <span>{this.state.userinfo.name}</span>
                    </div>
                </div>
            </div>
        )
    }
}
