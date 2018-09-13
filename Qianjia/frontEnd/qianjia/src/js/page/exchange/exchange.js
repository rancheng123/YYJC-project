/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './exchange.scss'
//导入样式 end



class Exchange extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    render(){

        return (

            <Backbar $id="exchange" title="兑换成功">
                <div className="exchange-wrap">
                    <div className="e-success-box">
                        <div className="s-yes">
                            <i></i>
                        </div>
                        <div className="s-text">
                            <p>您已兑换成功</p>
                            <p>我们将在<span>7个</span>工作日内寄出</p>
                            <p>可在<span>[个人中心]</span>-<span>[我的赠品]</span>页查看</p>
                        </div>
                        <a href="/exchangeDetail" className="s-look">点击查看</a>
                    </div>
                </div>
            </Backbar>

        )
    }

}

export default Exchange;
