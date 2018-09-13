/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';
import Tip from '../../module/tip/tip';

//导入样式 start
import './withdrawing.scss'
//导入样式 end



class Withdrawing extends Component{
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

            <Backbar $id="myInvest" title="提现" backUrl="/my">

                <Tip title="提现申请处理中" describe='具体到账时间以各银行为准' phone={true} icon="time" button="我知道了" url="/my" />

            </Backbar>

        )
    }

}

export default Withdrawing;
