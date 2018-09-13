
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
//导入样式 start
import './autoBid.scss'
//导入样式 end



class AutoBidList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            ruleList : []
        }

        Utils.tokenExpireJumpToLogin(function () {
            //查询余额接口
            Utils.requestData({
                url: config.api + 'qj/front/v1/autoInvest/getMemberAutoInvestRuleList',
                method: 'post',
                data:{},
                callback: function(data){
                
                    if(data.data.length<=0){
                        Utils.switchRoute('/my');
                    }else{
                        componentStore.update(that,{
                            ruleList : data.data
                        })
                    }

                }
            });


        })

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oAutoBidList = document.getElementById('autoBidList');
        var parentHeight = oAutoBidList.parentNode.offsetHeight;

        oAutoBidList.style.minHeight = parentHeight+"px";
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };


    render(){
        let that = this;
        return (
            <div className="autoBidList-wrap">
                <Backbar $id="autoBidList" title="自动投标"  action="autoBid">
                    <div className="a-box" id="autoBidList">
                        <table className="a-table">

                            <tr>
                                <th>投资金额</th>
                                <th>年化回<br/>报率</th>
                                <th>项目期限</th>
                                <th>账户保留<br/>金额(元)</th>
                                <th>当前排名</th>
                            </tr>

                            {(()=>{
                                if(that.state.ruleList.length.length==0)return false;
                                return that.state.ruleList.map(function(item,index){

                                    return (
                                        <tr key={index} onClick={()=>{
                                            let urlParamStr = "investAmount="+item.investAmount+"&yearRate="+item.yearRate+"&projectPeriodMonth="+item.projectPeriodMonth+"&reservedAmount="+item.reservedAmount+"&isMatchCoupon="+item.isMatchCoupon+"&ruleId="+item.ruleId+"&listLength="+that.state.ruleList.length;
                                            Utils.switchRoute('/autoBidInfoEdit?'+urlParamStr);
                                        }}>
                                            <td>{item.investAmount}</td>
                                            <td>{item.yearRate}%</td>
                                            <td>{item.projectPeriodMonth}天</td>
                                            <td>{item.reservedAmount}</td>
                                            <td>{item.rulePosition}</td>
                                        </tr>
                                    )
                                })
                            })()}


                        </table>
                    </div>
                </Backbar>
                <div className={
                    (()=>{
                        if(that.state.ruleList.length<3){
                            return "a-newAdd";
                        }else{
                            return "a-newAdd disabled";
                        }
                    })()
                } onClick={()=>{
                    if(that.state.ruleList.length<3){
                         Utils.switchRoute('/autoBidInfo');
                    }
                }}>
                    新增
                </div>
            </div>
        )
    }

}

export default AutoBidList;
