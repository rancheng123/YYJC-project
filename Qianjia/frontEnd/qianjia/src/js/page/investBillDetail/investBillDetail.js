/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';


//导入样式 start
import './investBillDetail.scss'
//导入样式 end



class InvestBillDetail extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        let that = this;
        this.state = {
            investBillData : {}, //投资账单
            showNum : 0,     //0渲染renderInvestBill  1渲染renderConsumeBill
            consumeList : ""    //获取消费列表
        }

        Utils.tokenExpireJumpToLogin(function(){
            that.getInvestBill();
            that.getConsumeBill();
        })
        
    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end


    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    // 获取投资账单
    getInvestBill(){

        var that = this;
    
        Utils.requestData({
            url: config.api +"qj/front/v1/investOrder/getInvestOrderDetail",
            method: 'post',
            data: {
                "orderId": Utils.Url.parseUrl(location.href).params.orderId
            },
            callback: function(data){
                console.log("getInvestOrderDetail::",data);
                if(data.resultCode=="0"){
                    
                    componentStore.update(that,{
                        investBillData : data.data
                    });

                }
            }
        });
        
    }

    // 渲染投资账单
    renderInvestBill(){
       
        var that = this;
        var investBillData = this.state.investBillData;
       
        if(investBillData.orderType==1){    //之前的投资订单类型
            
            return(
                <div className="g-bill-detail">
                    <ul className="g-d-list">
                        <li>
                            <b>订单号</b>
                            <span>{investBillData.oId}</span>
                        </li>
                        <li>
                            <b>项目名称</b>
                            <span>{investBillData.projectTitle}</span>
                        </li>
                        <li>
                            <b>投资日期</b>
                            <span>{investBillData.orderDate}</span>
                        </li>
                    </ul>
                    <ul className="g-d-list">
                        <li>
                            <b>预期年化回报率</b>
                            <span>
                                {investBillData.orderYield}%
                                {(()=>{
                                    if(investBillData.orderAddYield!=0){
                                        return "+"+ investBillData.orderAddYield +"%"
                                    }
                                })()}
                            </span>
                        </li>
                        <li>
                            <b>项目期限</b>
                            <span>{investBillData.investTimeLimit}</span>
                        </li>
                        <li>
                            <b>预期收益</b>
                            <span>{investBillData.preInterestAmount}元</span>
                        </li>
                        <li>
                            <b>加息特权</b>
                            <span>{investBillData.inviteYield}%</span>
                        </li>
                    </ul>
                    <ul className="g-d-list">
                        <li>
                            <b>投资金额</b>
                            <span>{investBillData.investAmount}元</span>
                        </li>
                        <li>
                            <b>抵现券</b>
                            <span>{investBillData.investAmount - investBillData.payAmount}元</span>
                        </li>
                        <li>
                            <b>实际支付</b>
                            <span>{investBillData.payAmount}元</span>
                        </li>
                    </ul>
                    <ul className="g-d-list">
                        <li>
                            <b>到期日期</b>
                            <span>{investBillData.repayStartDate}</span>
                        </li>
                        <li>
                            <b>剩余本金</b>
                            <span>{investBillData.surplusPrincipal}元</span>
                        </li>
                    </ul>
                </div>
            )

        }else if(investBillData.orderType==2){  //0元购

            console.log('999');
            return(
                <div className="g-bill-detail">
                    <ul className="g-d-list">
                        <li>
                            <b>订单号</b>
                            <span>{investBillData.oId}</span>
                        </li>
                        <li>
                            <b>项目名称</b>
                            <span>{investBillData.projectTitle}</span>
                        </li>
                        <li>
                            <b>投资日期</b>
                            <span>{investBillData.orderDate}</span>
                        </li>
                    </ul>
                    <ul className="g-d-list">
                        <li>
                            <b>预期年化回报率</b>
                            <span>
                                {investBillData.orderYield}%
                                {(()=>{
                                    if(investBillData.orderAddYield!=0){
                                        return "+"+ investBillData.orderAddYield +"%"
                                    }
                                })()}
                            </span>
                        </li>
                        <li>
                            <b>项目期限</b>
                            <span>{investBillData.investTimeLimit}</span>
                        </li>
                        <li>
                            <b>预期收益</b>
                            <span>{investBillData.preInterestAmount}元</span>
                        </li>
                    </ul>
                    <ul className="g-d-list">
                        <li>
                            <b>投资金额</b>
                            <span>{investBillData.investAmount}元</span>
                        </li>
                        <li>
                            <b>到期日期</b>
                            <span>{investBillData.repayStartDate}</span>
                        </li>
                        <li>
                            <b>剩余本金</b>
                            <span>{investBillData.surplusPrincipal}元</span>
                        </li>
                    </ul>
                </div>
            )
        }
      
    }

    // 获取消费账单
    getConsumeBill(){
        var that = this;
        Utils.requestData({
            url: config.api +"qj/front/v1/principalConsume/getConsumeListByOid",
            method: 'post',
            data: {
                "oId": Utils.Url.parseUrl(location.href).params.oId
            },
            callback: function(data){
                console.log('getConsumeListByOid=====',data);
                
                if(data.resultCode=="0"){
                    
                    componentStore.update(that,{
                        consumeList : data.data
                    });

                }
                
            }
        });
    }

    // 渲染消费账单
    renderConsumeBill(){
        var that = this;
        console.log("consumeList===",that.state.consumeList);
        return (
            <div className="g-bill-detail consumeBill-box">
                <ul className="g-d-list">
                    {(()=>{

                        // if(that.state.consumeList==="")return false;

                        if(that.state.consumeList.length>0){
                            return that.state.consumeList.map(function(item,index){
                                if(item.type==1){  //消费
                                    
                                    return (
                                        <li key={index}>
                                            <div className="i-left">
                                                <h4>消费-{item.pMerchantName}</h4>
                                                <p>消费订单：{item.poid}</p>
                                                <p>{item.operationTime}</p>
                                            </div>
                                            <span className="i-money">-{item.deductedAmount}</span>
                                        </li>
                                    )
                                
                                }else if(item.type==2){     //退款
        
                                    <li className="refund-box" key={index}>
                                        <div>
                                            <h4>消费退款</h4>
                                            <p>消费订单：{item.poid}</p>
                                            <p>{item.operationTime}</p>
                                        </div>
                                        <span className="i-money">+{item.deductedAmount}</span>
                                    </li>
        
                                }
                                
        
                            })
                        }else{
                            return (
                                <li className="noData">
                                    <span>无</span>
                                </li>
                            )
                        }
                        
                    })()}
                    
                </ul>
                
            </div>
        )

    }
   
    

    render(){
        var that = this;
        var investBillData = that.state.investBillData;
        return (
            <Backbar $id="investBillDetail" title="账单详情" action="ellipsis">
                <div className="investBillDetail-wrap">
                    <div className="bill-title">
                        <h3 className="active" ref="investBill" onClick={()=>{
                           
                            this.refs.investBill.setAttribute('class','active');
                            this.refs.consumeBill.setAttribute('class','');
                            componentStore.update(that,{
                                showNum : 0
                            });

                        }}>
                            投资账单
                        </h3>
                        <h3 ref="consumeBill" onClick={()=>{

                            this.refs.investBill.setAttribute('class','');
                            this.refs.consumeBill.setAttribute('class','active');
                            componentStore.update(that,{
                                showNum : 1
                            });

                        }}>
                            消费账单
                        </h3>
                    </div>
                    

                    {that.state.showNum==0?that.renderInvestBill():that.renderConsumeBill()}

                    

                </div>
            </Backbar>
        )
    }

}

export default InvestBillDetail;
