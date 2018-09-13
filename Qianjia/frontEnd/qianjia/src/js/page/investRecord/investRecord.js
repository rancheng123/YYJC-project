/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './investRecord.scss'
//导入样式 end



class InvestRecord extends Component{
    constructor(){
        super();
        let that = this;
        this.state = {
            recordData : []
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/investOrder/getInvestorList',
                method: 'post',
                data:{
                    "productId": Utils.Url.parseUrl(location.href).params.productId
                },
                callback: function(data){
                    console.log('InvestRecord',data);
                    if(data.resultCode==0){
                        componentStore.update(that,{
                            recordData : data.data.investorList
                        });
                    }
                }
            });
        })
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

    renderList(){
        let recordData = this.state.recordData;
        if(recordData.length>0){
            return (
                recordData.map(function(item,index){
                    return (
                        <li key={index}>
                            <span>{ item.phone.split( item.phone.substring(3,7) ).join('****') }</span>
                            <span>{item.investAmount}</span>
                            <span>{item.orderDateStr.split(" ")[0]}</span>
                        </li>
                    )
                })

            )
        }else{
            return (
                <li></li>
            )
        }
    }
    render(){

        return (

            <Backbar $id="myInvest" title="投资记录">

                <div className="investRecord-wrap">
                    <div className="g-list-box">
                        <ul className="g-list">
                            <li>
                                <span>用户名</span>
                                <span>投资金额（元）</span>
                                <span>投资时间</span>
                            </li>
                            {this.renderList()}
                        </ul>
                    </div>
                </div>

            </Backbar>

        )
    }

}

export default InvestRecord;
