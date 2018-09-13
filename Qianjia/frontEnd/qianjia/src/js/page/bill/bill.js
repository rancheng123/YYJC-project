/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './bill.scss'
//导入样式 end

class Bill extends Component{
    constructor(){
        super();
        var that = this;
        this.state = {
            orderData : null
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData2({
                requestArr:  [
                    //获取投资订单详情
                    {
                        url: config.api +"qj/front/v1/investOrder/getInvestOrderDetail",
                        method: 'post',
                        data: {
                            "orderId": Utils.Url.parseUrl(location.href).params.orderId
                        }
                    }
                ],
                callback: function(dataArr){
                    //获取投资订单详情
                    console.log('bill---',dataArr);
                    var orderData = dataArr[0];
                    if(orderData.resultCode==0){
                        componentStore.update(that,{
                            orderData : orderData.data
                        });

                    }

                }
            })
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

    render(){
        var that = this;
        var params = Utils.Url.parseUrl(location.href).params;

        let orderData = that.state.orderData;
        if(!orderData){
            return (
                <div></div>
            )
        }else{
            return (
                <Backbar
                    $id="bill"
                    title="账单详情"
                    action="ellipsis"
                    projectType={orderData.projectType}
                >
                    <div className="bill-wrap">

                        {
                            (()=>{
                                let urlParams = Utils.Url.parseUrl(location.href).params;
                                let titleInfo = urlParams.titleInfo;
                                let isAutoInvest = urlParams.isAutoInvest;

                                if(isAutoInvest=="2"){  //自动投标

                                    if(titleInfo=="交易关闭"){
                                        return (
                                            <div className="tip-bar t-close">
                                                <span>{titleInfo}</span>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="tip-bar t-orange">
                                                <Icon type={require("../../../image/svg/yuan.svg")} size="xs" />
                                                <span>{titleInfo}</span>
                                            </div>
                                        )
                                    }


                                }else{

                                    if(titleInfo=="交易关闭"){
                                        return (
                                            <div className="tip-bar t-close">
                                                <span>{titleInfo}</span>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="tip-bar t-red">
                                                <Icon type={require("../../../image/svg/yuan.svg")} size="xs" />
                                                <span>{titleInfo}</span>
                                            </div>
                                        )
                                    }

                                }

                            })()
                        }


                        <div className="g-bill-detail">
                            <ul className="g-d-list">
                                <li>
                                    <b>订单号</b>
                                    <span>{orderData.oId}</span>
                                </li>
                                <li>
                                    <b>项目名称</b>
                                    <span>{orderData.projectTitle}</span>
                                </li>
                                <li>
                                    <b>投资日期</b>
                                    <span>{orderData.orderDate}</span>
                                </li>
                            </ul>
                            <ul className="g-d-list">
                                <li>
                                    <b>预期年化回报率</b>
                                    <span>
                                        {orderData.orderYield}%
                                        {
                                            (()=>{
                                                if(orderData.orderAddYield!=0){
                                                    return "+"+ orderData.orderAddYield +"%"
                                                }
                                            })()
                                        }
                                    </span>
                                </li>
                                <li>
                                    <b>项目期限</b>
                                    <span>{orderData.investTimeLimit}</span>
                                </li>
                                <li>
                                    <b>预期收益</b>
                                    <span>{orderData.preInterestAmount}元</span>
                                </li>
                                <li>
                                    <b>加息特权</b>
                                    <span>{orderData.inviteYield}%</span>
                                </li>
                                <li>
                                    <b>抵现券</b>
                                    <span>{orderData.investAmount - orderData.payAmount}元</span>
                                </li>
                            </ul>
                            <ul className="g-d-list">
                                <li>
                                    <b>投资金额</b>
                                    <span>{orderData.investAmount}元</span>
                                </li>
                                <li>
                                    <b>实际支付</b>
                                    <span>{orderData.payAmount}元</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bill-progress">

                            {
                                (()=>{

                                    //投资成功正在还款的状态展示
                                    if((orderData.projectType == 6 && orderData.orderStatus == 5 && orderData.capitalRepayStatus != 2) || (orderData.projectType != 6 && orderData.orderStatus == 2 && orderData.capitalRepayStatus != 2)){
                                        return (
                                            <ul className="p-list">
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yes"></i>
                                                        </div>
                                                        <div className="p-line p-down p-true"></div>
                                                    </div>
                                                    <h3 className="t-title">开始计算收益</h3>
                                                    <p className="t-time">{orderData.repayStartDate?orderData.repayStartDate.split(" ")[0]:""}</p>
                                                </li>
                                                {
                                                    orderData.orderDetailList.map(function(item,index){
                                                        if(item.detailType == 2){
                                                            if(item.detailStatus == 0){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yuan"></i>
                                                                            </div>
                                                                            <div className="p-line p-up"></div>
                                                                            <div className="p-line p-down"></div>
                                                                        </div>
                                                                        <h3 className="t-title">计息结束，收益金额{item.interestAmountStr}元</h3>
                                                                        <p className="t-time">{item.repayDateStr?item.repayDateStr.split(" ")[0]:""}</p>
                                                                    </li>
                                                                )
                                                            }else if(item.detailStatus == 1){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yes"></i>
                                                                            </div>
                                                                            <div className="p-line p-up p-true"></div>
                                                                            <div className="p-line p-down p-true"></div>
                                                                        </div>
                                                                        <h3 className="t-title">计息结束，收益金额{item.interestAmountStr}元</h3>
                                                                        <p className="t-time">{item.repayDateStr?item.repayDateStr.split(" ")[0]:""}</p>
                                                                    </li>
                                                                )
                                                            }
                                                        }else if(item.detailType == 3){
                                                            if(item.detailStatus == 0){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yuan"></i>
                                                                            </div>
                                                                            <div className="p-line p-up"></div>
                                                                        </div>
                                                                        <h3 className="t-title">本金结算完成，本金余额{item.investAmount}元</h3>
                                                                        <p className="t-time">{item.repayDateStr?item.repayDateStr.split(" ")[0]:""}</p>
                                                                    </li>
                                                                )
                                                            }else if(item.detailStatus == 1){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yes"></i>
                                                                            </div>
                                                                            <div className="p-line p-up p-true"></div>
                                                                        </div>
                                                                        <h3 className="t-title">本金结算完成，本金余额{item.investAmount}元</h3>
                                                                        <p className="t-time">{item.repayDateStr?item.repayDateStr.split(" ")[0]:""}</p>
                                                                    </li>
                                                                )
                                                            }
                                                        }
                                                    })
                                                }


                                            </ul>
                                        )
                                    }

                                    //投资成功还款完成
                                    if((orderData.capitalRepayStatus == 2 && orderData.orderStatus == 2) || (orderData.capitalRepayStatus == 2 && orderData.orderStatus == 5)){
                                        return (
                                            <ul className="p-list">
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yes"></i>
                                                        </div>
                                                        <div className="p-line p-down p-true"></div>
                                                    </div>
                                                    <h3 className="t-title">开始计算收益</h3>
                                                    <p className="t-time">{orderData.repayStartDate}</p>
                                                </li>
                                                {
                                                    orderData.orderDetailList.map(function(item,index){
                                                        if(item.detailType == 2){
                                                            if(item.detailStatus == 0){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yuan"></i>
                                                                            </div>
                                                                            <div className="p-line p-up"></div>
                                                                            <div className="p-line p-down"></div>
                                                                        </div>
                                                                        <h3 className="t-title">计息结束，收益金额{item.interestAmountStr}元</h3>
                                                                        <p className="t-time">{item.repayDateStr}</p>
                                                                    </li>
                                                                )
                                                            }else if(item.detailStatus == 1){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yes"></i>
                                                                            </div>
                                                                            <div className="p-line p-up p-true"></div>
                                                                            <div className="p-line p-down p-true"></div>
                                                                        </div>
                                                                        <h3 className="t-title">计息结束，收益金额{item.interestAmountStr}元</h3>
                                                                        <p className="t-time">{item.repayDateStr}</p>
                                                                    </li>
                                                                )
                                                            }
                                                        }else if(item.detailType == 3){
                                                            if(item.detailStatus == 0){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yuan"></i>
                                                                            </div>
                                                                            <div className="p-line p-up"></div>
                                                                        </div>
                                                                        <h3 className="t-title">本金结算完成，本金余额{item.investAmount}元</h3>
                                                                        <p className="t-time">{item.repayDateStr}</p>
                                                                    </li>
                                                                )
                                                            }else if(item.detailStatus == 1){
                                                                return (
                                                                    <li key={index}>
                                                                        <div className="p-show">
                                                                            <div className="p-icon">
                                                                                <i className="i-icon i-yes"></i>
                                                                            </div>
                                                                            <div className="p-line p-up p-true"></div>
                                                                        </div>
                                                                        <h3 className="t-title">本金结算完成，本金余额{item.investAmount}元</h3>
                                                                        <p className="t-time">{item.repayDateStr}</p>
                                                                    </li>
                                                                )
                                                            }
                                                        }
                                                    })
                                                }


                                            </ul>
                                        )
                                    }


                                    //退款流程展示状态
                                    if(orderData.orderStatus == 6){
                                        return (
                                            <ul className="p-list">
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yes"></i>
                                                        </div>
                                                        <div className="p-line p-down p-true"></div>
                                                    </div>
                                                    <h3 className="t-title">退款中，金额{orderData.payAmount}元</h3>
                                                    <p className="t-time">{orderData.interestStartDate?orderData.interestStartDate.split(" ")[0]:""}</p>
                                                </li>
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yuan"></i>
                                                        </div>
                                                        <div className="p-line p-up"></div>
                                                    </div>
                                                    <h3 className="t-title">退款成功，请查收{orderData.payAmount}元</h3>
                                                    <p className="t-time">{orderData.interestEndDate?orderData.interestEndDate.split(" ")[0]:""}</p>
                                                </li>

                                            </ul>
                                        )
                                    }

                                    //退款成功展示状态
                                    if(orderData.orderStatus == 8 || orderData.orderStatus == 7){
                                        return (
                                            <ul className="p-list">
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yes"></i>
                                                        </div>
                                                        <div className="p-line p-down p-true"></div>
                                                    </div>
                                                    <h3 className="t-title">退款中，金额{orderData.payAmount}元</h3>
                                                    <p className="t-time">{orderData.interestStartDate?orderData.interestStartDate.split(" ")[0]:""}</p>
                                                </li>
                                                <li>
                                                    <div className="p-show">
                                                        <div className="p-icon">
                                                            <i className="i-icon i-yes"></i>
                                                        </div>
                                                        <div className="p-line p-up p-true"></div>
                                                    </div>
                                                    <h3 className="t-title">退款成功，请查收{orderData.payAmount}元</h3>
                                                    <p className="t-time">{orderData.interestEndDate?orderData.interestEndDate.split(" ")[0]:""}</p>
                                                </li>

                                            </ul>
                                        )
                                    }

                                })()
                            }
                        </div>
                    </div>
                </Backbar>
            )
        }

    }

}

export default Bill;
