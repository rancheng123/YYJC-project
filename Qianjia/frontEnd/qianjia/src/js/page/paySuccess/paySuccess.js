/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';
import Tip from '../../module/tip/tip';

//导入样式 start
import './paySuccess.scss'
//导入样式 end



class PaySuccess extends Component{
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

            <Backbar $id="myInvest" title="充值" backUrl="/my">

                <Tip title="充值成功" describe="您的资金已由陕坝农商银行进行全面存管" icon="money" />

            </Backbar>

        )
    }

}

export default PaySuccess;
