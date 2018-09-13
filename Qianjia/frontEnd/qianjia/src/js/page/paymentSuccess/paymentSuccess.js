/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './paymentSuccess.scss'
//导入样式 end

class PaymentSuccess extends Component{
    constructor(){
        super();

        var that = this;
        this.state = {
            getOrderInfo : "",
            title : ""
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/appUser/getOrderInfo',
                method: 'post',
                data:{
                    "oid": Utils.Url.parseUrl(location.href).params.oid
                },
                callback: function(data){

                    if(data.resultCode==0){

                        let getOrderInfo = data.data;
                       
                        if(getOrderInfo.order.orderStatus==1){  //投资处理中

                            componentStore.update(that,{
                                title : "支付处理中"
                            });
                            
                            // 加息特权
                            let yieldNum = getOrderInfo.order.inviteAddYield;
                            // 投资金额
                            let investAmount = getOrderInfo.order.investAmount;
                            // 实际支付
                            let payAmount = getOrderInfo.order.payAmount;

                            let isUseCoupon = (investAmount-payAmount)>0 ? true : false;  //true 使用优惠券  false 没有使用优惠券

                            
                            if(yieldNum>0&&isUseCoupon){  // 使用 加息特权和优惠券

                                Modal.alert('提示',"您的优惠券和加息特权已锁定，不可再使用其他订单。如果支付不成功，10分钟后将进行解锁；若支付成功，将直接扣除。", [
                                    { text: '确定',onPress:()=>{}}
                                ])

                            }else if(yieldNum>0&&isUseCoupon==false){ //使用加息特权，没有使用优惠券

                                Modal.alert('提示',"您的加息特权已锁定，不可再使用其他订单。如果支付不成功，10分钟后将进行解锁；若支付成功，将直接扣除。", [
                                    { text: '确定',onPress:()=>{}}
                                ])

                            }else if(yieldNum==0&&isUseCoupon){ //没使用加息特权，使用优惠券
                                
                                Modal.alert('提示',"您的优惠券已锁定，不可再使用其他订单。如果支付不成功，10分钟后将进行解锁；若支付成功，将直接扣除。", [
                                    { text: '确定',onPress:()=>{}}
                                ])

                            }


                        }else if(getOrderInfo.order.orderStatus==2){    //支付成功

                            componentStore.update(that,{
                                title : "支付成功"
                            });

                        }

                        componentStore.update(that,{
                            getOrderInfo : getOrderInfo
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

    render(){
        var that = this;
        var getOrderInfo = that.state.getOrderInfo;

        return (
            <Backbar $id="bill" title={that.state.title}>
                {
                (()=>{

                    if(!getOrderInfo){
                        return (
                            <div></div>
                        )
                    }else{
                        return (
                            
                            <div className="paymentSuccess-wrap">

                                <div className="pay-detail">
                                    <div className="g-bill-detail">
                                        <ul className="g-d-list">
                                            <li>
                                                <b>订单号 :</b>
                                                <span>{getOrderInfo.order.oid}</span>
                                            </li>
                                            <li>
                                                <b>项目名称 :</b>
                                                <span>{getOrderInfo.order.projectTitle}</span>
                                            </li>
                                            <li>
                                                <b>投资日期 :</b>
                                                <span>{getOrderInfo.order.orderDateStr}</span>
                                            </li>
                                        </ul>
                                        <ul className="g-d-list">
                                            <li>
                                                <b>预期年化回报率 :</b>
                                                <span>{getOrderInfo.order.orderBaseYield}%</span>
                                            </li>
                                            <li>
                                                <b>投资期限 :</b>
                                                <span>{getOrderInfo.interestDaysReal}天</span>
                                            </li>
                                            <li>
                                                <b>预期回报 :</b>
                                                <span>{getOrderInfo.order.interestAmount}元</span>
                                            </li>
                                        </ul>
                                        <ul className="g-d-list">
                                            <li>
                                                <b>加息特权 :</b>
                                                {(()=>{
                                                    if(getOrderInfo.order.inviteAddYield==0){
                                                        return (
                                                            <span>无</span>
                                                        )
                                                    }else{
                                                        return (
                                                            <span>{getOrderInfo.order.inviteAddYield}%</span>
                                                        )
                                                    }
                                                })()}
                                            </li>
                                            <li>
                                                <b>抵现券 :</b>
                                                {(()=>{
                                                    var result = getOrderInfo.order.investAmount - getOrderInfo.order.payAmount;
                                                    console.log(result);
                                                    if(result==0){
                                                        return (
                                                            <span>无</span>
                                                        )
                                                    }else{
                                                        return (
                                                            <span>{result}元</span>
                                                        )
                                                    }
                                                })()}
                                            </li>
                                            <li>
                                                <b>投资金额 :</b>
                                                <span>{getOrderInfo.order.investAmount}元</span>
                                            </li>
                                            <li>
                                                <b>实际支付 :</b>
                                                <span>{getOrderInfo.order.payAmount}元</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pay-present">
                                    {
                                        (()=>{
                                            //判断是否有赠品
                                            if( getOrderInfo.qjGift || getOrderInfo.discountCouponConfList || getOrderInfo.pjRedPacketList){
                                                return (
                                                    <div className="g-present-title">
                                                        <i className="g-p-line"></i>
                                                        <span>恭喜您获得以下赠品</span>
                                                        <i className="g-p-line"></i>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }

                                    {
                                        (()=>{
                                            //实物赠品
                                            let qjGift = getOrderInfo.qjGift;
                                            if(qjGift){
                                                return (
                                                    <div className="g-present-box">
                                                        <div className="g-p-con g-product clearfix">
                                                            <div className="g-img">
                                                                <img src={config.img+qjGift.qjGiftImgPath} />
                                                            </div>
                                                            <i className="g-line"></i>
                                                            <div className="g-text">
                                                                <p>{qjGift.qjGiftName}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }


                                    {
                                        (()=>{
                                            //抵现券列表
                                            let discountCouponConfList = getOrderInfo.discountCouponConfList;

                                            if(discountCouponConfList && discountCouponConfList.length>0){
                                                console.log(discountCouponConfList);

                                                return discountCouponConfList.map(function(item,index){
                                                    return (
                                                        <div className="g-present-box" key={index}>
                                                            <div className="g-p-con g-mortgage clearfix">
                                                                <div className="g-yuan">
                                                                    <span>￥</span>
                                                                    {item.couponAmount}
                                                                </div>
                                                                <i className="g-line"></i>
                                                                <div className="g-text">
                                                                    <h3>{item.couponDesc}</h3>
                                                                    <p>投资{item.couponLimitAmount}元可用券</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        })()

                                    }

                                    {
                                        (()=>{
                                            //哔咯红包列表
                                            let pjRedPacketList = getOrderInfo.pjRedPacketList;

                                            if(pjRedPacketList && pjRedPacketList.length>0){
                                                console.log(pjRedPacketList);

                                                return pjRedPacketList.map(function(item,index){
                                                    return (
                                                        <div className="g-present-box" key={index}>
                                                            <div className="g-p-con g-discount clearfix">
                                                                <div className="g-img">
                                                                    {
                                                                        (()=>{
                                                                            if(item.pjRedPacketPic==""){
                                                                                return (
                                                                                    <img src={require('../../../image/img/newProject_successPJImg.png')} />
                                                                                )
                                                                            }else{
                                                                                return (
                                                                                    <img src={config.kaifa_bghongbao+item.pjRedPacketPic} />
                                                                                )
                                                                            }
                                                                        })()
                                                                    }

                                                                </div>
                                                                <div className="g-cen">
                                                                    <span className="g-half g-up"></span>
                                                                    <i className="g-line"></i>
                                                                    <span className="g-half g-down"></span>
                                                                </div>
                                                                <div className="g-text">
                                                                    {(()=>{
                                                                        if(item.pjRedPacketType==1){ //现金券
                                                                            return <h3 className="g-money"><span className="g-per">￥</span>{item.pjRedPacketValue}</h3>
                                                                        }else{
                                                                            return <h3 className="g-money">{item.pjRedPacketValue}<span className="g-per">%</span></h3>
                                                                        }
                                                                    })()}

                                                                    <p className="g-explain">{item.pjRedPacketName}</p>
                                                                </div>
                                                                <div className={item.pjRedPacketType==1?"g-juan g-xianjing":"g-juan g-fanxian"}>
                                                                    <span>
                                                                        {item.pjRedPacketType==1?"现金券":"返现券"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        })()

                                    }
                                    {
                                        (()=>{
                                            let pjRedPacketList = getOrderInfo.pjRedPacketList;

                                            if(pjRedPacketList && pjRedPacketList.length>0){

                                                return (
                                                    <p className="g-present-tip">返现券/现金券请下载哔咯APP查看使用</p>
                                                )
                                            }
                                        })()

                                    }

                                </div>
                            </div>
                            
                        )
                    }

                })()
                }
            </Backbar>

            

        )
    }

}

export default PaymentSuccess;
