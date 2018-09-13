/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './expenseDetail.scss'
//导入样式 end



class ExpenseDetail extends Component{
    constructor(){
        super();

        this.state = {
            //可消费金额
            okConsume : 0,
            //近期待还金额
            freezePrincipal : 0,

            consumeList : ""
        }
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态

        Utils.tokenExpireJumpToLogin(function () {

            //获取可消费本金余额
            Utils.requestData({
                url: config.api +"qj/front/v1/principalConsume/getOkConsume",
                method: 'post',
                data: {

                },
                callback: function(data){
                    console.log('getOkConsume:',data);
                    if(data.resultCode=="0"){

                        componentStore.update(that,{
                            okConsume : data.data.okConsume,   //可消费金额
                            freezePrincipal : data.data.freezePrincipal     //近期待还金额
                        })

                    }
                    
                }
            });
            
            //获取本金消费列表
            Utils.requestData({
                url: config.api +"qj/front/v1/principalConsume/getConsumeList",
                method: 'post',
                data: {

                },
                callback: function(data){
                    console.log('getConsumeList:',data);
                    componentStore.update(that,{
                        consumeList : data.data
                    })
                    
                }
            });
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

    
   

    render(){
        var that = this;
        return (
            <Backbar $id="expenseDetail" title="本金消费明细"  action="consumpeQ">
                
                <div className="expenseDetail-wrap">
                    
                    <div className="e-tip">
                        <i></i>
                        <span>项目到期前一日，可消费本金将转为待还本金状态，不可进行消费。</span>
                    </div>
                    <div className="e-show">
                        <h4>可消费本金</h4>
                        <div className="e-money">
                            <span>￥</span>
                            {that.state.okConsume}
                        </div>
                        <p className="e-rencent">近期待还本金： ￥{that.state.freezePrincipal}</p>
                    </div>
                    <div className="e-list">
                        {(()=>{
                            if(that.state.consumeList==="")return false;
                            if(that.state.consumeList.length>0){
                                return that.state.consumeList.map(function(item,index){

                                    return (
                                        <div className="g-bill-detail" key={index}>
                                            <h2 className="e-year">
                                                {item.group}
                                            </h2>
                                            {(()=>{

                                                return item.records.length>0&&item.records.map(function(childItem,childIndex){
    
                                                    return (
                                                        <ul className="g-d-list" key={childIndex}>

                                                            {(()=>{

                                                                if(childItem.type==1){  //消费

                                                                    return (

                                                                        <li onClick={()=>{
                                                                            
                                                                            Utils.switchRoute("/consumptionInfo?consumeId="+childItem.pcId);
                                        
                                                                        }}>
                                                                            <div>
                                                                                <h4>消费-{childItem.pMerchantName}</h4>
                                                                                <p>{childItem.transactionTime}</p>
                                                                            </div>
                                                                            <span>-{childItem.vAmount}</span>
                                                                        </li>

                                                                    )

                                                                }else if(childItem.type==2){    //退款

                                                                    return (
                                                                        
                                                                        <li className="add-box" onClick={()=>{
                                                                            
                                                                            Utils.switchRoute("/consumptionInfo?consumeId="+childItem.pcId);
                                        
                                                                        }}>
                                                                            <div>
                                                                                <h4>消费退款</h4>
                                                                                <p>{childItem.transactionTime}</p>
                                                                            </div>
                                                                            <span>+{childItem.vAmount}</span>
                                                                        </li>

                                                                    )
                                                                        

                                                                }

                                                            })()}

                                                        </ul>
                                                    )
    
                                                })

                                            })()}

                                            
                                            
                                        </div>
                                    )

                                })
                               
                            }else{

                                return (
                                    <div className="noData">
                                        <i className=""></i>
                                        <h2>您还没有消费订单~</h2>
                                        <p>体验本金可花，收益不变！快去下载哔咯返现app体验</p>
                                    </div>
                                )

                            }

                        })()}
                        
                    </div>
                </div>

            </Backbar>
        )
    }

}

export default ExpenseDetail;
