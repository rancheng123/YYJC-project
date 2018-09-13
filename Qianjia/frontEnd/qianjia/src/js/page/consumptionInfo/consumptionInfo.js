/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './consumptionInfo.scss'
//导入样式 end



class ConsumptionInfo extends Component{
    constructor(){
        super();
        this.state = {
            consumeDetails : {
                consume : {},
                consumeDetailsList : []
            }
        }
    }
    componentWillMount(){

        //在此处初始化状态
        var that = this;
      
        Utils.tokenExpireJumpToLogin(function () {
            
            //获取本金消费详情
            Utils.requestData({
                url: config.api +"qj/front/v1/principalConsume/getConsumeDetails",
                method: 'post',
                data: {
                    consumeId : Utils.Url.parseUrl(location.hash).params.consumeId
                },
                callback: function(data){
                    console.log('getConsumeDetails:',data);
                    if(data.resultCode=="0"){

                        that.state.consumeDetails.consume = data.data.consume;
                        that.state.consumeDetails.consumeDetailsList = data.data.consumeDetailsList;

                        componentStore.update(that,{
                            consumeDetails: that.state.consumeDetails
                        })

                    }
                    
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
            <Backbar $id="consumptionInfo" title="消费详情">
                
                <div className="consumptionInfo-wrap">
                    
                    <div className="g-bill-detail">
                        <ul className="g-d-list">
                            <li>
                                <h4>支付金额：</h4>
                                <p><b>￥</b>{that.state.consumeDetails.consume.vAmount}</p>
                            </li>
                        </ul>
                        <ul className="g-d-list">
                            <li>
                                <h4>商户名称</h4>
                                <div>
                                    <p>{that.state.consumeDetails.consume.pMerchantName}</p>
                                </div>
                            </li>
                            <li>
                                <h4>交易时间</h4>
                                <div>
                                    <p>{that.state.consumeDetails.consume.transactionTime}</p>
                                </div>
                            </li>
                            <li>
                                <h4>消费订单号</h4>
                                <div>
                                    <p>{that.state.consumeDetails.consume.pOid}</p>
                                </div>
                            </li>
                            <li>
                                <h4>本金订单号</h4>
                                <div>
                                    {(()=>{

                                        return that.state.consumeDetails.consumeDetailsList.map(function(item,index){
                                            return(
                                                <p key={index}>{item.oid}</p>
                                            )
                                        })

                                    })()}

                                </div>
                            </li>
                        </ul>
                        
                    </div>
                </div>
             

            </Backbar>
        )
    }

}

export default ConsumptionInfo;
