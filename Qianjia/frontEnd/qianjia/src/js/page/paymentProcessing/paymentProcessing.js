/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './paymentProcessing.scss'
//导入样式 end

class PaymentProcessing extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态

        var that = this;

        this.state = {
            orderStatus : "",
            title : "",
            oid : Utils.Url.parseUrl(location.href).params.oid
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/appUser/getOrderInfo',
                method: 'post',
                data:{
                    "oid": that.state.oid
                },
                callback: function(data){
                    console.log('getOrderInfo',data);
                    if(data.resultCode==0){
                        
                        if(data.data.order.orderStatus==1){
                            componentStore.update(that,{
                                title : "支付处理中"
                            })
                        }else if(data.data.order.orderStatus==2){
                            componentStore.update(that,{
                                title : "支付成功"
                            })
                        }

                        componentStore.update(that,{
                            orderStatus: data.data.order.orderStatus
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

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    render(){
        var that = this;

        return (

            <Backbar $id="paymentProcessing" title={that.state.title}>

                <div className="paymentSuccessBefore-box">
                    <div className="bill-progress">
                        {(()=>{

                            if(that.state.orderStatus==1){  //处理中
                                return(
                                    <ul className="p-list">
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yes"></i>
                                                </div>
                                                <div className="p-line p-down p-true"></div>
                                            </div>
                                            <h3 className="t-title2">支付处理中</h3>
                                            <p className="t-title t-title3">未支付订单将自动关闭</p>
                                        </li>
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yuan"></i>
                                                </div>
                                                <div className="p-line p-down"></div>
                                                <div className="p-line p-up"></div>
                                            </div>
                                            <h3 className="t-title" style={{"padding-bottom":"0.08rem"}}>支付成功</h3>
                                            <p className="t-title">次日计息</p>
                                        </li>
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yuan"></i>
                                                </div>
                                                <div className="p-line p-up"></div>
                                            </div>
                                            <h3 className="t-title">项目期满</h3>
                                            <p className="t-title">还本付息</p>
                                        </li>
                                    </ul>
                                )
                            }else if(that.state.orderStatus==2){    //投资成功

                                return (
                                    <ul className="p-list">
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yes"></i>
                                                </div>
                                                <div className="p-line p-down p-true"></div>
                                            </div>
                                            <h3 className="t-title2" style={{"padding-bottom":"0.1rem"}}>支付成功</h3>
                                        </li>
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yuan"></i>
                                                </div>
                                                <div className="p-line p-down"></div>
                                                <div className="p-line p-up"></div>
                                            </div>
                                            <h3 className="t-title" style={{"padding-bottom":"0.08rem"}}>次日计息</h3>
                                        </li>
                                        <li>
                                            <div className="p-show">
                                                <div className="p-icon">
                                                    <i className="i-icon i-yuan"></i>
                                                </div>
                                                <div className="p-line p-up"></div>
                                            </div>
                                            <h3 className="t-title">项目期满</h3>
                                            <p className="t-title">还本付息</p>
                                        </li>
                                    </ul>
                                )

                            }

                        })()}
                        
                        <i className="p-kedou p-left"></i>
                        <i className="p-kedou p-right"></i>
                    </div>
                    <div className="division-box">
                        <div className="d-line"></div>
                        <div className="d-circle d-c-left"></div>
                        <div className="d-circle d-c-right"></div>
                        <div className="d-dot">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                    </div>
                    <div className="btn-box">
                        <i className="btn-bg"></i>
                        <div className="look-btn" onClick={()=>{

                            // var params = Utils.Url.parseUrl(location.href).params;

                            // Utils.tokenExpireJumpToLogin(function () {
                            //     Utils.requestData({
                            //         url: config.api + 'qj/front/v1/appUser/getOrderInfo',
                            //         method: 'post',
                            //         data:{
                            //             "oid": params.oid
                            //         },
                            //         callback: function(data){
                            //             if(data.resultCode==0){

                            //                 // window._ozprm="productTitle="+ data.data.order.projectTitle +"&investAmount="+ data.data.order.investAmount + "&discountAmount="+ (data.data.order.investAmount-data.data.order.payAmount) +"&inviteAddYield="+ data.data.order.inviteAddYield +"&oId="+ data.data.order.oid +"&ordertotal="+data.data.order.payAmount;
                                            
                            //                 Utils.Storage.set('getOrderInfo',data.data);

                            //                  var oOzclick = document.getElementById('ozclick');
                                            
                            //                  if(!oOzclick){
                            //                      var oScript = document.createElement('script');
                            //                      oScript.id = "ozclick";
                            //                      oScript.src = "https://a.qianjialicai.com/h5Static/js/ozclick.js";
                            //                      document.body.appendChild(oScript);
                            //                  }

                                            

                            //                 Utils.switchRoute('/paymentSuccess?oid='+that.state.oid);


                            //             }
                    
                            //         }
                            //     });
                            // })

                            if(that.state.orderStatus!=""){
                                Utils.switchRoute('/paymentSuccess?oid='+that.state.oid);
                            }

                        }}>
                            查看详情
                        </div>
                    </div>
                </div>

            </Backbar>

        )
    }

}

export default PaymentProcessing;
