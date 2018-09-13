/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './couponExplain.scss'
//导入样式 end



class Coupon extends Component{
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

            <Backbar $id="explain" title="说明">
                <div className="explain-wrap">
                    <dl className="explain-item">
                        <dt>如何获得奖券？</dt>
                        <dd>1.参加平台开展的各项活动，按照活动要求，满足条件即可获得相应的奖券。</dd>
                        <dd>2.平台活动不定期举行，请关注平台发布的活动公告。</dd>
                    </dl>
                    <dl className="explain-item">
                        <dt>如何使用奖券？</dt>
                        <dd>1.不同的奖券有不同的使用方法和条件，一般情况下，奖券再投资时使用，同时拥有多张奖券时，每次投资只能使用一张，不可重复累加使用。</dd>
                        <dd>2.奖券的使用条件根据活动内容而定，在活动页及奖券上均有标注。</dd>
                        <dd>3.请在奖券有效期内使用奖券，到期未使用则奖券作废。</dd>
                    </dl>






                </div>
            </Backbar>

        )
    }

}

export default Coupon;
